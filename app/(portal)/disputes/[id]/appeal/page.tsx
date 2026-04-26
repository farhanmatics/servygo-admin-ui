import { DisputeAppealPage } from "@/components/disputes/dispute-appeal-page";

export default function DisputeAppealRoute({ params }: { params: { id: string } }) {
  return <DisputeAppealPage id={params.id} />;
}
