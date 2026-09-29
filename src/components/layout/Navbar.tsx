import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav className="mx-auto flex h-15 max-w-[1500px] items-center justify-between rounded-full border-2 border-[#161616] bg-[#f5f0e7]/92 px-3 pl-5 shadow-[0_8px_0_#161616] backdrop-blur-xl md:px-4 md:pl-6">
        <Link href="/" className="font-serif text-xl font-bold tracking-[-0.04em] text-[#161616]">MYSTERY<span className="text-[#ff5f4d]">.</span></Link>
        <div className="hidden items-center gap-7 text-sm font-semibold text-[#161616] md:flex">
          <Link href="#how-it-works" className="hover:underline">How it works</Link>
          <Link href="#features" className="hover:underline">Why it’s different</Link>
          <Link href="#safety" className="hover:underline">Safety</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#161616] hover:bg-black/5 sm:block">Log in</Link>
          <Link href="/signup" data-cursor-label="JOIN" className="inline-flex h-10 items-center rounded-full bg-[#161616] px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">Join <ArrowUpRight className="ml-2 h-4 w-4"/></Link>
        </div>
      </nav>
    </div>
  );
}
