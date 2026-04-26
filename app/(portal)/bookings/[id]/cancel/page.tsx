import { notFound } from "next/navigation";
import { BookingCancelPage } from "@/components/bookings/booking-cancel-page";
import { getBookingById } from "@/lib/mock/bookings";

export default async function BookingCancelRoute(props: PageProps<"/bookings/[id]/cancel">) {
  const { id } = await props.params;
  const booking = getBookingById(id);

  if (!booking) {
    notFound();
  }

  return <BookingCancelPage booking={booking} />;
}
