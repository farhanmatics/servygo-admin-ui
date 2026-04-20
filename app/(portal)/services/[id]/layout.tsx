import { notFound } from "next/navigation";
import { ServiceDetailShell } from "@/components/services/service-detail-shell";
import { getServiceById } from "@/lib/mock/services";

export default async function ServiceDetailLayout({
  children,
  params,
}: LayoutProps<"/services/[id]">) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailShell service={service}>{children}</ServiceDetailShell>;
}
