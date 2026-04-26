import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getReviews, moderationStatusTone } from "@/lib/mock/reviews";

export function ReviewArchivePage() {
  const archived = getReviews().filter((review) => review.status === "removed");

  return (
    <div className="admin-grid">
      <PageHeader
        description="Archive preserves removed or hidden reviews with moderation context for audit and appeal handling."
        eyebrow="Review archive"
        title="Hidden / Removed Reviews"
      />
      <Card>
        <div className="space-y-3">
          {archived.map((review) => (
            <div className="rounded-2xl border border-line bg-panel-muted p-3" key={review.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-[13px] font-medium text-ink">
                  {review.id} - {review.provider}
                </div>
                <StatusBadge tone={moderationStatusTone[review.status]}>{review.status}</StatusBadge>
              </div>
              <p className="mt-1 text-[12px] text-body">{review.snippet}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
