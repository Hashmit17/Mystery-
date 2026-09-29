"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SafetySection() {
  return (
    <section id="safety" className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} className="grid overflow-hidden rounded-[38px] border-2 border-[#161616] lg:grid-cols-[.72fr_1.28fr]">
          <div className="flex min-h-[420px] flex-col justify-between bg-[#d8ff62] p-7 text-[#161616] md:p-10">
            <div className="flex items-center justify-between">
              <ShieldCheck className="h-7 w-7" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">BOUNDARIES BUILT IN</span>
            </div>
            <div>
              <h2 className="font-serif text-5xl leading-[.85] tracking-[-0.05em] md:text-7xl">Your pace.<br/><span className="italic">Your reveal.</span></h2>
              <div className="mt-7 space-y-3 text-sm font-semibold">
                <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Mutual identity reveal</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Broad location only</p>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[520px] items-end overflow-hidden bg-[#ff5f4d] p-7 md:p-10">
            <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full border-[42px] border-[#6d5dfc] opacity-80" />
            <div className="absolute left-[14%] top-[16%] h-40 w-40 rounded-full bg-[#f5f0e7]" />
            <div className="absolute left-[21%] top-[24%] h-20 w-20 rounded-full bg-[#161616]" />
            <div className="relative z-10 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/55">READY WHEN YOU ARE</p>
              <h3 className="mt-4 font-serif text-5xl leading-[.84] tracking-[-0.055em] text-[#161616] md:text-7xl lg:text-8xl">Maybe the next person shouldn’t start with a picture.</h3>
              <Link href="/signup" data-cursor-label="JOIN">
                <Button className="mt-8 h-15 rounded-full bg-[#161616] px-7 text-base font-bold text-white hover:bg-[#302f2d]">
                  Join MYSTERY <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
