import { Plus } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { attorneys } from "@/data/attorneys";

export default function AdminAttorneysPage() {
  return (
    <>
      <AdminTopbar title="Attorneys" />
      <div className="space-y-6 p-6">
        <div className="flex justify-end">
          <Button variant="gold"><Plus className="h-4 w-4" /> Add Attorney</Button>
        </div>
        <DataTable
          keyField={(a) => a.id}
          data={attorneys}
          columns={[
            { header: "Name", accessor: (a) => a.name },
            { header: "Position", accessor: (a) => a.position },
            { header: "Experience", accessor: (a) => `${a.experienceYears} yrs` },
            { header: "Featured", accessor: (a) => (a.featured ? "Yes" : "No") },
          ]}
        />
      </div>
    </>
  );
}
