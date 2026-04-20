import { notFound } from "next/navigation";
import { AdminDetailShell } from "@/components/admins/admin-detail-shell";
import { getAdminById } from "@/lib/mock/admins";

export default async function AdminDetailLayout({
  children,
  params,
}: LayoutProps<"/admins/[id]">) {
  const { id } = await params;
  const admin = getAdminById(id);

  if (!admin) {
    notFound();
  }

  return <AdminDetailShell admin={admin}>{children}</AdminDetailShell>;
}
