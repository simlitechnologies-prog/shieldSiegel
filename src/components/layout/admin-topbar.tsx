"use client";

import { Bell, Search, Menu, X, User, LogOut, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import Link from "next/link";

export function AdminTopbar({ title }: { title: string }) {
  const { isOpen, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getColorFromName = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-red-500",
      "bg-cyan-500",
      "bg-amber-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="relative flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-[var(--color-navy)] hover:bg-black/5 lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <h1 className="font-display text-lg font-semibold text-[var(--color-navy)]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-slate)]" />
          <Input
            placeholder="Search..."
            className="h-9 w-56 pl-9"
            aria-label="Search admin"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative rounded-full p-2 text-[var(--color-navy)] hover:bg-black/5 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--color-gold)] animate-pulse" />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 rounded-full p-1 pr-3 text-[var(--color-navy)] hover:bg-black/5 transition-colors"
            aria-label="User menu"
          >
            <div
              className={`h-9 w-9 overflow-hidden rounded-full ${getColorFromName(
                user?.name || "Admin",
              )} flex items-center justify-center text-white font-medium text-sm`}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitials(user?.name || "Admin")
              )}
            </div>
            <span className="hidden sm:block text-sm font-medium">
              {user?.name || "Admin"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Click outside overlay */}
              <div
                className="fixed inset-0 z-40"
                onClick={handleClickOutside}
              />

              <div className="absolute right-0 top-12 z-50 min-w-[220px] overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100">
                {/* User Info */}
                <div className="border-b border-gray-100 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full ${getColorFromName(
                        user?.name || "Admin",
                      )} flex items-center justify-center text-white font-medium text-sm`}
                    >
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(user?.name || "Admin")
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || "Admin"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || "admin@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
