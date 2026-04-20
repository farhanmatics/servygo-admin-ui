import { notFound } from "next/navigation";
import { UserFinancialsPage } from "@/components/users/user-financials-page";
import { getUserById } from "@/lib/mock/users";

export default async function UserFinancialsRoute(props: PageProps<"/users/[id]/financials">) {
  const { id } = await props.params;
  const user = getUserById(id);

  if (!user) {
    notFound();
  }

  return <UserFinancialsPage user={user} />;
}
