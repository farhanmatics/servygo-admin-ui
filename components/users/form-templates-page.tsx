"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/overlay";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { getFormTemplates, type SignupFormTemplate, type FormField } from "@/lib/mock/platform-config";
import { useMockAuth } from "@/components/providers";
import { useToast } from "@/components/providers";

const USER_TYPE_LABELS: Record<string, string> = {
  customer: "Customer",
  "provider-individual": "Individual Provider",
  "provider-company": "Company Provider",
  worker: "Worker",
  franchise: "Franchise Operator",
};

const FIELD_TYPE_ICON: Record<string, string> = {
  text: "T",
  email: "@",
  phone: "☎",
  select: "▾",
  file: "📎",
  checkbox: "☐",
  date: "📅",
};

export function FormTemplatesPage() {
  const { isReadOnly } = useMockAuth();
  const { pushToast } = useToast();
  const templates = getFormTemplates();
  const [selected, setSelected] = useState<SignupFormTemplate | null>(null);

  function FieldRow({ field }: { field: FormField }) {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-line bg-panel px-3 py-2">
        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-panel-muted text-[11px] text-stone">{FIELD_TYPE_ICON[field.fieldType] ?? "?"}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-medium text-ink">{field.label}</p>
            {field.required && <StatusBadge tone="warning">required</StatusBadge>}
          </div>
          <div className="flex flex-wrap gap-2 mt-0.5 text-[11px] text-stone">
            <span>type: {field.fieldType}</span>
            {field.placeholder && <span>placeholder: "{field.placeholder}"</span>}
            {field.options && <span>options: {field.options.join(", ")}</span>}
            {field.helpText && <span>help: {field.helpText}</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-grid">
      <PageHeader
        actions={
          !isReadOnly ? (
            <Button onClick={() => pushToast({ message: "Form template editor — available after backend integration.", tone: "info" })} size="md" variant="primary">
              + New template
            </Button>
          ) : undefined
        }
        description="Manage dynamic registration form fields shown to users by type and service category."
        eyebrow="User management"
        title="Signup Form Templates"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {templates.map(t => (
          <Card key={t.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-ink">{t.name}</p>
                <p className="text-[12px] text-stone">User type: {USER_TYPE_LABELS[t.userType] ?? t.userType}</p>
                {t.serviceCategory && <p className="text-[12px] text-stone">Service: {t.serviceCategory}</p>}
              </div>
              <div className="text-right">
                <p className="text-[12px] text-stone">v{t.version}</p>
                <p className="text-[11px] text-stone">{t.fields.length} fields</p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-stone">
              <span>Updated {t.updatedAt} by {t.updatedBy}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => setSelected(t)} size="sm" variant="secondary">View fields</Button>
              {!isReadOnly && (
                <Button onClick={() => pushToast({ message: `"${t.name}" template — editing available after form builder integration.`, tone: "info" })} size="sm" variant="ghost">
                  Edit
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)} title={`Fields — ${selected.name} (v${selected.version})`}>
          <div className="space-y-2">
            {selected.fields.map(f => (
              <FieldRow field={f} key={f.id} />
            ))}
            <p className="text-[11px] text-stone">Last updated: {selected.updatedAt} by {selected.updatedBy}</p>
            <Button onClick={() => setSelected(null)} size="md" variant="secondary">Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
