"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
import { useMockAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, StatPill } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/choice-controls";
import { Field, Input, Select } from "@/components/ui/input";
import type { AdminRole } from "@/lib/mock/admin-shell";

export default function LoginPage() {
  const { signIn } = useMockAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<AdminRole>("operations-admin");

  const next = searchParams.get("next") || "/dashboard";

  return (
    <Card className="w-full max-w-xl animate-panel-in p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatPill label="mode" value="Mock" />
        <StatPill label="locale" value="Canada" />
      </div>

      <div className="mt-4">
        <div className="eyebrow">Admin access</div>
        <h2 className="mt-2 text-[2rem] leading-none">Sign in</h2>
        <p className="mt-2 text-[13px] leading-6 text-stone">
          Mock sign-in now activates the protected portal shell. Role selection is used to preview
          route permissions and dashboard variants before the real auth system arrives.
        </p>
      </div>

      <form
        action={() =>
          startTransition(() => {
            signIn(role);
            router.push(next);
          })
        }
        className="mt-5 grid gap-4"
      >
        <Field label="Work email">
          <Input defaultValue="operations@servygo.ca" placeholder="operations@servygo.ca" type="email" />
        </Field>

        <Field label="Password">
          <Input placeholder="Enter your password" type="password" />
        </Field>

        <Field
          hint="Used to preview role-specific navigation and page permissions during UI build."
          label="Demo role"
        >
          <Select onChange={(event) => setRole(event.target.value as AdminRole)} value={role}>
            <option value="super-admin">Super Admin</option>
            <option value="operations-admin">Operations Admin</option>
            <option value="finance-admin">Finance Admin</option>
            <option value="compliance-admin">Compliance Admin</option>
            <option value="support-admin">Support Admin</option>
            <option value="read-only-admin">Read-only Admin</option>
          </Select>
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Checkbox defaultChecked label="Keep this session for 8 hours" />
          <Link className="text-[12px] font-medium text-mid hover:text-forest" href="/forgot-password">
            Forgot password
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button className="min-w-[136px]" size="lg" type="submit">
            Continue
          </Button>
          <Button size="lg" variant="secondary">
            Request access
          </Button>
        </div>
      </form>
    </Card>
  );
}
