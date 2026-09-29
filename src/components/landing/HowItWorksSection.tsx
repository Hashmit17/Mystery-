"use client";

import { motion } from "framer-motion";
import { HeartHandshake, MessageCircleHeart, Sparkles } from "lucide-react";

const steps = [
  {
    kicker: "01 / catch a vibe",
    title: "find someone interesting",
    copy: "Prompts, humour and shared little obsessions do the first impression.",
    icon: Sparkles,
    tone: "bg-[#f9dce5]",
  },
  {
    kicker: "02 / make it a thing",
    title: "talk like actual people",
    copy: "Message, be weird, schedule a voice date. No performance necessary.",
    icon: MessageCircleHeart,
    tone: "bg-[#e7defa]",
  },
  {
    kicker: "03 / soft reveal",
    title: "unlock it together",
    copy: "You both choose when the mystery becomes a little less mysterious.",
    icon: HeartHandshake,
    tone: "bg-[#fff0c9]",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#f5e8ee] px-4 py-2 text-xs font-black uppercase tracking-[.15em] text-[#9a7182]">
            how it goes
          </span>
          <h2 className="mt-5 text-5xl font-semibold leading-[.95] tracking-[-.055em] text-[#493741] md:text-7xl">
            the soft launch of dating.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#89717d]">
            Less “sell yourself in six photos.” More “wait, I actually want to know you.”
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map(({ kicker, title, copy, icon: Icon, tone }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .3 }}
              transition={{ duration: .55, delay: index * .08 }}
              className={`${tone} relative min-h-[330px] overflow-hidden rounded-[32px] border border-white/70 p-7 shadow-[0_18px_45px_rgba(100,72,86,.06)] md:p-8`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-[.17em] text-[#8a6d7a]">{kicker}</span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-[#6b5260]">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="absolute inset-x-7 bottom-7 md:inset-x-8 md:bottom-8">
                <h3 className="max-w-sm text-3xl font-bold leading-[1.02] tracking-[-.04em] text-[#493741] md:text-4xl">{title}</h3>
                <p className="mt-4 max-w-sm leading-7 text-[#7d6672]">{copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
