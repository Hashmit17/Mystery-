"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
      if (res.ok) {
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) setError(result.error); else router.push("/onboarding");
      } else {
        setError((await res.text()) || "Something went wrong");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f0e7] p-3 md:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1500px] overflow-hidden rounded-[34px] border-2 border-[#161616] lg:grid-cols-[1.08fr_.92fr] md:min-h-[calc(100vh-2.5rem)]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-[#d8ff62] p-7 text-[#161616] md:p-10">
          <div className="absolute -right-20 top-24 h-72 w-72 rounded-full border-[44px] border-[#6d5dfc]" />
          <Link href="/" className="relative z-10 font-serif text-2xl font-bold">MYSTERY<span className="text-[#ff5f4d]">.</span></Link>
          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em]">NO SWIPE MARATHON</p>
            <h1 className="mt-4 font-serif text-6xl leading-[.8] tracking-[-0.065em] md:text-8xl lg:text-9xl">Make one good connection.</h1>
          </div>
          <p className="relative z-10 max-w-sm text-sm font-medium leading-6 text-black/55">Start anonymous. Talk like a person. Reveal more when both of you want to.</p>
        </section>

        <section className="grid place-items-center bg-[#6d5dfc] p-6 md:p-10">
          <motion.form initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className="w-full max-w-lg rounded-[30px] bg-[#f5f0e7] p-7 shadow-[12px_12px_0_#161616] md:p-9">
            <div className="mb-7"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff5f4d]">JOIN MYSTERY</p><h2 className="mt-2 font-serif text-5xl tracking-[-0.05em]">Start with a hello.</h2></div>
            <label className="block text-sm font-bold">Name<input type="text" value={name} onChange={(e)=>setName(e.target.value)} required className="mt-2 h-13 w-full rounded-2xl border-2 border-[#161616] bg-transparent px-4 outline-none focus:bg-white" placeholder="What should we call you?"/></label>
            <label className="mt-4 block text-sm font-bold">Email<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-2 h-13 w-full rounded-2xl border-2 border-[#161616] bg-transparent px-4 outline-none focus:bg-white" placeholder="name@example.com"/></label>
            <label className="mt-4 block text-sm font-bold">Password<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={8} className="mt-2 h-13 w-full rounded-2xl border-2 border-[#161616] bg-transparent px-4 outline-none focus:bg-white" placeholder="Minimum 8 characters"/></label>
            {error && <p className="mt-4 text-sm font-bold text-[#d22f28]">{error}</p>}
            <button disabled={loading} className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-[#161616] font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-60">{loading ? "Creating account…" : <>Join MYSTERY <ArrowUpRight className="ml-2 h-4 w-4"/></>}</button>
            <p className="mt-5 text-center text-sm text-[#6b655e]">Already a member? <Link href="/login" className="font-bold text-[#161616] underline">Log in</Link></p>
            <p className="mt-4 text-center text-[11px] leading-5 text-[#777066]">By joining, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>. 18+ only.</p>
          </motion.form>
        </section>
      </div>
    </main>
  );
}
