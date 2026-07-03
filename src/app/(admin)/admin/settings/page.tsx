import { Save } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { settings } from "@/constants/site";

export default function AdminSettingsPage() {
  return (
    <>
      <AdminTopbar title="Settings" />
      <div className="space-y-6 p-6">
        <Card className="max-w-2xl p-6">
          <h2 className="font-display text-base font-semibold text-[var(--color-navy)]">Firm Information</h2>
          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="firmName">Firm Name</Label>
              <Input id="firmName" defaultValue={settings.firmName} />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" defaultValue={settings.tagline} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={settings.email} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={settings.phone} />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue={settings.address} />
            </div>
            <Button variant="gold"><Save className="h-4 w-4" /> Save Changes</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
