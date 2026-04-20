import { notFound } from "next/navigation";
import { ServiceCoveragePage } from "@/components/services/service-coverage-page";
import { getServiceById } from "@/lib/mock/services";

export default async function ServiceCoverageRoute(props: PageProps<"/services/[id]/coverage">) {
  const { id } = await props.params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return <ServiceCoveragePage service={service} />;
}
