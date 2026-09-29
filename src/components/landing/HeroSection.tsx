"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, MessageCircleHeart, Sparkles, Star } from "lucide-react";

const CITY = "https://images.unsplash.com/photo-1774299485593-16190669566b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1800";
const CAFE = "https://images.unsplash.com/photo-1784359078338-c491cb748858?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1500";
const WATER = "https://images.unsplash.com/photo-1773946031450-0553ea99d6da?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1500";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-28 md:px-6 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, ease: "easeOut" }}
            className="relative z-10 py-6 lg:py-14"
          >
            <div className="inline-flex -rotate-1 items-center gap-2 rounded-full border border-[#f0dbe3] bg-white/80 px-4 py-2 text-xs font-bold text-[#9d7183] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#e9829f]" />
              dating with a little more plot
            </div>

            <h1 className="mt-7 max-w-3xl text-[clamp(4rem,8vw,8.4rem)] font-semibold leading-[.84] tracking-[-0.07em] text-[#46343e]">
              meet cute,
              <span className="block font-serif font-normal italic text-[#e77f9b]">minus the awkward.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#816b76] md:text-xl">
              Start with a vibe, a voice, and one actually-good conversation. Reveal more when it feels mutual.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/signup" className="inline-flex h-14 items-center justify-center rounded-full bg-[#4b3944] px-7 text-base font-bold text-white shadow-[0_12px_30px_rgba(78,55,68,.15)] transition hover:-translate-y-0.5">
                start my soft launch <Heart className="ml-2 h-4 w-4 fill-[#f7b8c9] text-[#f7b8c9]" />
              </Link>
              <Link href="#how-it-works" className="inline-flex h-14 items-center justify-center rounded-full border border-[#e9d8df] bg-white/70 px-6 text-base font-semibold text-[#69545f] transition hover:bg-white">
                see the vibe
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-[#876f7b]">
              {["no swipe spiral", "mutual reveal", "voice dates", "18+"].map((item) => (
                <span key={item} className="rounded-full border border-[#eadce2] bg-[#fffdfb]/80 px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: .98, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: .85, delay: .08, ease: "easeOut" }}
            className="relative mx-auto min-h-[590px] w-full max-w-[700px] md:min-h-[690px]"
          >
            <div className="absolute left-[5%] top-[10%] h-[70%] w-[63%] rotate-[-4deg] overflow-hidden rounded-[34px] border-[10px] border-white bg-white shadow-[0_24px_70px_rgba(92,65,80,.14)]">
              <img src={CITY} alt="Two people walking together" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#493844]/70 to-transparent p-6 pt-24 text-white">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-white/70">connection #024</p>
                <p className="mt-2 max-w-sm font-serif text-3xl leading-tight">“okay but what song feels like home?”</p>
              </div>
            </div>

            <div className="absolute right-[1%] top-[3%] w-[40%] rotate-[6deg] rounded-[28px] border-[8px] border-white bg-white p-2 shadow-[0_20px_55px_rgba(92,65,80,.13)]">
              <img src={CAFE} alt="People talking over coffee" className="aspect-[4/5] w-full rounded-[21px] object-cover" />
              <div className="px-2 pb-2 pt-3">
                <p className="font-serif text-xl italic text-[#59434f]">the “we talked for 3 hours” kind</p>
              </div>
            </div>

            <div className="absolute bottom-[2%] right-[5%] w-[43%] rotate-[3deg] rounded-[28px] border-[8px] border-white bg-[#f6eafa] p-2 shadow-[0_20px_55px_rgba(92,65,80,.13)]">
              <img src={WATER} alt="A couple laughing together" className="aspect-[4/3] w-full rounded-[21px] object-cover" />
              <div className="flex items-center justify-between px-2 pb-2 pt-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a17c8c]">vibe check</p>
                  <p className="mt-1 text-sm font-bold text-[#59434f]">92% “wait, same?”</p>
                </div>
                <MessageCircleHeart className="h-5 w-5 text-[#e67d99]" />
              </div>
            </div>

            <div className="absolute left-[1%] bottom-[10%] -rotate-6 rounded-2xl bg-[#ffe9ad] px-4 py-3 text-sm font-black text-[#6b5430] shadow-[0_14px_35px_rgba(92,65,80,.1)]">
              <span className="mr-2">♡</span> slow burn approved
            </div>

            <div className="absolute right-[4%] top-[42%] rotate-6 rounded-full bg-[#cabcf2] p-4 text-[#55446f] shadow-sm">
              <Star className="h-5 w-5 fill-current" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
