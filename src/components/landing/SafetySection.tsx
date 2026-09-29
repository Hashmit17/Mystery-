"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeartHandshake, MapPin, ShieldCheck, Sparkles } from "lucide-react";

export function SafetySection() {
  return (
    <section id="safety" className="px-4 py-24 md:px-6 md:py-30">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .22 }}
          className="relative overflow-hidden rounded-[40px] border border-[#eadbe1] bg-[#f7e9f0] px-6 py-12 shadow-[0_24px_70px_rgba(92,65,80,.07)] md:px-12 md:py-16 lg:px-16"
        >
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#cfc1f4]/45 blur-3xl" />
          <div className="absolute -bottom-24 left-[20%] h-64 w-64 rounded-full bg-[#ffe8ac]/45 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/65 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-[#977181]">
                <ShieldCheck className="h-4 w-4" /> safe space energy
              </div>
              <h2 className="mt-6 text-5xl font-semibold leading-[.92] tracking-[-.055em] text-[#493741] md:text-7xl">
                romantic, <span className="font-serif italic text-[#df7895]">not reckless.</span>
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-lg leading-8 text-[#806a75]">
                Keep your pace, your boundaries, and your identity in your hands. Nothing unlocks just because someone asks.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-[#705966]">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/65 px-4 py-2"><HeartHandshake className="h-4 w-4 text-[#df7895]" /> mutual reveal</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/65 px-4 py-2"><MapPin className="h-4 w-4 text-[#9a86d0]" /> broad location only</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/65 px-4 py-2"><ShieldCheck className="h-4 w-4 text-[#8db49a]" /> report & disconnect</span>
              </div>

              <Link href="/signup" className="mt-8 inline-flex h-14 items-center rounded-full bg-[#4b3944] px-7 font-bold text-white shadow-[0_12px_26px_rgba(78,55,68,.12)] transition hover:-translate-y-0.5">
                okay, i’m curious <Sparkles className="ml-2 h-4 w-4 text-[#ffe7a7]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
