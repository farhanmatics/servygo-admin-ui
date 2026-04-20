import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/choice-controls";
import { Field, Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  return (
    <Card className="w-full max-w-lg animate-panel-in p-5 sm:p-6">
      <div className="eyebrow">Recovery</div>
      <h2 className="mt-2 text-[2rem] leading-none">Create a new password</h2>
      <p className="mt-2 text-[13px] leading-6 text-stone">
        Keep the interaction compact and explicit. Risky auth flows should be direct and free
        from unnecessary ornament.
      </p>

      <form className="mt-5 grid gap-4">
        <Field label="New password">
          <Input placeholder="Create a strong password" type="password" />
        </Field>

        <Field label="Confirm password">
          <Input placeholder="Repeat the password" type="password" />
        </Field>

        <div className="grid gap-2 rounded-2xl border border-line bg-panel-muted p-3">
          <Checkbox defaultChecked label="At least 12 characters" />
          <Checkbox label="Includes number and symbol" />
          <Checkbox label="Not used in the last 6 months" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="lg" type="submit">
            Save new password
          </Button>
          <Button size="lg" variant="ghost">
            <Link href="/login">Cancel</Link>
          </Button>
        </div>
      </form>
    </Card>
  );
}
