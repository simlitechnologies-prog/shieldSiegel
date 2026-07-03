import { Plus } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { careers } from "@/data/careers";

export default function AdminCareersPage() {
  return (
    <>
      <AdminTopbar title="Careers" />
      <div className="space-y-6 p-6">
        <div className="flex justify-end">
          <Button variant="gold"><Plus className="h-4 w-4" /> Add Listing</Button>
        </div>
        <DataTable
          keyField={(c) => c.id}
          data={careers}
          columns={[
            { header: "Title", accessor: (c) => c.title },
            { header: "Department", accessor: (c) => c.department },
            { header: "Location", accessor: (c) => c.location },
            { header: "Type", accessor: (c) => <Badge>{c.type}</Badge> },
          ]}
        />
      </div>
    </>
  );
}
