import { notFound } from "next/navigation";
import { TransactionDetailPage } from "@/components/finance/transaction-detail-page";
import { getTransactionById } from "@/lib/mock/finance";

export default async function FinanceTransactionDetailRoute(props: PageProps<"/finance/transactions/[id]">) {
  const { id } = await props.params;
  const transaction = getTransactionById(id);
  if (!transaction) notFound();
  return <TransactionDetailPage transaction={transaction} />;
}
