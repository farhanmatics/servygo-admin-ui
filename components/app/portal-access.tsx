"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type ReactNode } from "react";
import { useMockAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";

function SessionTimeoutDialog() {
  const { isSessionExpiring, isSessionLocked, refreshSession, role, signIn, signOut } = useMockAuth();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!isSessionExpiring && !isSessionLocked) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 px-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg animate-panel-in p-5 sm:p-6">
        <div className="eyebrow">{isSessionLocked ? "Session timed out" : "Session check"}</div>
        <h2 className="mt-2 text-[2rem] leading-none">
          {isSessionLocked ? "Re-authentication required" : "Your session is about to expire"}
        </h2>
        <p className="mt-3 text-[13px] leading-6 text-stone">
          {isSessionLocked
            ? "Mock access is locked until you confirm credentials again. This protects risky admin actions after inactivity."
            : "Sensitive screens should ask for an explicit refresh before the session goes stale, especially around payouts, disputes, and account actions."}
        </p>

        {isSessionLocked ? (
          <div className="mt-5 grid gap-4">
            <Field
              hint="This stays mock-only for now. Any non-empty value will restore access."
              label="Confirm password"
            >
              <Input
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                type="password"
                value={password}
              />
            </Field>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {!isSessionLocked ? (
            <Button onClick={refreshSession} size="lg">
              Stay signed in
            </Button>
          ) : (
            <Button
              disabled={!password.trim() || isPending}
              onClick={() =>
                startTransition(() => {
                  signIn(role);
                  setPassword("");
                })
              }
              size="lg"
            >
              {isPending ? "Re-authenticating..." : "Re-authenticate"}
            </Button>
          )}
          <Button
            onClick={() =>
              startTransition(() => {
                signOut();
                router.replace("/login");
              })
            }
            size="lg"
            variant="secondary"
          >
            Sign out
          </Button>
        </div>
      </Card>
    </div>
  );
}

function ForbiddenPanel({ pathname }: { pathname: string }) {
  return (
    <div className="admin-grid">
      <Card className="max-w-3xl p-5 sm:p-6">
        <div className="eyebrow text-warning">Insufficient permission</div>
        <h1 className="mt-2 text-[2rem] leading-none">This route is outside your current role</h1>
        <p className="mt-3 text-[13px] leading-6 text-stone">
          The mock RBAC layer is blocking access to <span className="font-semibold text-ink">{pathname}</span>.
          This is intentional so we can validate role boundaries before backend enforcement exists.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/dashboard">
            <Button size="lg">Return to dashboard</Button>
          </Link>
          <Link href="/forbidden">
            <Button size="lg" variant="secondary">
              Open full guidance
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export function PortalAccess({ children }: { children: ReactNode }) {
  const { isAuthenticated, isRouteAllowed } = useMockAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return (
      <div className="admin-grid">
        <Card className="max-w-xl">
          <div className="eyebrow">Authentication</div>
          <h1 className="mt-2 text-[1.6rem] leading-none">Redirecting to sign in</h1>
          <p className="mt-3 text-[13px] leading-6 text-stone">
            Protected admin routes require a mock session before the shell becomes interactive.
          </p>
        </Card>
      </div>
    );
  }

  if (!isRouteAllowed(pathname)) {
    return (
      <>
        <ForbiddenPanel pathname={pathname} />
        <SessionTimeoutDialog />
      </>
    );
  }

  return (
    <>
      {children}
      <SessionTimeoutDialog />
    </>
  );
}
