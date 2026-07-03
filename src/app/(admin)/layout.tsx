import type { Metadata } from "next";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-ivory)]">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
