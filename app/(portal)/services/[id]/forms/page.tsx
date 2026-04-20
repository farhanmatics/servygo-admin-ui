import { notFound } from "next/navigation";
import { ServiceFormsPage } from "@/components/services/service-forms-page";
import { getServiceById } from "@/lib/mock/services";

export default async function ServiceFormsRoute(props: PageProps<"/services/[id]/forms">) {
  const { id } = await props.params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return <ServiceFormsPage service={service} />;
}
