import type { ReactNode } from "react";
import { CommandPalette } from "./command-palette";
import { ImpersonationBanner } from "./impersonation-banner";
import { ReadonlyModeBanner } from "./readonly-mode-banner";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <Sidebar />
      <main className="admin-main" id="main-content">
        <ReadonlyModeBanner />
        <ImpersonationBanner />
        <TopBar />
        <div className="mt-4">{children}</div>
        <CommandPalette />
      </main>
    </div>
  );
}
