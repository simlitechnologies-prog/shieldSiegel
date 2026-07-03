"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminTopbar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <button className="rounded-md p-1.5 text-[var(--color-navy)] hover:bg-black/5 lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-semibold text-[var(--color-navy)]">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-slate)]" />
          <Input placeholder="Search..." className="h-9 w-56 pl-9" aria-label="Search admin" />
        </div>
        <button className="relative rounded-full p-2 text-[var(--color-navy)] hover:bg-black/5" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--color-gold)]" />
        </button>
        <div className="h-9 w-9 overflow-hidden rounded-full bg-[var(--color-navy)]" aria-hidden />
      </div>
    </header>
  );
}
