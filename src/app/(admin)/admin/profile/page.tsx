import { Save } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminProfilePage() {
  return (
    <>
      <AdminTopbar title="My Profile" />
      <div className="space-y-6 p-6">
        <Card className="max-w-xl p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[var(--color-navy)]" />
            <div>
              <h2 className="font-display text-base font-semibold text-[var(--color-navy)]">Elena Marsh</h2>
              <p className="text-sm text-[var(--color-slate)]">Founding Partner & Managing Director</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Elena Marsh" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="elena.marsh@justicehub.example" />
            </div>
            <Button variant="gold"><Save className="h-4 w-4" /> Save Profile</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
