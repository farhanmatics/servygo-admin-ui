import { notFound } from "next/navigation";
import { UserActivityPage } from "@/components/users/user-activity-page";
import { getUserById } from "@/lib/mock/users";

export default async function UserActivityRoute(props: PageProps<"/users/[id]/activity">) {
  const { id } = await props.params;
  const user = getUserById(id);

  if (!user) {
    notFound();
  }

  return <UserActivityPage user={user} />;
}
