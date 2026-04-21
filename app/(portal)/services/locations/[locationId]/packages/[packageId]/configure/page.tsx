import { notFound } from "next/navigation";
import { PackageConfigurePage } from "@/components/services/package-configure-page";
import { getLocalPackage, getLocationById } from "@/lib/mock/services";

export default async function PackageConfigureRoute(props: PageProps<"/services/locations/[locationId]/packages/[packageId]/configure">) {
  const { locationId, packageId } = await props.params;
  const location = getLocationById(locationId);
  const result = getLocalPackage(locationId, packageId);

  if (!location || !result) {
    notFound();
  }

  return <PackageConfigurePage location={location} localPackage={result.localPackage} />;
}
