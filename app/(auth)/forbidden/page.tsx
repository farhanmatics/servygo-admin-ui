import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ForbiddenPage() {
  return (
    <Card className="w-full max-w-xl animate-panel-in p-5 sm:p-6">
      <div className="eyebrow text-warning">Access control</div>
      <h2 className="mt-2 text-[2rem] leading-none">You do not have permission for this area</h2>
      <p className="mt-3 text-[13px] leading-6 text-stone">
        The mock RBAC layer is working as intended. Some routes are visible for planning purposes, but
        your current role is blocked until the correct permission set is selected or assigned.
      </p>

      <div className="mt-5 grid gap-3 rounded-2xl border border-line bg-panel-muted p-4">
        <div className="text-[12px] font-semibold text-ink">Helpful next steps</div>
        <ul className="space-y-2 text-[12px] leading-5 text-body">
          <li>Switch to a role that owns the workflow you want to preview.</li>
          <li>Return to the dashboard and follow only the routes enabled for that role.</li>
          <li>Use this page later as the shared 403 state for real RBAC enforcement.</li>
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link href="/dashboard">
          <Button size="lg">Return to dashboard</Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="secondary">
            Switch role
          </Button>
        </Link>
      </div>
    </Card>
  );
}
