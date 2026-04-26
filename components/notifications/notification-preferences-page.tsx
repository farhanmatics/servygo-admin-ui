"use client";

import { useState } from "react";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/choice-controls";
import { PageHeader } from "@/components/ui/page-header";
import { channelOptions } from "@/lib/mock/notifications";

export function NotificationPreferencesPage() {
  const { pushToast } = useToast();
  const [enabled, setEnabled] = useState<string[]>(["email", "in-app"]);

  return (
    <div className="admin-grid">
      <PageHeader description="Preferences should let admins control delivery channels without losing critical alert coverage." eyebrow="Notification settings" title="Notification Preferences" />
      <Card>
        <div className="space-y-3">
          {channelOptions.map((channel) => (
            <Checkbox
              checked={enabled.includes(channel)}
              key={channel}
              label={`Enable ${channel}`}
              onChange={() =>
                setEnabled((current) =>
                  current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel],
                )
              }
            />
          ))}
        </div>
        <div className="mt-4">
          <Button
            onClick={() =>
              pushToast({
                tone: "success",
                message: `Mock preferences saved (${enabled.join(", ")}).`,
              })
            }
            size="sm"
          >
            Save preferences
          </Button>
        </div>
      </Card>
    </div>
  );
}
