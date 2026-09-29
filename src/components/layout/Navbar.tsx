import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between rounded-full border border-[#eadce2] bg-white/78 px-3 pl-5 shadow-[0_12px_36px_rgba(103,75,91,.08)] backdrop-blur-2xl md:px-4 md:pl-6">
        <Link href="/" className="flex items-center gap-2 text-[17px] font-black tracking-[-0.04em] text-[#44343d]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f8c8d5]">
            <Heart className="h-4 w-4 fill-[#ee7d9a] text-[#ee7d9a]" />
          </span>
          MYSTERY
        </Link>

        <div className="hidden items-center gap-7 text-sm font-semibold text-[#735e69] md:flex">
          <Link href="#how-it-works" className="transition hover:text-[#e36f90]">the vibe</Link>
          <Link href="#features" className="transition hover:text-[#e36f90]">why it works</Link>
          <Link href="#safety" className="transition hover:text-[#e36f90]">safe space</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#725d68] transition hover:bg-[#f9eef2] sm:block">
            log in
          </Link>
          <Link href="/signup" className="inline-flex h-10 items-center rounded-full bg-[#4b3944] px-5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(78,55,68,.14)] transition hover:-translate-y-0.5 hover:bg-[#5a414f]">
            find my person <Sparkles className="ml-2 h-3.5 w-3.5 text-[#ffe7a7]" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
