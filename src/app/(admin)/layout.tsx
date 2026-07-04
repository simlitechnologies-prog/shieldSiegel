import type { Metadata } from "next";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { AuthProvider } from "../../../contexts/AuthContext";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { AdminAuthGuard } from "@/components/admin-auth-guard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AdminAuthGuard>
          <div className="flex min-h-screen bg-[var(--color-ivory)]">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </AdminAuthGuard>
      </SidebarProvider>
    </AuthProvider>
  );
}
