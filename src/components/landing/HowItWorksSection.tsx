"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, EyeOff, MessageCircle, Sparkles } from "lucide-react";

const steps = [
  { n: "01", title: "Get a signal", copy: "Match on prompts, humour and interests — not a photo grid.", icon: Sparkles, tone: "bg-[#ff5f4d]" },
  { n: "02", title: "Start talking", copy: "Text, ask weird questions, schedule a voice date. Keep it human.", icon: MessageCircle, tone: "bg-[#6d5dfc] text-white" },
  { n: "03", title: "Reveal together", copy: "See more only when both people decide the moment feels right.", icon: EyeOff, tone: "bg-[#d8ff62]" },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff5f4d]">HOW MYSTERY WORKS</p>
          <h2 className="font-serif text-5xl leading-[.88] tracking-[-0.055em] text-[#161616] md:text-7xl lg:text-8xl">
            Less profile shopping.<br/><span className="italic text-[#6d5dfc]">More actual feeling.</span>
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map(({ n, title, copy, icon: Icon, tone }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`${tone} group flex min-h-[360px] flex-col justify-between rounded-[30px] p-6 md:p-8`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold tracking-[0.2em] opacity-55">{n}</span>
                <div className="grid h-12 w-12 place-items-center rounded-full border border-current/20 bg-white/15"><Icon className="h-5 w-5"/></div>
              </div>
              <div>
                <h3 className="font-serif text-4xl leading-[.95] tracking-[-0.04em] md:text-5xl">{title}</h3>
                <div className="mt-5 flex items-end justify-between gap-5">
                  <p className="max-w-[280px] text-base leading-6 opacity-70">{copy}</p>
                  <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
