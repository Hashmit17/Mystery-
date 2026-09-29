import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-4 pb-6 pt-8 md:px-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[38px] bg-[#4a3945] px-6 pb-7 pt-10 text-[#fff9f7] shadow-[0_24px_70px_rgba(75,55,68,.14)] md:px-10 md:pt-12">
        <div className="grid gap-10 border-b border-white/12 pb-10 md:grid-cols-[1.35fr_.65fr]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.17em] text-[#f5b4c6]">
              <Heart className="h-3.5 w-3.5 fill-current" /> maybe this is your sign
            </div>
            <h3 className="mt-4 max-w-3xl text-5xl font-semibold leading-[.9] tracking-[-.055em] md:text-7xl">
              less swiping.<br/><span className="font-serif italic text-[#d9cdf8]">more butterflies.</span>
            </h3>
          </div>

          <div className="flex flex-col justify-between gap-8 md:items-end">
            <Link href="/signup" className="inline-flex h-14 items-center rounded-full bg-[#f7bfd0] px-6 font-bold text-[#4a3945] transition hover:-translate-y-0.5">
              find my person <Sparkles className="ml-2 h-4 w-4" />
            </Link>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/55">
              <Link href="/safety" className="hover:text-white">Safety</Link>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/guidelines" className="hover:text-white">Guidelines</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 text-xs font-medium text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MYSTERY</p>
          <p>conversation first · reveal when it feels right ♡</p>
        </div>
      </div>
    </footer>
  );
}
