"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Mic2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CITY = "https://images.unsplash.com/photo-1774299485593-16190669566b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=75&w=1800";
const CAFE = "https://images.unsplash.com/photo-1784359078338-c491cb748858?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=75&w=1600";
const WATER = "https://images.unsplash.com/photo-1773946031450-0553ea99d6da?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=75&w=1800";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-24 md:px-6 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid min-h-[82vh] gap-5 lg:grid-cols-[1.04fr_.96fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="relative flex min-h-[620px] flex-col justify-between overflow-hidden rounded-[34px] bg-[#161616] p-6 text-[#f5f0e7] md:p-9 lg:min-h-[720px]"
          >
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#ff5f4d] blur-[100px] opacity-35" />
            <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#6d5dfc] blur-[100px] opacity-25" />

            <div className="relative flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
                <Sparkles className="h-3.5 w-3.5 text-[#d8ff62]" />
                dating, but interesting
              </span>
              <span className="hidden text-xs text-white/45 sm:block">EST. FOR BETTER CONVERSATIONS</span>
            </div>

            <div className="relative py-14 md:py-20">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#ff7969]">MYSTERY / 01</p>
              <h1 className="max-w-[900px] font-serif text-[clamp(4.7rem,10vw,10.5rem)] leading-[0.74] tracking-[-0.07em] text-[#f5f0e7]">
                Meet before
                <span className="block italic text-[#d8ff62]">you judge.</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-7 text-white/64 md:text-xl">
                Chemistry first. Photos later. One good conversation can beat a hundred swipes.
              </p>
            </div>

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Link href="/signup" data-cursor-label="JOIN">
                  <Button className="h-14 rounded-full bg-[#ff5f4d] px-7 text-base font-bold text-[#161616] hover:bg-[#ff7566]">
                    Enter MYSTERY <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works" data-cursor-label="LOOK">
                  <Button variant="outline" className="h-14 rounded-full border-white/20 bg-transparent px-6 text-white hover:bg-white hover:text-black">
                    How it works <ArrowDownRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="max-w-[220px] text-sm leading-6 text-white/45">Built for people who want a story, not a catalogue.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.975 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
            className="grid min-h-[720px] grid-rows-[1.28fr_.72fr] gap-5"
          >
            <div className="relative overflow-hidden rounded-[34px] bg-[#ff5f4d]">
              <img src={CITY} alt="A couple walking together through a city street" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(22,22,22,.08)_62%,rgba(22,22,22,.78)_100%)]" />
              <div className="absolute left-5 top-5 rounded-full bg-[#f5f0e7] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#161616]">No photo-first matching</div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white/65">CONNECTION #024</p>
                  <p className="mt-1 max-w-sm font-serif text-4xl leading-[.92] text-white md:text-5xl">“Tell me what you secretly love.”</p>
                </div>
                <div className="hidden h-20 w-20 shrink-0 place-items-center rounded-full bg-[#d8ff62] text-[#161616] sm:grid">
                  <Mic2 className="h-7 w-7" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[.9fr_1.1fr] gap-5">
              <div className="relative overflow-hidden rounded-[30px] bg-[#6d5dfc]">
                <img src={CAFE} alt="A couple talking over drinks" className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity" />
                <div className="absolute inset-0 bg-[#6d5dfc]/45 mix-blend-multiply" />
                <div className="absolute inset-x-4 bottom-4 rounded-[22px] bg-[#161616]/88 p-4 text-[#f5f0e7] backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">voice date</p>
                  <p className="mt-2 text-lg font-semibold">Tonight · 9:30 PM</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[30px] bg-[#d8ff62] p-5">
                <img src={WATER} alt="A joyful couple laughing by the water" className="absolute inset-x-0 bottom-0 h-[64%] w-full object-cover object-center" />
                <div className="relative z-10 flex items-start justify-between">
                  <p className="max-w-[170px] font-serif text-3xl leading-[.9] tracking-[-0.04em] text-[#161616]">A better first impression.</p>
                  <span className="rounded-full border border-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]">92% vibe</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
