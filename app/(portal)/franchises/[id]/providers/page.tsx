import { TerritoryProvidersPage } from "@/components/franchises/territory-providers-page";

export default function TerritoryProvidersRoute({ params }: { params: { id: string } }) {
  return <TerritoryProvidersPage id={params.id} />;
}
