"use client";

import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { type ServiceProfile } from "@/lib/mock/services";

export function ServiceFormsPage({ service }: { service: ServiceProfile }) {
  const { pushToast } = useToast();

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.75fr)]">
      <Card>
        <div className="eyebrow">Dynamic intake fields</div>
        <h3 className="mt-2 text-[1.2rem] leading-none">Request form builder</h3>
        <div className="mt-4 space-y-3">
          {service.formFields.map((field) => (
            <div key={field.id} className="rounded-2xl border border-line bg-panel-muted p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[13px] font-semibold text-ink">{field.label}</div>
                  <div className="mt-1 text-[12px] text-stone">
                    {field.id} • {field.type}
                  </div>
                </div>
                <StatusBadge tone={field.required ? "success" : "info"}>
                  {field.required ? "required" : "optional"}
                </StatusBadge>
              </div>
              <p className="mt-3 text-[13px] leading-6 text-body">{field.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="eyebrow">Form rules</div>
        <h3 className="mt-2 text-[1.15rem] leading-none">Builder guidance</h3>
        <div className="mt-4 space-y-3">
          {[
            "Keep customer-visible forms short unless operations truly need the extra detail.",
            "Use optional uploads sparingly; only ask for files when review or dispatch depends on them.",
            "Fields that trigger pricing changes should be easy to trace back in the pricing module.",
          ].map((note) => (
            <div key={note} className="rounded-2xl border border-line bg-panel-muted px-3 py-3">
              <p className="text-dense text-body">{note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={() =>
              pushToast({
                tone: "success",
                message: `${service.name} form template cloned into a mock draft builder.`,
              })
            }
            size="md"
            variant="secondary"
          >
            Duplicate form template
          </Button>
        </div>
      </Card>
    </div>
  );
}
