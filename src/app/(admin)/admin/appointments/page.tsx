import { AdminTopbar } from "@/components/layout/admin-topbar";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { appointments } from "@/data/appointments";

export default function AdminAppointmentsPage() {
  return (
    <>
      <AdminTopbar title="Appointments" />
      <div className="space-y-6 p-6">
        <DataTable
          keyField={(a) => a.id}
          data={appointments}
          columns={[
            { header: "Client", accessor: (a) => a.fullName },
            { header: "Email", accessor: (a) => a.email },
            { header: "Practice Area", accessor: (a) => a.practiceArea },
            { header: "Date", accessor: (a) => `${a.preferredDate} · ${a.preferredTime}` },
            { header: "Status", accessor: (a) => <Badge className="capitalize">{a.status}</Badge> },
          ]}
        />
      </div>
    </>
  );
}
