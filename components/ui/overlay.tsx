import type { ReactNode } from "react";
import { Button } from "./button";

export function Modal({
  actions,
  children,
  onClose,
  title,
}: {
  actions?: ReactNode;
  children: ReactNode;
  onClose?: () => void;
  title: string;
}) {
  return (
    <div className="rounded-[22px] border border-line bg-panel p-4 shadow-floating">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="eyebrow">Modal</div>
          <h3 className="mt-2 text-[1.2rem] leading-none">{title}</h3>
        </div>
        <div className="flex gap-2">
          {actions}
          {onClose && (
            <Button onClick={onClose} size="sm" variant="ghost">
              Close
            </Button>
          )}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Drawer({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <aside className="rounded-[24px] border border-line bg-panel p-4 shadow-floating">
      <div className="eyebrow">Drawer</div>
      <h3 className="mt-2 text-[1.2rem] leading-none">{title}</h3>
      <div className="mt-4">{children}</div>
    </aside>
  );
}

export function Sheet({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <aside className="rounded-[24px] border border-line bg-panel p-4 shadow-floating">
      <div className="eyebrow">Sheet</div>
      <h3 className="mt-2 text-[1.2rem] leading-none">{title}</h3>
      <div className="mt-4">{children}</div>
    </aside>
  );
}

export function ConfirmDialog({
  body,
  confirmLabel,
  title,
}: {
  body: string;
  confirmLabel: string;
  title: string;
}) {
  return (
    <Modal
      actions={
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">
            Cancel
          </Button>
          <Button size="sm" variant="danger">
            {confirmLabel}
          </Button>
        </div>
      }
      title={title}
    >
      <p className="text-[13px] leading-6 text-body">{body}</p>
    </Modal>
  );
}
