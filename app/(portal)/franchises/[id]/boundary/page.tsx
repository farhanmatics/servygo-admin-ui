import { TerritoryBoundaryPage } from "@/components/franchises/territory-boundary-page";

export default function TerritoryBoundaryRoute({ params }: { params: { id: string } }) {
  return <TerritoryBoundaryPage id={params.id} />;
}
