import { FranchisePayoutDetailPage } from "@/components/finance/franchise-payout-detail-page";

export default function FranchisePayoutDetailRoute({ params }: { params: { id: string } }) {
  return <FranchisePayoutDetailPage id={params.id} />;
}
