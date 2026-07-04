"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface User {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
  role?: string;
  createdAt?: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      try {
        if (firebaseUser) {
          // Get user data from Firestore
          const userData = await getUserData(firebaseUser.uid);

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || userData?.name || "Admin",
            photoURL: firebaseUser.photoURL || undefined,
            role: userData?.role || "admin",
            createdAt: userData?.createdAt || new Date().toISOString(),
            emailVerified: firebaseUser.emailVerified,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        setUser(null);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const getUserData = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      // Get user data from Firestore
      const userData = await getUserData(firebaseUser.uid);

      // Check if user has admin role
      if (userData?.role !== "admin") {
        await signOut(auth);
        throw new Error("Access denied. Admin privileges required.");
      }

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || userData?.name || "Admin",
        photoURL: firebaseUser.photoURL || undefined,
        role: userData?.role || "admin",
        createdAt: userData?.createdAt || new Date().toISOString(),
        emailVerified: firebaseUser.emailVerified,
      });

      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.code === "auth/user-not-found") {
        throw new Error("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        throw new Error("Incorrect password.");
      } else if (error.code === "auth/too-many-requests") {
        throw new Error("Too many failed attempts. Please try again later.");
      } else {
        throw new Error(error.message || "Login failed");
      }
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      // Update profile with display name
      await updateProfile(firebaseUser, {
        displayName: name,
      });

      // Create user document in Firestore
      const userData = {
        name,
        email,
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: false,
      };

      await setDoc(doc(db, "users", firebaseUser.uid), userData);

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: name,
        role: "admin",
        createdAt: userData.createdAt,
        emailVerified: false,
      });

      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        throw new Error("This email is already registered.");
      } else if (error.code === "auth/weak-password") {
        throw new Error("Password should be at least 6 characters.");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email address.");
      } else if (error.code === "auth/configuration-not-found") {
        throw new Error(
          "Firebase Authentication is not enabled. Please enable Email/Password authentication in the Firebase Console.",
        );
      } else {
        throw new Error(error.message || "Signup failed");
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
