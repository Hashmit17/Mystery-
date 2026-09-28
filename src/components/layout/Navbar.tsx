import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles } from "lucide-react";

const navItems = [
  ["#how-it-works", "How it Works"],
  ["#features", "Experience"],
  ["#safety", "Trust & Safety"],
] as const;

export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-4 z-50 px-4 md:px-6">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#090b17]/70 px-4 shadow-[0_20px_80px_rgba(6,8,20,0.45)] backdrop-blur-2xl md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">conversation first</p>
            <span className="text-lg font-semibold tracking-[0.28em] text-white">MYSTERY</span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] p-1 md:flex">
          {navItems.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:bg-white/8 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/login">
            <Button variant="ghost" className="rounded-full px-4 text-white hover:bg-white/10 hover:text-white">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="group rounded-full bg-white px-5 text-black hover:bg-white/90 md:px-6">
              Join beta
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
