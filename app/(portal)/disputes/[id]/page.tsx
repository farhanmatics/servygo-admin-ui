import { notFound } from "next/navigation";
import { DisputeDetailPage } from "@/components/disputes/dispute-detail-page";
import { getDisputeById } from "@/lib/mock/disputes";

export default async function DisputeDetailRoute(props: PageProps<"/disputes/[id]">) {
  const { id } = await props.params;
  const dispute = getDisputeById(id);
  if (!dispute) notFound();
  return <DisputeDetailPage dispute={dispute} />;
}
