"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Scale,
  FileText,
  Users,
  MessageSquareQuote,
  CalendarCheck,
  Briefcase,
  Inbox,
  UserCog,
  Settings,
  LogOut,
  UserCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useAuth } from "../../../contexts/AuthContext";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Practice Areas", href: "/admin/practice-areas", icon: Scale },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Attorneys", href: "/admin/attorneys", icon: Users },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  { label: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Messages", href: "/admin/messages", icon: Inbox },
  { label: "Users", href: "/admin/users", icon: UserCog },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();
  const { logout } = useAuth();

  // Close sidebar on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeSidebar]);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, closeSidebar]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  const handleLogout = async () => {
    await logout();
    closeSidebar();
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <Scale className="h-6 w-6 text-[var(--color-gold)]" />
          <span className="font-display text-base font-bold">
            ShieldSeal Admin
          </span>
        </div>
        <button
          onClick={closeSidebar}
          className="rounded-md p-1.5 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--color-gold)] text-[var(--color-navy)]"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/admin/profile"
          onClick={handleNavClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
        >
          <UserCircle className="h-4 w-4 shrink-0" />
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex-col bg-[var(--color-navy-deep)] text-white shadow-lg transition-transform duration-300 ease-in-out",
          "lg:relative lg:flex lg:translate-x-0 lg:shadow-none",
          isOpen ? "translate-x-0 flex" : "-translate-x-full hidden lg:flex",
        )}
      >
        <div className="flex h-full flex-col overflow-hidden">
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}
