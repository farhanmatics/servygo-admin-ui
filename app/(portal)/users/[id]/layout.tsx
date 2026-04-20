import { notFound } from "next/navigation";
import { UserDetailShell } from "@/components/users/user-detail-shell";
import { getUserById } from "@/lib/mock/users";

export default async function UserDetailLayout({
  children,
  params,
}: LayoutProps<"/users/[id]">) {
  const { id } = await params;
  const user = getUserById(id);

  if (!user) {
    notFound();
  }

  return <UserDetailShell user={user}>{children}</UserDetailShell>;
}
