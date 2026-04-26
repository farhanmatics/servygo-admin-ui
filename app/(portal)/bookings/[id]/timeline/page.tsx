import { notFound } from "next/navigation";
import { BookingTimelinePage } from "@/components/bookings/booking-timeline-page";
import { getBookingById } from "@/lib/mock/bookings";

export default async function BookingTimelineRoute(props: PageProps<"/bookings/[id]/timeline">) {
  const { id } = await props.params;
  const booking = getBookingById(id);

  if (!booking) {
    notFound();
  }

  return <BookingTimelinePage booking={booking} />;
}
