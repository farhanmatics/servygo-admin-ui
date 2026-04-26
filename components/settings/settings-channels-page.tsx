"use client";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getChannelConfigs, channelStatusTone, type ChannelConfig } from "@/lib/mock/platform-config";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";

function UsageBar({ sent, limit }: { limit: number; sent: number }) {
  const pct = Math.min(100, (sent / limit) * 100);
  const tone = pct > 85 ? "bg-danger" : pct > 60 ? "bg-warning" : "bg-forest";
  return (
    <div className="mt-1 h-1.5 w-full rounded-full bg-panel-muted overflow-hidden">
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function SettingsChannelsPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const configs = getChannelConfigs();

  const emailChannels = configs.filter(c => c.channel === "email");
  const smsChannels = configs.filter(c => c.channel === "sms");

  function renderChannel(ch: ChannelConfig) {
    return (
      <Card key={ch.id}>
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2">
              <p className="font-medium text-ink">{ch.provider}</p>
              <StatusBadge tone={channelStatusTone[ch.status]}>{ch.status}</StatusBadge>
            </div>
            <p className="text-[13px] text-body mt-1">{ch.displayName} &lt;{ch.fromAddress}&gt;</p>
            <p className="mt-2 text-[12px] text-stone">{ch.notes}</p>
          </div>
          <div className="min-w-[160px]">
            <p className="text-[11px] uppercase tracking-wide text-stone">Daily usage</p>
            <p className="text-[13px] font-medium tabular-nums text-ink">
              {ch.sentToday.toLocaleString()} / {ch.dailyLimit.toLocaleString()}
            </p>
            <UsageBar limit={ch.dailyLimit} sent={ch.sentToday} />
            <p className="mt-1 text-[11px] text-stone">Last checked: {new Date(ch.lastCheckedAt).toLocaleString("en-CA")}</p>
          </div>
          {!isReadOnly && (
            <Button
              onClick={() => pushToast({ message: `${ch.provider} channel test ping sent. Check delivery logs.`, tone: "info" })}
              size="sm"
              variant="secondary"
            >
              Test connection
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="admin-grid">
      <PageHeader
        description="Configure transactional email and SMS delivery channels (SendGrid, AWS SES, Twilio, AWS SNS)."
        eyebrow="Platform configuration"
        title="Email & SMS Channels"
      />

      {/* Degraded alert */}
      {configs.some(c => c.status === "degraded" || c.status === "disconnected") && (
        <div className="rounded-xl border border-danger/40 bg-danger/5 px-4 py-3">
          <p className="text-[13px] font-medium text-ink">One or more channels are degraded or disconnected</p>
          <p className="text-[12px] text-stone">Review the affected channels below and check provider dashboards for incident status.</p>
        </div>
      )}

      <div>
        <p className="eyebrow mb-3">Email channels</p>
        <div className="space-y-3">{emailChannels.map(renderChannel)}</div>
      </div>

      <div>
        <p className="eyebrow mb-3">SMS channels</p>
        <div className="space-y-3">{smsChannels.map(renderChannel)}</div>
      </div>

      {isReadOnly && (
        <div className="rounded-xl border border-line bg-panel-muted px-4 py-3">
          <p className="text-[13px] text-stone">Channel configuration editing is restricted to Super Admin. Your role is read-only.</p>
        </div>
      )}
    </div>
  );
}
