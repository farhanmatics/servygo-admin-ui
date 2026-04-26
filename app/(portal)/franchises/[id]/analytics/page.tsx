import { TerritoryAnalyticsPage } from "@/components/franchises/territory-analytics-page";

export default function TerritoryAnalyticsRoute({ params }: { params: { id: string } }) {
  return <TerritoryAnalyticsPage id={params.id} />;
}
