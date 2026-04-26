import { notFound } from "next/navigation";
import { BookingReassignPage } from "@/components/bookings/booking-reassign-page";
import { getBookingById } from "@/lib/mock/bookings";

export default async function BookingReassignRoute(props: PageProps<"/bookings/[id]/reassign">) {
  const { id } = await props.params;
  const booking = getBookingById(id);

  if (!booking) {
    notFound();
  }

  return <BookingReassignPage booking={booking} />;
}
