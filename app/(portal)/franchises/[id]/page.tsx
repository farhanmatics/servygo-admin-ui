import { TerritoryDetailPage } from "@/components/franchises/territory-detail-page";

export default function TerritoryDetailRoute({ params }: { params: { id: string } }) {
  return <TerritoryDetailPage id={params.id} />;
}
