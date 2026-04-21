import { notFound } from "next/navigation";
import { LocationSetupPage } from "@/components/services/location-setup-page";
import { getLocationById } from "@/lib/mock/services";

export default async function LocationSetupRoute(props: PageProps<"/services/locations/[locationId]">) {
  const { locationId } = await props.params;
  const location = getLocationById(locationId);

  if (!location) {
    notFound();
  }

  return <LocationSetupPage location={location} />;
}
