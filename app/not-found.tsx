import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="panel max-w-lg p-6">
        <div className="eyebrow">404</div>
        <h1 className="mt-2 text-[2rem] leading-none">This admin route does not exist</h1>
        <p className="mt-3 text-[13px] leading-6 text-stone">
          Useful not-found states matter in admin tools because deep links, filters, and saved
          views get shared frequently.
        </p>
        <div className="mt-5">
          <Link href="/">
            <Button>Back to dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
