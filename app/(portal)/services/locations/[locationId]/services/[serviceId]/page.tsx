import { notFound } from "next/navigation";
import { LocalServicePage } from "@/components/services/local-service-page";
import { getLocalService, getLocationById } from "@/lib/mock/services";

export default async function LocalServiceRoute(props: PageProps<"/services/locations/[locationId]/services/[serviceId]">) {
  const { locationId, serviceId } = await props.params;
  const location = getLocationById(locationId);
  const service = getLocalService(locationId, serviceId);

  if (!location || !service) {
    notFound();
  }

  return <LocalServicePage location={location} service={service} />;
}
