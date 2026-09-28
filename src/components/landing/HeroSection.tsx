"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, AudioLines, Lock, Sparkles, Stars, UserRoundSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

const orbitChips = ["deep conversations", "private discovery", "voice dates", "consent reveal", "shared interests"];

const heroStats = [
  { value: "42 sec", label: "average first-reply spark" },
  { value: "privacy-first", label: "broad area discovery only" },
  { value: "mutual reveal", label: "identity unlocks by consent" },
];

const spotlightFeatures: { label: string; description: string; icon: LucideIcon }[] = [
  { label: "audio-first", description: "Send a voice vibe check", icon: AudioLines },
  { label: "reveal lock", description: "Photos stay hidden until mutual consent", icon: Lock },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-32 md:px-6 md:pb-20 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.22),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(236,72,153,0.14),transparent_26%)]" />
      <div className="container mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-primary" />
              A modern dating experience built around conversation, not appearances.
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-[6.4rem]">
              Meet the energy.
              <span className="mt-2 block bg-gradient-to-r from-white via-[#c4b5fd] to-[#67e8f9] bg-clip-text text-transparent">
                Reveal the face later.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              MYSTERY turns dating into a slow-burn experience: beautifully private, visually immersive,
              and centered on chemistry. Match through prompts, shared signals, and voice before photos
              ever dominate the vibe.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/signup">
                <Button className="group h-14 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90">
                  Start your signal
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="h-14 rounded-full border-white/12 bg-white/[0.03] px-8 text-base text-white hover:bg-white/8 hover:text-white">
                  See the experience
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {heroStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.1, duration: 0.65 }}
                  className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                >
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[580px]"
          >
            <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute right-8 top-24 h-44 w-44 rounded-full bg-secondary/15 blur-[90px]" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-6">
              <div className="flex items-center justify-between rounded-[26px] border border-white/8 bg-black/20 px-4 py-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">currently matching</p>
                  <p className="mt-1 text-lg font-medium text-white">Connection #024 • 92% vibe match</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs text-secondary">
                  <Stars className="h-3.5 w-3.5" />
                  live chemistry
                </div>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
                <div className="space-y-5 rounded-[28px] border border-white/8 bg-[#0d1020]/80 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">moodboard</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">Somebody who makes 1 a.m. feel calm.</h3>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/8 bg-white/[0.04] text-primary">
                      <UserRoundSearch className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-primary/20 bg-primary/10 p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-primary">conversation starter</p>
                    <p className="mt-2 text-base leading-7 text-white">
                      “What kind of person instantly makes you feel like you can exhale?”
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {spotlightFeatures.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <div key={feature.label} className="rounded-[22px] border border-white/8 bg-white/[0.04] p-4">
                          <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-white/[0.05] text-white">
                            <Icon className="h-5 w-5" />
                          </div>
                          <p className="text-sm font-medium text-white">{feature.label}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-[28px] border border-white/8 bg-white/[0.06] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
                  >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">signal feed</p>
                    <div className="mt-4 space-y-3">
                      {[
                        "You both love long-form podcasts and rainy train rides.",
                        "Their profile energy suggests thoughtful, high-empathy texting.",
                        "Voice date confidence level: high.",
                      ].map((item, index) => (
                        <div key={item} className="rounded-2xl border border-white/8 bg-black/20 p-3 text-sm text-white/90">
                          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[11px] text-primary">
                            {index + 1}
                          </span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-[28px] border border-white/8 bg-gradient-to-br from-accent/15 to-secondary/8 p-5"
                  >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">beta note</p>
                    <p className="mt-3 text-lg font-medium text-white">A cleaner, calmer alternative to swipe fatigue.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-12 overflow-hidden rounded-full border border-white/8 bg-white/[0.04] py-3"
        >
          <div className="flex min-w-max animate-[marquee_18s_linear_infinite] gap-3 px-3">
            {[...orbitChips, ...orbitChips].map((chip, index) => (
              <div key={`${chip}-${index}`} className="rounded-full border border-white/8 bg-black/20 px-4 py-2 text-sm text-white/90">
                {chip}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
