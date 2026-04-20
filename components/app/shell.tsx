import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell">
      <Sidebar />
      <main className="admin-main" id="main-content">
        <TopBar />
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
}
