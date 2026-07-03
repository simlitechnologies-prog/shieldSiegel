import { AdminTopbar } from "@/components/layout/admin-topbar";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { messages } from "@/data/messages";
import { formatDate } from "@/lib/utils";

export default function AdminMessagesPage() {
  return (
    <>
      <AdminTopbar title="Messages" />
      <div className="space-y-6 p-6">
        <DataTable
          keyField={(m) => m.id}
          data={messages}
          columns={[
            { header: "From", accessor: (m) => m.name },
            { header: "Subject", accessor: (m) => m.subject },
            { header: "Received", accessor: (m) => formatDate(m.createdAt) },
            { header: "Status", accessor: (m) => <Badge className="capitalize">{m.status}</Badge> },
          ]}
        />
      </div>
    </>
  );
}
