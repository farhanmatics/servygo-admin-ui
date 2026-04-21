import { notFound } from "next/navigation";
import { PackageProvidersPage } from "@/components/services/package-providers-page";
import { getLocalPackage, getLocationById } from "@/lib/mock/services";

export default async function PackageProvidersRoute(props: PageProps<"/services/locations/[locationId]/packages/[packageId]/providers">) {
  const { locationId, packageId } = await props.params;
  const location = getLocationById(locationId);
  const result = getLocalPackage(locationId, packageId);

  if (!location || !result) {
    notFound();
  }

  return <PackageProvidersPage location={location} localPackage={result.localPackage} />;
}
