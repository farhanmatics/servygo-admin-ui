import { notFound } from "next/navigation";
import { BookingReschedulePage } from "@/components/bookings/booking-reschedule-page";
import { getBookingById } from "@/lib/mock/bookings";

export default async function BookingRescheduleRoute(props: PageProps<"/bookings/[id]/reschedule">) {
  const { id } = await props.params;
  const booking = getBookingById(id);

  if (!booking) {
    notFound();
  }

  return <BookingReschedulePage booking={booking} />;
}
