import { notFound } from "next/navigation";
import { ComplianceDocumentDetailPage } from "@/components/compliance/compliance-document-detail-page";
import { getComplianceRecordById } from "@/lib/mock/compliance";

export default async function ComplianceDocumentDetailRoute(props: PageProps<"/compliance/documents/[id]">) {
  const { id } = await props.params;
  const record = getComplianceRecordById(id);
  if (!record) notFound();
  return <ComplianceDocumentDetailPage record={record} />;
}
