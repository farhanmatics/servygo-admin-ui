import { TerritoryOperatorPage } from "@/components/franchises/territory-operator-page";

export default function TerritoryOperatorRoute({ params }: { params: { id: string } }) {
  return <TerritoryOperatorPage id={params.id} />;
}
