"use client";

import { motion } from "framer-motion";
import { AudioLines, LockKeyhole, MessageCircleHeart, Orbit, Radar, ShieldCheck, Sparkles } from "lucide-react";

const cards = [
  {
    title: "A bento board for better signals",
    description: "Profiles feel like moodboards. Prompts, interests, and compatibility notes work together to build intrigue.",
    icon: Orbit,
    className: "lg:col-span-7",
    accent: "from-primary/18 via-accent/10 to-transparent",
  },
  {
    title: "Reveal control",
    description: "Nothing gets unlocked unless both people are comfortable moving forward.",
    icon: LockKeyhole,
    className: "lg:col-span-5",
    accent: "from-secondary/16 via-primary/8 to-transparent",
  },
  {
    title: "Chats that feel alive",
    description: "Message threads, smart prompts, and soft transitions make the app feel premium and emotionally warm.",
    icon: MessageCircleHeart,
    className: "lg:col-span-4",
    accent: "from-accent/15 via-primary/8 to-transparent",
  },
  {
    title: "Voice dates on your timeline",
    description: "Schedule the next step in the same flow instead of leaving the app and losing momentum.",
    icon: AudioLines,
    className: "lg:col-span-4",
    accent: "from-secondary/16 via-white/6 to-transparent",
  },
  {
    title: "Private by default",
    description: "Location is generalized, safety flows are built in, and the whole product is tuned to reduce social pressure.",
    icon: ShieldCheck,
    className: "lg:col-span-4",
    accent: "from-primary/16 via-secondary/8 to-transparent",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden px-4 py-24 md:px-6 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(139,92,246,0.16),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(34,211,238,0.12),transparent_26%)]" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white">
            <Radar className="h-4 w-4 text-accent" />
            The experience, redesigned
          </div>
          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-5xl">
            A product system that feels futuristic, calm, and a little addictive.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
            Every card, layout, and transition is designed to feel intentional—less app clutter, more cinematic anticipation.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.07 }}
                className={`${card.className} group relative overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-7`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="grid h-14 w-14 place-items-center rounded-[20px] border border-white/10 bg-white/[0.05] text-white">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mt-5 max-w-md text-2xl font-medium text-white">{card.title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                        {card.description}
                      </p>
                    </div>
                    <Sparkles className="mt-1 hidden h-5 w-5 text-white/50 md:block" />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/8 bg-black/18 p-4">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">micro detail</p>
                      <p className="mt-3 text-sm leading-6 text-white/90">Subtle hover states, softer corners, and high-contrast typography keep the interface feeling premium.</p>
                    </div>
                    <div className="rounded-[22px] border border-white/8 bg-black/18 p-4">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">motion system</p>
                      <p className="mt-3 text-sm leading-6 text-white/90">Cards float in, buttons lift, gradients breathe, and cursor light responds to movement in real time.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
