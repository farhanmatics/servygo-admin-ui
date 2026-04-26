import { notFound } from "next/navigation";
import { BookingOverviewPage } from "@/components/bookings/booking-overview-page";
import { getBookingById } from "@/lib/mock/bookings";

export default async function BookingDetailRoute(props: PageProps<"/bookings/[id]">) {
  const { id } = await props.params;
  const booking = getBookingById(id);

  if (!booking) {
    notFound();
  }

  return <BookingOverviewPage booking={booking} />;
}
