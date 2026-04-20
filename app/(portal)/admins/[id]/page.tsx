import { notFound } from "next/navigation";
import { AdminOverviewPage } from "@/components/admins/admin-overview-page";
import { getAdminById } from "@/lib/mock/admins";

export default async function AdminDetailRoute(props: PageProps<"/admins/[id]">) {
  const { id } = await props.params;
  const admin = getAdminById(id);

  if (!admin) {
    notFound();
  }

  return <AdminOverviewPage admin={admin} />;
}
