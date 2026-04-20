import { AppShell } from "@/components/app/shell";
import { PortalAccess } from "@/components/app/portal-access";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell>
      <PortalAccess>{children}</PortalAccess>
    </AppShell>
  );
}
