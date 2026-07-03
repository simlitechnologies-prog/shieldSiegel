"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Scale, FileText, Users, MessageSquareQuote, CalendarCheck,
  Briefcase, Inbox, UserCog, Settings, LogOut, UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Practice Areas", href: "/admin/practice-areas", icon: Scale },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Attorneys", href: "/admin/attorneys", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Messages", href: "/admin/messages", icon: Inbox },
  { label: "Users", href: "/admin/users", icon: UserCog },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[var(--color-navy-deep)] text-white lg:flex">
      <div className="flex items-center gap-2 px-6 py-6">
        <Scale className="h-6 w-6 text-[var(--color-gold)]" />
        <span className="font-display text-base font-bold">JusticeHub Admin</span>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-[var(--color-gold)] text-[var(--color-navy)]" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link href="/admin/profile" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white">
          <UserCircle className="h-4 w-4" /> Profile
        </Link>
        <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white">
          <LogOut className="h-4 w-4" /> Logout
        </Link>
      </div>
    </aside>
  );
}
