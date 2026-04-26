import { notFound } from "next/navigation";
import { ReviewDetailPage } from "@/components/reviews/review-detail-page";
import { getReviewById } from "@/lib/mock/reviews";

export default async function ReviewDetailRoute(props: PageProps<"/reviews/moderation/[id]">) {
  const { id } = await props.params;
  const review = getReviewById(id);
  if (!review) notFound();
  return <ReviewDetailPage review={review} />;
}
