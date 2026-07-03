import { Plus } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { practiceAreas } from "@/data/practice-areas";

export default function AdminPracticeAreasPage() {
  return (
    <>
      <AdminTopbar title="Practice Areas" />
      <div className="space-y-6 p-6">
        <div className="flex justify-end">
          <Button variant="gold"><Plus className="h-4 w-4" /> Add Practice Area</Button>
        </div>
        <DataTable
          keyField={(p) => p.id}
          data={practiceAreas}
          columns={[
            { header: "Title", accessor: (p) => p.title },
            { header: "Slug", accessor: (p) => p.slug },
            { header: "Description", accessor: (p) => <span className="line-clamp-1 max-w-xs">{p.shortDescription}</span> },
          ]}
        />
      </div>
    </>
  );
}
