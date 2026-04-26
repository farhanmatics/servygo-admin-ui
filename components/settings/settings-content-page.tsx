"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataGrid } from "@/components/ui/data-grid";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getContentItems, contentStatusTone, type ContentItem } from "@/lib/mock/platform-config";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

const TYPE_ICONS: Record<string, string> = {
  "faq": "FAQ",
  "help-article": "Help",
  "announcement": "Ann.",
  "banner": "Banner",
  "legal-snippet": "Legal",
};

export function SettingsContentPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const items = getContentItems();
  const [previewing, setPreviewing] = useState<ContentItem | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all" ? items : items.filter(i => i.status === statusFilter);

  const columns = [
    {
      header: "Title",
      key: "title",
      render: (row: ContentItem) => (
        <div>
          <p className="font-medium text-ink">{row.title}</p>
          <p className="text-[11px] text-stone">{TYPE_ICONS[row.type] ?? row.type} · {row.audience}</p>
        </div>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (row: ContentItem) => <StatusBadge tone={contentStatusTone[row.status]}>{row.status}</StatusBadge>,
    },
    { header: "Updated", key: "updatedAt", render: (row: ContentItem) => <span className="text-[13px] text-stone">{row.updatedAt}</span> },
    { header: "By", key: "updatedBy", render: (row: ContentItem) => <span className="text-[13px] text-stone">{row.updatedBy}</span> },
    {
      header: "",
      key: "actions",
      render: (row: ContentItem) => (
        <div className="flex gap-2">
          <Button onClick={() => setPreviewing(row)} size="sm" variant="ghost">Preview</Button>
          {!isReadOnly && (
            <Button
              onClick={() => pushToast({ message: `"${row.title}" content entry updated. Audit logged.`, tone: "success" })}
              size="sm"
              variant="secondary"
            >
              Edit
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          !isReadOnly ? (
            <Button onClick={() => pushToast({ message: "Content creation editor — available after CMS integration.", tone: "info" })} size="md" variant="primary">
              + New content
            </Button>
          ) : undefined
        }
        description="Manage dynamic platform content: FAQ articles, announcements, banners, and legal snippets."
        eyebrow="Platform configuration"
        title="CMS — Dynamic Content"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["all", "published", "draft", "archived"].map(s => (
          <button
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${statusFilter === s ? "border-forest bg-forest text-cream" : "border-line bg-panel text-body hover:border-ink hover:text-ink"}`}
            key={s}
            onClick={() => setStatusFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <DataGrid columns={columns} emptyMessage="No content items match the current filter." rows={filtered} />
      </Card>

      {previewing && (
        <Modal onClose={() => setPreviewing(null)} title={`Preview: ${previewing.title}`}>
          <div className="space-y-3">
            <div className="flex gap-2">
              <StatusBadge tone={contentStatusTone[previewing.status]}>{previewing.status}</StatusBadge>
              <StatusBadge tone="neutral">{previewing.type.replace(/-/g, " ")}</StatusBadge>
              <StatusBadge tone="neutral">audience: {previewing.audience}</StatusBadge>
            </div>
            <div className="rounded-lg border border-line bg-panel-muted p-4">
              <p className="text-[14px] leading-relaxed text-body">{previewing.body}</p>
            </div>
            <p className="text-[12px] text-stone">Last updated: {previewing.updatedAt} by {previewing.updatedBy}</p>
            <Button onClick={() => setPreviewing(null)} size="md" variant="secondary">Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
