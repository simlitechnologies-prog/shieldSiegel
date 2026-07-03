// lib/auth.ts
// Authentication is NOT yet connected to Firebase. These are typed
// placeholders so UI can be built against a stable contract, and swapped
// for real Firebase Auth calls later without touching component code.

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User } from "@/types";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  name: string;
}

export async function signIn(_credentials: AuthCredentials): Promise<User> {
  throw new Error("Firebase Authentication is not yet configured. See lib/firebase.ts.");
}

export async function signUp(_payload: RegisterPayload): Promise<User> {
  throw new Error("Firebase Authentication is not yet configured. See lib/firebase.ts.");
}

export async function sendPasswordReset(_email: string): Promise<void> {
  throw new Error("Firebase Authentication is not yet configured. See lib/firebase.ts.");
}

export async function signOut(): Promise<void> {
  throw new Error("Firebase Authentication is not yet configured. See lib/firebase.ts.");
}

export async function getCurrentUser(): Promise<User | null> {
  return null;
}
