import { Card, MetricCard, StatPill } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { userStatusTone, userTypeLabels, type UserProfile } from "@/lib/mock/users";

export function UserOverviewPage({ user }: { user: UserProfile }) {
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.75fr)]">
      <Card>
        <div className="eyebrow">Profile summary</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            ["Type", userTypeLabels[user.type]],
            ["Signup stage", user.signupStage],
            ["Created", user.createdAt],
            ["Contact owner", user.internalOwner],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-line bg-panel-muted p-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">{label}</div>
              <p className="mt-2 text-[13px] font-medium text-ink">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-line pt-4">
          <div className="eyebrow">Document template by type</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {user.documentTemplate.map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
                <p className="text-dense text-body">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        <MetricCard
          delta={user.financialSummary.lastSettlement}
          label="Lifetime value"
          tone="success"
          value={user.financialSummary.lifetimeValue}
        />
        <MetricCard
          delta="Current exposure"
          label="Outstanding balance"
          tone="warning"
          value={user.financialSummary.outstandingBalance}
        />
        <Card>
          <div className="eyebrow">Quick contact</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatPill label="email" value={user.email} />
            <StatPill label="phone" value={user.phone} />
            <StatusBadge tone={userStatusTone[user.status]}>{user.status}</StatusBadge>
          </div>
        </Card>
      </div>
    </section>
  );
}
