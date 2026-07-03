import { Plus, Star } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";

export default function AdminTestimonialsPage() {
  return (
    <>
      <AdminTopbar title="Testimonials" />
      <div className="space-y-6 p-6">
        <div className="flex justify-end">
          <Button variant="gold"><Plus className="h-4 w-4" /> Add Testimonial</Button>
        </div>
        <DataTable
          keyField={(t) => t.id}
          data={testimonials}
          columns={[
            { header: "Client", accessor: (t) => t.clientName },
            { header: "Role", accessor: (t) => t.clientRole ?? "—" },
            {
              header: "Rating",
              accessor: (t) => (
                <span className="flex items-center gap-1">
                  {t.rating} <Star className="h-3.5 w-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                </span>
              ),
            },
            { header: "Quote", accessor: (t) => <span className="line-clamp-1 max-w-xs">{t.quote}</span> },
          ]}
        />
      </div>
    </>
  );
}
