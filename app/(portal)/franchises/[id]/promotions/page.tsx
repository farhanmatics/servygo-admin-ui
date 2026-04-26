import { TerritoryPromotionsPage } from "@/components/franchises/territory-promotions-page";

export default function TerritoryPromotionsRoute({ params }: { params: { id: string } }) {
  return <TerritoryPromotionsPage id={params.id} />;
}
