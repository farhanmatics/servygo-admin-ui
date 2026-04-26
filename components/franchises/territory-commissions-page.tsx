"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getTerritoryById } from "@/lib/mock/franchises";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

export function TerritoryCommissionsPage({ id }: { id: string }) {
  const territory = getTerritoryById(id);
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const [franRate, setFranRate] = useState(territory?.franchiseCommission.replace("%", "") ?? "8");
  const [platRate] = useState(territory?.platformCommission.replace("%", "") ?? "15");
  const [rationale, setRationale] = useState("");
  const [saved, setSaved] = useState(false);

  const providerShare = (100 - parseFloat(platRate) - parseFloat(franRate)).toFixed(0);

  function handleSave() {
    if (!rationale.trim()) return;
    setSaved(true);
    pushToast({ message: `Commission rate updated to ${franRate}% for ${territory?.name}. Audit logged.`, tone: "success" });
    setRationale("");
  }

  if (!territory) return null;

  return (
    <div className="admin-grid">
      <PageHeader
        description={`Configure the commission split between ServyGo HQ and the ${territory.name} franchise.`}
        eyebrow={`${territory.name} · Commission configuration`}
        title="Commission Settings"
      />

      {/* Current split */}
      <Card>
        <p className="eyebrow mb-3">Current commission split</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Platform (HQ)", value: `${platRate}%`, note: "Fixed — controlled by HQ" },
            { label: "Franchise", value: `${franRate}%`, note: "Configurable per territory" },
            { label: "Provider share", value: `${providerShare}%`, note: "Auto-calculated remainder" },
          ].map(item => (
            <div className="flex-1 min-w-[140px] rounded-xl border border-line bg-panel-muted px-4 py-3" key={item.label}>
              <p className="text-[11px] uppercase tracking-wide text-stone">{item.label}</p>
              <p className="text-[1.8rem] font-semibold leading-none text-ink">{item.value}</p>
              <p className="mt-1 text-[11px] text-stone">{item.note}</p>
            </div>
          ))}
        </div>

        {/* Visualizer bar */}
        <div className="mt-4 h-3 rounded-full overflow-hidden flex">
          <div className="h-full bg-forest" style={{ width: `${platRate}%` }} title={`Platform ${platRate}%`} />
          <div className="h-full bg-gold" style={{ width: `${franRate}%` }} title={`Franchise ${franRate}%`} />
          <div className="h-full bg-panel-muted" style={{ width: `${providerShare}%` }} title={`Provider ${providerShare}%`} />
        </div>
        <div className="mt-1 flex gap-3 text-[11px] text-stone">
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-forest" />Platform</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-gold" />Franchise</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-panel-muted border border-line" />Provider</span>
        </div>
      </Card>

      {/* Edit commission */}
      {!isReadOnly && (
        <Card>
          <p className="eyebrow mb-3">Update franchise commission rate</p>
          <div className="space-y-4 max-w-sm">
            <div>
              <label className="text-[12px] font-medium text-ink">Franchise commission % (1–20)</label>
              <input
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-forest/40"
                max="20"
                min="1"
                onChange={e => { setFranRate(e.target.value); setSaved(false); }}
                type="number"
                value={franRate}
              />
              <p className="mt-1 text-[11px] text-stone">Provider will receive {providerShare}% after HQ and franchise cuts.</p>
            </div>
            <div>
              <label className="text-[12px] font-medium text-ink">Reason for change (required)</label>
              <textarea
                className="mt-1 w-full rounded-lg border border-line bg-panel px-3 py-2 text-[13px] text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/40"
                onChange={e => setRationale(e.target.value)}
                placeholder="Explain why this rate is being adjusted…"
                rows={2}
                value={rationale}
              />
            </div>
            <Button disabled={!rationale.trim() || saved} onClick={handleSave} size="md" variant="primary">
              {saved ? "Saved" : "Save changes"}
            </Button>
          </div>
        </Card>
      )}

      {isReadOnly && (
        <Card>
          <p className="text-[13px] text-stone">Commission rates are read-only in your current role. Contact a Super Admin to make changes.</p>
        </Card>
      )}
    </div>
  );
}
