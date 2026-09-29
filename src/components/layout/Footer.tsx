import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-4 pb-6 pt-8 md:px-6">
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[38px] bg-[#161616] px-6 pb-6 pt-10 text-[#f5f0e7] md:px-9 md:pt-12">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.4fr_.6fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff7969]">NOT ANOTHER SWIPE APP</p>
            <h3 className="mt-4 max-w-3xl font-serif text-5xl leading-[.86] tracking-[-0.055em] md:text-7xl">Make the first thing memorable.</h3>
          </div>
          <div className="flex flex-col justify-between gap-7 md:items-end">
            <Link href="/signup" data-cursor-label="JOIN" className="inline-flex h-14 items-center rounded-full bg-[#d8ff62] px-6 font-bold text-[#161616]">Join MYSTERY <ArrowUpRight className="ml-2 h-4 w-4"/></Link>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/55">
              <Link href="/safety" className="hover:text-white">Safety</Link><Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/guidelines" className="hover:text-white">Guidelines</Link><Link href="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-6 text-xs font-medium uppercase tracking-[0.16em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MYSTERY</p>
          <p>Conversation first · reveal later</p>
        </div>
        <div className="overflow-hidden border-t border-white/15 pt-2">
          <p className="translate-y-[15%] whitespace-nowrap font-serif text-[clamp(5rem,18vw,17rem)] leading-none tracking-[-0.075em] text-[#f5f0e7]">MYSTERY</p>
        </div>
      </div>
    </footer>
  );
}
