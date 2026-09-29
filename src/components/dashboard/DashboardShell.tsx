"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bell, Compass, MessageSquare, Phone, Settings, User } from "lucide-react";

const items = [
  ["/discover", "Discover", Compass],
  ["/connections", "Connections", MessageSquare],
  ["/voice", "Voice Dates", Phone],
  ["/notifications", "Alerts", Bell],
] as const;

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status === "loading") return <div className="grid min-h-screen place-items-center bg-[#161616] text-white/50">Loading MYSTERY…</div>;
  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-[#f5f0e7] p-2 md:p-4">
      <div className="min-h-[calc(100vh-1rem)] overflow-hidden rounded-[28px] border-2 border-[#161616] bg-[#161616] md:min-h-[calc(100vh-2rem)]">
        <header className="sticky top-0 z-40 flex h-18 items-center justify-between border-b border-white/12 bg-[#161616]/94 px-4 text-white backdrop-blur-xl md:px-7">
          <Link href="/discover" className="font-serif text-2xl font-bold tracking-[-0.05em]">MYSTERY<span className="text-[#ff5f4d]">.</span></Link>
          <nav className="hidden items-center gap-1 md:flex">
            {items.map(([href, label, Icon]) => {
              const active = pathname.startsWith(href);
              return <Link key={href} href={href} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "bg-[#d8ff62] text-[#161616]" : "text-white/55 hover:bg-white/8 hover:text-white"}`}><Icon className="h-4 w-4"/>{label}</Link>;
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/profile" aria-label="Profile" className={`grid h-10 w-10 place-items-center rounded-full ${pathname.startsWith("/profile") ? "bg-[#ff5f4d] text-[#161616]" : "border border-white/15 text-white/60 hover:text-white"}`}><User className="h-4 w-4"/></Link>
            <Link href="/settings" aria-label="Settings" className={`grid h-10 w-10 place-items-center rounded-full ${pathname.startsWith("/settings") ? "bg-[#6d5dfc] text-white" : "border border-white/15 text-white/60 hover:text-white"}`}><Settings className="h-4 w-4"/></Link>
          </div>
        </header>

        <main className="min-h-[calc(100vh-5.5rem)] bg-[radial-gradient(circle_at_85%_5%,rgba(109,93,252,.18),transparent_22rem),radial-gradient(circle_at_10%_90%,rgba(255,95,77,.12),transparent_24rem),#161616] pb-24 text-white md:pb-0">
          {children}
        </main>

        <nav className="fixed inset-x-4 bottom-4 z-50 flex justify-around rounded-full border border-white/12 bg-[#161616]/95 p-2 shadow-[0_16px_50px_rgba(0,0,0,.32)] backdrop-blur-xl md:hidden">
          {items.slice(0, 3).map(([href, label, Icon]) => <Link key={href} href={href} aria-label={label} className={`grid h-11 w-14 place-items-center rounded-full ${pathname.startsWith(href) ? "bg-[#d8ff62] text-[#161616]" : "text-white/50"}`}><Icon className="h-5 w-5"/></Link>)}
          <Link href="/profile" aria-label="Profile" className={`grid h-11 w-14 place-items-center rounded-full ${pathname.startsWith("/profile") ? "bg-[#ff5f4d] text-[#161616]" : "text-white/50"}`}><User className="h-5 w-5"/></Link>
        </nav>
      </div>
    </div>
  );
}
