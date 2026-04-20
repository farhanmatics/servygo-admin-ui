import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type { UserProfile } from "@/lib/mock/users";

const documentTone = {
  approved: "success",
  "needs-review": "warning",
  missing: "danger",
  expiring: "warning",
} as const;

export function UserDocumentsPage({ user }: { user: UserProfile }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.75fr)]">
      <Card>
        <div className="eyebrow">Documents</div>
        <h3 className="mt-2 text-[1.2rem] leading-none">Verification records</h3>
        <div className="mt-4 space-y-3">
          {user.documents.map((document) => (
            <div key={document.name} className="rounded-2xl border border-line bg-panel-muted p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[13px] font-semibold text-ink">{document.name}</div>
                  <div className="mt-1 text-[12px] text-stone">
                    {document.requestedFor} • Expiry: {document.expiry}
                  </div>
                </div>
                <StatusBadge tone={documentTone[document.status]}>{document.status}</StatusBadge>
              </div>
              <p className="mt-3 text-[13px] leading-6 text-body">{document.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="eyebrow">Follow-up</div>
        <h3 className="mt-2 text-[1.15rem] leading-none">Request more documents</h3>
        <p className="mt-2 text-[13px] leading-6 text-stone">
          This placeholder keeps the compliance follow-up flow visible without wiring a backend request system yet.
        </p>
        <div className="mt-4 space-y-3">
          {user.documentTemplate.map((item) => (
            <div key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
              <p className="text-dense text-body">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button size="md" variant="secondary">
            Request additional files
          </Button>
        </div>
      </Card>
    </div>
  );
}
