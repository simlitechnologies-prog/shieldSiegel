"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <AlertTriangle className="h-10 w-10 text-[var(--color-gold)]" />
      <h2 className="font-display text-xl font-semibold text-[var(--color-navy)]">
        Something went wrong
      </h2>
      <p className="max-w-md text-sm text-[var(--color-slate)]">
        We hit an unexpected error loading this page. Please try again.
      </p>
      <Button variant="outline" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
