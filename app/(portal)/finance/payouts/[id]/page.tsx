import { notFound } from "next/navigation";
import { PayoutDetailPage } from "@/components/finance/payout-detail-page";
import { getPayoutById } from "@/lib/mock/finance";

export default async function FinancePayoutDetailRoute(props: PageProps<"/finance/payouts/[id]">) {
  const { id } = await props.params;
  const payout = getPayoutById(id);
  if (!payout) notFound();
  return <PayoutDetailPage payout={payout} />;
}
