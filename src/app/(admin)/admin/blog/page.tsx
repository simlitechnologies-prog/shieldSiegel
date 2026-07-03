import { Plus } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogs } from "@/data/blogs";
import { formatDate } from "@/lib/utils";

export default function AdminBlogPage() {
  return (
    <>
      <AdminTopbar title="Blog Posts" />
      <div className="space-y-6 p-6">
        <div className="flex justify-end">
          <Button variant="gold"><Plus className="h-4 w-4" /> New Post</Button>
        </div>
        <DataTable
          keyField={(b) => b.id}
          data={blogs}
          columns={[
            { header: "Title", accessor: (b) => <span className="line-clamp-1 max-w-xs">{b.title}</span> },
            { header: "Category", accessor: (b) => <Badge>{b.category}</Badge> },
            { header: "Author", accessor: (b) => b.author.name },
            { header: "Published", accessor: (b) => formatDate(b.publishedAt) },
          ]}
        />
      </div>
    </>
  );
}
