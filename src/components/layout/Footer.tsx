import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

const footerLinks = {
  Platform: [
    ["#how-it-works", "How it Works"],
    ["#features", "Experience"],
    ["/discover", "Live product"],
  ],
  Safety: [
    ["/safety", "Safety Center"],
    ["/guidelines", "Community Guidelines"],
    ["/privacy", "Privacy Policy"],
  ],
  Account: [
    ["/signup", "Create account"],
    ["/login", "Log in"],
    ["/voice", "Voice Dates"],
  ],
} as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-[#070a15] py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.14),transparent_32%),radial-gradient(circle_at_100%_20%,rgba(34,211,238,0.09),transparent_30%)]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-14 grid gap-10 rounded-[32px] border border-white/8 bg-white/[0.03] p-8 shadow-[0_20px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:grid-cols-[1.2fr_.8fr] lg:p-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white">
              <Sparkles className="h-4 w-4 text-primary" />
              The future of dating feels more human.
            </div>
            <div>
              <h3 className="max-w-2xl text-3xl font-semibold leading-tight text-white md:text-4xl">
                Built for chemistry, not endless swiping.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                MYSTERY creates deliberate, private-first introductions. Start with thoughtful prompts,
                unlock real conversation, then reveal more only when the vibe is mutual.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">Private discovery</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">Voice dates</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">Consent-based reveal</span>
            </div>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-white/8 bg-black/20 p-6">
            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">privacy score</p>
                <p className="mt-2 text-2xl font-semibold text-white">A+</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/18 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>
            <Link
              href="/signup"
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-primary/18 via-accent/12 to-secondary/12 px-5 py-4 text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">start now</p>
                <p className="mt-1 text-lg font-medium">Join the MYSTERY beta</p>
              </div>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 border-t border-white/8 pt-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="text-base font-semibold tracking-[0.28em] text-white">MYSTERY</span>
                <p className="text-xs text-muted-foreground">Meet the mind before the face.</p>
              </div>
            </Link>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/90">{group}</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} MYSTERY. Crafted for better-first conversations.</p>
          <div className="flex gap-5">
            <span className="transition-colors hover:text-white">Instagram</span>
            <span className="transition-colors hover:text-white">TikTok</span>
            <span className="transition-colors hover:text-white">X / Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
