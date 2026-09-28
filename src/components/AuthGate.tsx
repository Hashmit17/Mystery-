"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function AuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status === "loading") return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading MYSTERY…</div>;
  if (status === "unauthenticated") return null;
  return children;
}
