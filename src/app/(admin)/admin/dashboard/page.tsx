import { CalendarCheck, FileText, Users, MessageSquareQuote } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { StatCard } from "@/components/admin/stat-card";
import { ChartPlaceholder } from "@/components/admin/chart-placeholder";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { appointments } from "@/data/appointments";
import { blogs } from "@/data/blogs";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const recentAppointments = appointments.slice(0, 5);
  const recentPosts = blogs.slice(0, 5);

  return (
    <>
      <AdminTopbar title="Dashboard" />
      <div className="space-y-8 p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Appointments" value="20" icon={CalendarCheck} trend={{ value: "+12% this month", positive: true }} />
          <StatCard label="Published Articles" value="15" icon={FileText} trend={{ value: "+3 this month", positive: true }} />
          <StatCard label="Active Attorneys" value="10" icon={Users} />
          <StatCard label="New Testimonials" value="20" icon={MessageSquareQuote} trend={{ value: "-2 this month", positive: false }} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartPlaceholder title="Consultations Booked (Last 7 Weeks)" />
          <ChartPlaceholder title="Website Traffic Overview" />
        </div>

        <div>
          <h2 className="mb-3 font-display text-base font-semibold text-[var(--color-navy)]">Recent Appointments</h2>
          <DataTable
            keyField={(a) => a.id}
            data={recentAppointments}
            columns={[
              { header: "Client", accessor: (a) => a.fullName },
              { header: "Practice Area", accessor: (a) => a.practiceArea },
              { header: "Date", accessor: (a) => a.preferredDate },
              {
                header: "Status",
                accessor: (a) => <Badge className="capitalize">{a.status}</Badge>,
              },
            ]}
          />
        </div>

        <div>
          <h2 className="mb-3 font-display text-base font-semibold text-[var(--color-navy)]">Recent Blog Posts</h2>
          <DataTable
            keyField={(b) => b.id}
            data={recentPosts}
            columns={[
              { header: "Title", accessor: (b) => b.title },
              { header: "Category", accessor: (b) => b.category },
              { header: "Author", accessor: (b) => b.author.name },
              { header: "Published", accessor: (b) => formatDate(b.publishedAt) },
            ]}
          />
        </div>
      </div>
    </>
  );
}
