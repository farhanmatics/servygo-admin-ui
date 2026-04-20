import { notFound } from "next/navigation";
import { ServiceEditPage } from "@/components/services/service-edit-page";
import { getServiceById } from "@/lib/mock/services";

export default async function ServiceEditRoute(props: PageProps<"/services/[id]/edit">) {
  const { id } = await props.params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return <ServiceEditPage service={service} />;
}
