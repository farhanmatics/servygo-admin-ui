"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="panel max-w-lg p-6">
        <div className="eyebrow">System state</div>
        <h1 className="mt-2 text-[2rem] leading-none">Something went off course</h1>
        <p className="mt-3 text-[13px] leading-6 text-stone">
          The admin workspace should fail clearly. When we wire real data later, this screen
          becomes the safe fallback for operators instead of a broken white page.
        </p>
        <div className="mt-5 flex gap-2">
          <Button onClick={reset}>Try again</Button>
          <Button variant="secondary">Return to dashboard</Button>
        </div>
      </div>
    </div>
  );
}
