import { notFound } from "next/navigation";
import { UserOverviewPage } from "@/components/users/user-overview-page";
import { getUserById } from "@/lib/mock/users";

export default async function UserDetailRoute(props: PageProps<"/users/[id]">) {
  const { id } = await props.params;
  const user = getUserById(id);

  if (!user) {
    notFound();
  }

  return <UserOverviewPage user={user} />;
}
