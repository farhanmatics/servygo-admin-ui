import { notFound } from "next/navigation";
import { ServicePricingPage } from "@/components/services/service-pricing-page";
import { getServiceById } from "@/lib/mock/services";

export default async function ServicePricingRoute(props: PageProps<"/services/[id]/pricing">) {
  const { id } = await props.params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return <ServicePricingPage service={service} />;
}
