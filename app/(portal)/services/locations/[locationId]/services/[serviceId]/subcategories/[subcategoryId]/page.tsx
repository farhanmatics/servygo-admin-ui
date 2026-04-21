import { notFound } from "next/navigation";
import { SubcategoryPackagesPage } from "@/components/services/subcategory-packages-page";
import { getLocalService, getLocalSubcategory, getLocationById } from "@/lib/mock/services";

export default async function SubcategoryPackagesRoute(
  props: PageProps<"/services/locations/[locationId]/services/[serviceId]/subcategories/[subcategoryId]">,
) {
  const { locationId, serviceId, subcategoryId } = await props.params;
  const location = getLocationById(locationId);
  const service = getLocalService(locationId, serviceId);
  const subcategory = getLocalSubcategory(locationId, serviceId, subcategoryId);

  if (!location || !service || !subcategory) {
    notFound();
  }

  return <SubcategoryPackagesPage location={location} service={service} subcategory={subcategory} />;
}
