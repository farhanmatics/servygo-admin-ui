import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/choice-controls";
import { Field, Input } from "@/components/ui/input";

export default function VerifyPage() {
  return (
    <Card className="w-full max-w-lg animate-panel-in p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatPill label="step" value="2FA" />
        <StatPill label="channel" value="Email + SMS" />
      </div>

      <div className="mt-4">
        <div className="eyebrow">Verification</div>
        <h2 className="mt-2 text-[2rem] leading-none">Confirm your access code</h2>
        <p className="mt-2 text-[13px] leading-6 text-stone">
          This is UI-only for now, but the screen is ready for optional OTP or 2FA verification when
          higher-risk admin roles need a second step.
        </p>
      </div>

      <form className="mt-5 grid gap-4">
        <Field hint="Use the latest 6-digit code sent to your work device." label="Verification code">
          <Input inputMode="numeric" maxLength={6} placeholder="000000" />
        </Field>

        <div className="grid gap-2 rounded-2xl border border-line bg-panel-muted p-3">
          <Checkbox defaultChecked label="Remember this device for 7 days" />
          <Checkbox label="Require re-check before payouts and account suspensions" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="lg" type="submit">
            Verify access
          </Button>
          <Link href="/login">
            <Button size="lg" variant="ghost">
              Back to login
            </Button>
          </Link>
        </div>
      </form>
    </Card>
  );
}
