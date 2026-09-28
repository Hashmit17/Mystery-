"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, EyeOff, MapPinned, ShieldAlert, Sparkles, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const promises = [
  {
    title: "Consent-first reveal",
    description: "Photos and identity only open when both people intentionally opt in.",
    icon: EyeOff,
  },
  {
    title: "Blurred location boundaries",
    description: "Discovery uses broad areas, never exact coordinates or addresses.",
    icon: MapPinned,
  },
  {
    title: "Control every interaction",
    description: "Report, block, pause discovery, and set boundaries without friction.",
    icon: UserRoundCheck,
  },
];

export function SafetySection() {
  return (
    <section id="safety" className="relative overflow-hidden px-4 py-24 md:px-6 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.1),transparent_24%),radial-gradient(circle_at_90%_80%,rgba(34,211,238,0.12),transparent_28%)]" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
            className="rounded-[34px] border border-white/8 bg-white/[0.04] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white">
              <ShieldAlert className="h-4 w-4 text-primary" />
              Trust & safety by design
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-5xl">
              Built to feel safe, controlled, and incredibly intentional.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Privacy is not a settings page afterthought here—it shapes the entire product. MYSTERY keeps the dopamine, removes the pressure, and gives people control over pace and visibility.
            </p>

            <div className="mt-8 space-y-4">
              {promises.map(({ title, description, icon: Icon }) => (
                <div key={title} className="flex gap-4 rounded-[24px] border border-white/8 bg-black/18 p-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.26),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.18),transparent_26%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">final invitation</p>
                <h3 className="mt-3 max-w-lg text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Your next great connection might begin with just one question.
                </h3>
                <p className="mt-4 max-w-lg text-base leading-8 text-white/75">
                  Join the redesigned MYSTERY beta and experience a calmer, more visually immersive way to meet someone.
                </p>
              </div>

              <div className="grid gap-4 rounded-[28px] border border-white/8 bg-black/20 p-5">
                <div className="flex items-center gap-3 text-white/90">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Cursor-reactive atmosphere</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-sm">Database-backed discovery & chat</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <span className="text-sm">Voice dates, reveal requests, and safety tools</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button className="group h-14 rounded-full bg-white px-8 text-black hover:bg-white/90">
                    Join MYSTERY
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
                <Link href="/safety">
                  <Button variant="outline" className="h-14 rounded-full border-white/12 bg-white/[0.03] px-8 text-white hover:bg-white/8 hover:text-white">
                    Explore safety center
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
