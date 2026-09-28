"use client";

import { motion } from "framer-motion";
import { AudioWaveform, Eye, MessageCircleMore, Radar, ShieldHalf, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Shape your signal",
    description:
      "Craft a profile through prompts, interests, and vibe settings that say more than a filtered photo ever could.",
    icon: Sparkles,
    accent: "from-primary/35 to-primary/5",
  },
  {
    number: "02",
    title: "Discover privately",
    description:
      "Browse nearby people inside your preference zone while your exact identity and location remain protected.",
    icon: Radar,
    accent: "from-secondary/30 to-secondary/5",
  },
  {
    number: "03",
    title: "Build chemistry first",
    description:
      "Open with guided prompts, flowing chat, and optional voice notes to feel the person before the visuals.",
    icon: MessageCircleMore,
    accent: "from-accent/30 to-accent/5",
  },
  {
    number: "04",
    title: "Reveal when it feels right",
    description:
      "Unlock photos or schedule a voice date only when both people want the next layer of the connection.",
    icon: Eye,
    accent: "from-white/20 to-white/5",
  },
];

const extras = [
  { label: "guided prompts", icon: AudioWaveform },
  { label: "consent based", icon: ShieldHalf },
  { label: "voice ready", icon: AudioWaveform },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden px-4 py-24 md:px-6 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.1),transparent_28%)]" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white">
              <Sparkles className="h-4 w-4 text-secondary" />
              How the experience unfolds
            </div>
            <h2 className="mt-6 max-w-lg text-4xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-5xl">
              Deliberate steps.
              <span className="block text-muted-foreground">More anticipation. Less noise.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              Instead of throwing you into an endless deck of faces, MYSTERY creates a slower, premium feeling flow that makes every interaction feel more intentional.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {extras.map(({ label, icon: Icon }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/90">
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[31px] top-8 hidden h-[calc(100%-64px)] w-px bg-gradient-to-b from-primary/40 via-white/15 to-secondary/40 md:block" />
            <div className="space-y-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                    className="relative rounded-[30px] border border-white/8 bg-white/[0.04] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-6"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-start">
                      <div className={`relative grid h-16 w-16 shrink-0 place-items-center rounded-[22px] border border-white/10 bg-gradient-to-br ${step.accent}`}>
                        <span className="absolute -right-2 -top-2 rounded-full border border-white/10 bg-[#0b0f1c] px-2 py-1 text-[10px] tracking-[0.28em] text-white/80">
                          {step.number}
                        </span>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-medium text-white">{step.title}</h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
