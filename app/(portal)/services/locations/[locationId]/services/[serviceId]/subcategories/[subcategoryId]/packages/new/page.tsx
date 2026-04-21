import { notFound } from "next/navigation";
import { NewPackagePage } from "@/components/services/new-package-page";
import { getLocalService, getLocalSubcategory, getLocationById } from "@/lib/mock/services";

export default async function NewPackageRoute(
  props: PageProps<"/services/locations/[locationId]/services/[serviceId]/subcategories/[subcategoryId]/packages/new">,
) {
  const { locationId, serviceId, subcategoryId } = await props.params;
  const location = getLocationById(locationId);
  const service = getLocalService(locationId, serviceId);
  const subcategory = getLocalSubcategory(locationId, serviceId, subcategoryId);

  if (!location || !service || !subcategory) {
    notFound();
  }

  return <NewPackagePage location={location} service={service} subcategory={subcategory} />;
}
