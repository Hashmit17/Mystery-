"use client";

import { motion } from "framer-motion";
import { EyeOff, Heart, LockKeyhole, Mic2 } from "lucide-react";

const MORNING = "https://images.unsplash.com/photo-1758522485066-be71f3486e0b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1800";

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-12 md:px-6 md:py-18">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .25 }}
            className="relative min-h-[640px] overflow-hidden rounded-[36px] bg-[#f6dbe4] p-4 shadow-[0_22px_60px_rgba(92,65,80,.08)]"
          >
            <img src={MORNING} alt="Two people sharing a quiet conversation" className="h-full min-h-[608px] w-full rounded-[28px] object-cover" />
            <div className="absolute inset-4 rounded-[28px] bg-gradient-to-t from-[#4d3744]/70 via-transparent to-transparent" />
            <span className="absolute left-8 top-8 -rotate-2 rounded-full bg-[#fff8cf] px-4 py-2 text-xs font-black text-[#785f35] shadow-sm">
              low pressure, high chemistry ♡
            </span>
            <div className="absolute bottom-10 left-9 right-9 text-white">
              <p className="text-xs font-black uppercase tracking-[.18em] text-white/70">the whole point</p>
              <h2 className="mt-3 max-w-2xl text-5xl font-semibold leading-[.9] tracking-[-.055em] md:text-7xl">
                date like nobody’s grading you.
              </h2>
            </div>
          </motion.div>

          <div className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[34px] bg-[#e8defa] p-7 md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/70 text-[#6c5793]"><Mic2 className="h-5 w-5" /></span>
                <span className="text-xs font-black uppercase tracking-[.16em] text-[#8c78aa]">voice dates</span>
              </div>
              <h3 className="mt-16 max-w-lg text-4xl font-bold leading-[.96] tracking-[-.045em] text-[#51425f] md:text-5xl">
                hear the laugh before the hard launch.
              </h3>
              <p className="mt-4 max-w-md leading-7 text-[#786987]">A scheduled voice date keeps things intimate without making it intense.</p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[30px] bg-[#fff0c9] p-6">
                <EyeOff className="h-6 w-6 text-[#8a6b39]" />
                <p className="mt-12 text-2xl font-bold leading-tight tracking-[-.03em] text-[#5d4a2d]">photos can wait. personality can’t.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .05 }} className="rounded-[30px] bg-[#f9dce5] p-6">
                <LockKeyhole className="h-6 w-6 text-[#9d6276]" />
                <p className="mt-12 text-2xl font-bold leading-tight tracking-[-.03em] text-[#684752]">reveal only when it’s mutual.</p>
              </motion.div>
            </div>

            <div className="flex items-center justify-between rounded-[30px] border border-[#eadbe1] bg-white/70 p-6 backdrop-blur-md">
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-[#a27c8d]">green flag energy</p>
                <p className="mt-1 text-xl font-bold text-[#56414c]">one good connection &gt; 200 maybes</p>
              </div>
              <Heart className="h-6 w-6 fill-[#f3a6ba] text-[#f3a6ba]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
