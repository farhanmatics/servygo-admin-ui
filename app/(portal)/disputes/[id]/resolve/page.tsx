import { notFound } from "next/navigation";
import { DisputeResolvePage } from "@/components/disputes/dispute-resolve-page";
import { getDisputeById } from "@/lib/mock/disputes";

export default async function DisputeResolveRoute(props: PageProps<"/disputes/[id]/resolve">) {
  const { id } = await props.params;
  const dispute = getDisputeById(id);
  if (!dispute) notFound();
  return <DisputeResolvePage dispute={dispute} />;
}
