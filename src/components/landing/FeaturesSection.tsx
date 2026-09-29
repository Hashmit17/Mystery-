"use client";

import { motion } from "framer-motion";
import { EyeOff, LockKeyhole, Mic2, Sparkles } from "lucide-react";

const MORNING = "https://images.unsplash.com/photo-1758522485066-be71f3486e0b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=75&w=1800";

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[38px] bg-[#161616] p-5 text-[#f5f0e7] md:p-8 lg:p-10">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="relative min-h-[640px] overflow-hidden rounded-[30px]"
          >
            <img src={MORNING} alt="Two people sharing a quiet morning conversation" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,22,22,.08),rgba(22,22,22,.16)_45%,rgba(22,22,22,.9)_100%)]" />
            <div className="absolute left-5 top-5 rounded-full bg-[#d8ff62] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#161616]">NO PERFORMANCE REQUIRED</div>
            <div className="absolute bottom-0 p-6 md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">THE EXPERIENCE</p>
              <h2 className="mt-4 max-w-xl font-serif text-5xl leading-[.86] tracking-[-0.05em] md:text-7xl">Dating that feels less like an audition.</h2>
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[30px] bg-[#6d5dfc] p-6 md:p-8">
              <div className="flex items-center justify-between"><Mic2 className="h-6 w-6"/><span className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">VOICE / 02</span></div>
              <h3 className="mt-16 font-serif text-4xl leading-[.92] md:text-5xl">Hear the person, not the pitch.</h3>
              <p className="mt-4 max-w-md text-white/70">A scheduled voice date gives the conversation somewhere to go before anything gets revealed.</p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[30px] bg-[#f5f0e7] p-6 text-[#161616]">
                <EyeOff className="h-6 w-6" />
                <p className="mt-12 font-serif text-3xl leading-[.95]">Photos are earned, not assumed.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .06 }} className="rounded-[30px] bg-[#ff5f4d] p-6 text-[#161616]">
                <LockKeyhole className="h-6 w-6" />
                <p className="mt-12 font-serif text-3xl leading-[.95]">Mutual reveal. No one-sided unlocks.</p>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center justify-between rounded-[30px] border border-white/15 p-6 md:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">THE POINT</p>
                <p className="mt-2 text-2xl font-medium">One memorable connection &gt; endless options.</p>
              </div>
              <Sparkles className="h-7 w-7 text-[#d8ff62]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
