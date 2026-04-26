import { TerritoryStaffPage } from "@/components/franchises/territory-staff-page";

export default function TerritoryStaffRoute({ params }: { params: { id: string } }) {
  return <TerritoryStaffPage id={params.id} />;
}
