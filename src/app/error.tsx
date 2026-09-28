"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="glass-elevated rounded-3xl p-10 text-center max-w-md">
        <p className="text-sm uppercase tracking-[.2em] text-accent">Connection interrupted</p>
        <h1 className="text-3xl font-bold mt-3">Something went wrong.</h1>
        <p className="text-muted-foreground mt-3">Your data is still safe. Try this screen again.</p>
        <Button className="mt-7" onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
