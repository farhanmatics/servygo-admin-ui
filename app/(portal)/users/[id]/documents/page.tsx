import { notFound } from "next/navigation";
import { UserDocumentsPage } from "@/components/users/user-documents-page";
import { getUserById } from "@/lib/mock/users";

export default async function UserDocumentsRoute(props: PageProps<"/users/[id]/documents">) {
  const { id } = await props.params;
  const user = getUserById(id);

  if (!user) {
    notFound();
  }

  return <UserDocumentsPage user={user} />;
}
