"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bell, Compass, MessageSquare, Phone, Settings, Sparkles, User } from "lucide-react";

const items = [
  ["/discover", "Discover", Compass],
  ["/connections", "Connections", MessageSquare],
  ["/voice", "Voice Dates", Phone],
  ["/notifications", "Notifications", Bell],
] as const;

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (status === "loading") {
    return <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">Loading MYSTERY…</div>;
  }
  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-background md:p-4">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="fixed left-4 top-4 z-30 hidden h-[calc(100vh-2rem)] w-72 flex-col rounded-[30px] border border-white/8 bg-[#0a0e1b]/80 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:flex">
          <Link href="/discover" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">conversation first</p>
              <p className="text-lg font-semibold tracking-[0.24em] text-white">MYSTERY</p>
            </div>
          </Link>

          <div className="mt-8 rounded-[24px] border border-white/8 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">today's energy</p>
            <p className="mt-2 text-xl font-semibold text-white">Lead with intrigue.</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Thoughtful prompts and soft pacing make every match feel more premium.</p>
          </div>

          <nav className="mt-8 flex-1 space-y-2">
            {items.map(([href, label, Icon]) => (
              <NavItem key={href} href={href} label={label} active={pathname.startsWith(href)} icon={<Icon className="h-5 w-5" />} />
            ))}
          </nav>
          <div className="space-y-2 border-t border-white/8 pt-5">
            <NavItem href="/profile" label="My Profile" active={pathname.startsWith("/profile")} icon={<User className="h-5 w-5" />} />
            <NavItem href="/settings" label="Settings" active={pathname.startsWith("/settings")} icon={<Settings className="h-5 w-5" />} />
          </div>
        </aside>

        <main className="flex-1 pb-24 md:ml-[19rem] md:pb-0">
          <div className="min-h-screen rounded-[32px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {children}
          </div>
        </main>

        <nav className="fixed inset-x-3 bottom-3 z-50 flex justify-around rounded-[24px] border border-white/10 bg-[#0a0e1b]/88 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl md:hidden">
          {items.slice(0, 3).map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={`grid place-items-center rounded-2xl px-3 py-2 ${pathname.startsWith(href) ? "bg-primary/18 text-primary" : "text-muted-foreground"}`}
            >
              <Icon className="h-6 w-6" />
            </Link>
          ))}
          <Link href="/profile" aria-label="Profile" className={`grid place-items-center rounded-2xl px-3 py-2 ${pathname.startsWith("/profile") ? "bg-primary/18 text-primary" : "text-muted-foreground"}`}>
            <User className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: ReactNode; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-primary/22 to-secondary/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          : "text-muted-foreground hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
