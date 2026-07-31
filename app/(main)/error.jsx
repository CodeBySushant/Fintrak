"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

// Route-level error boundary for all signed-in pages. Without this, any
// server error (DB down, bad data) crashed straight to a white screen.
export default function MainError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-semibold text-[#111827]">
        Something went wrong
      </h2>
      <p className="max-w-md text-sm text-[#6b7280]">
        We couldn&rsquo;t load this page. It&rsquo;s usually temporary — try
        again, and if it keeps happening, check that the database is reachable.
      </p>
      <Button onClick={() => reset()} className="rounded-full px-6">
        Try again
      </Button>
    </div>
  );
}
