import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-lg animate-panel-in p-5 sm:p-6">
      <div className="eyebrow">Recovery</div>
      <h2 className="mt-2 text-[2rem] leading-none">Reset your password</h2>
      <p className="mt-2 text-[13px] leading-6 text-stone">
        Enter the work email attached to your admin account. Later this will connect to the
        real auth flow; for now it sets the screen pattern and content density.
      </p>

      <form className="mt-5 grid gap-4">
        <Field label="Work email">
          <Input placeholder="finance@servygo.ca" type="email" />
        </Field>

        <div className="flex flex-wrap gap-2">
          <Button size="lg" type="submit">
            Send recovery link
          </Button>
          <Button size="lg" variant="ghost">
            <Link href="/login">Back to login</Link>
          </Button>
        </div>
      </form>
    </Card>
  );
}
