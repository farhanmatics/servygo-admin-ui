import { notFound } from "next/navigation";
import { BookingAssignPage } from "@/components/bookings/booking-assign-page";
import { getBookingById } from "@/lib/mock/bookings";

export default async function BookingAssignRoute(props: PageProps<"/bookings/[id]/assign">) {
  const { id } = await props.params;
  const booking = getBookingById(id);

  if (!booking) {
    notFound();
  }

  return <BookingAssignPage booking={booking} />;
}
