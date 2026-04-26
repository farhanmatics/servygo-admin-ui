import { notFound } from "next/navigation";
import { DisputeEscalatePage } from "@/components/disputes/dispute-escalate-page";
import { getDisputeById } from "@/lib/mock/disputes";

export default async function DisputeEscalateRoute(props: PageProps<"/disputes/[id]/escalate">) {
  const { id } = await props.params;
  const dispute = getDisputeById(id);
  if (!dispute) notFound();
  return <DisputeEscalatePage dispute={dispute} />;
}
