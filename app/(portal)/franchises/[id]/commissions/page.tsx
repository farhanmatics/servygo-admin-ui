import { TerritoryCommissionsPage } from "@/components/franchises/territory-commissions-page";

export default function TerritoryCommissionsRoute({ params }: { params: { id: string } }) {
  return <TerritoryCommissionsPage id={params.id} />;
}
