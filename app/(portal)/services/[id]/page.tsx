import { notFound } from "next/navigation";
import { ServiceOverviewPage } from "@/components/services/service-overview-page";
import { getServiceById } from "@/lib/mock/services";

export default async function ServiceDetailRoute(props: PageProps<"/services/[id]">) {
  const { id } = await props.params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return <ServiceOverviewPage service={service} />;
}
