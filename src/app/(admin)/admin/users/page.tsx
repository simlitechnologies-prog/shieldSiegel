import { Plus } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";

const mockUsers: User[] = [
  { id: "u-1", name: "Elena Marsh", email: "elena.marsh@justicehub.example", role: "admin", createdAt: "2018-01-10", updatedAt: "2026-06-01" },
  { id: "u-2", name: "Marcus Bell", email: "marcus.bell@justicehub.example", role: "editor", createdAt: "2019-03-22", updatedAt: "2026-05-18" },
  { id: "u-3", name: "Jordan Hayes", email: "jordan.hayes@email.com", role: "client", createdAt: "2025-11-02", updatedAt: "2026-06-10" },
  { id: "u-4", name: "Priya Sharma", email: "priya.sharma@email.com", role: "client", createdAt: "2026-02-14", updatedAt: "2026-06-20" },
];

export default function AdminUsersPage() {
  return (
    <>
      <AdminTopbar title="Users" />
      <div className="space-y-6 p-6">
        <div className="flex justify-end">
          <Button variant="gold"><Plus className="h-4 w-4" /> Invite User</Button>
        </div>
        <DataTable
          keyField={(u) => u.id}
          data={mockUsers}
          columns={[
            { header: "Name", accessor: (u) => u.name },
            { header: "Email", accessor: (u) => u.email },
            { header: "Role", accessor: (u) => <Badge className="capitalize">{u.role}</Badge> },
          ]}
        />
      </div>
    </>
  );
}
