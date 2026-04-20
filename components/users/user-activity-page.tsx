import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { UserProfile } from "@/lib/mock/users";

export function UserActivityPage({ user }: { user: UserProfile }) {
  return (
    <Card>
      <div className="eyebrow">Activity history</div>
      <h3 className="mt-2 text-[1.2rem] leading-none">Audit and operator events</h3>
      <div className="mt-4 space-y-3">
        {user.activity.map((event) => (
          <div key={`${event.timestamp}-${event.action}`} className="rounded-2xl border border-line bg-panel-muted p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[13px] font-semibold text-ink">{event.action}</div>
                <div className="mt-1 text-[12px] text-stone">
                  {event.timestamp} • {event.actor}
                </div>
              </div>
              <StatusBadge tone={event.tone}>{event.tone}</StatusBadge>
            </div>
            <p className="mt-3 text-[13px] leading-6 text-body">{event.details}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
