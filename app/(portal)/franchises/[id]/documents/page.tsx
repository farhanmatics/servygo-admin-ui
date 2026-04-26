import { TerritoryDocumentsPage } from "@/components/franchises/territory-documents-page";

export default function TerritoryDocumentsRoute({ params }: { params: { id: string } }) {
  return <TerritoryDocumentsPage id={params.id} />;
}
