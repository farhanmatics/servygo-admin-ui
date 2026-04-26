import { notFound } from "next/navigation";
import { BookingDetailShell } from "@/components/bookings/booking-detail-shell";
import { getBookingById } from "@/lib/mock/bookings";

export default async function BookingDetailLayout({
  children,
  params,
}: LayoutProps<"/bookings/[id]">) {
  const { id } = await params;
  const booking = getBookingById(id);

  if (!booking) {
    notFound();
  }

  return <BookingDetailShell booking={booking}>{children}</BookingDetailShell>;
}
