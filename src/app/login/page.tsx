"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/discover");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff9f7] px-4 py-5 md:px-6">
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#f7c8d5]/45 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-[#d4c8f5]/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-[1280px] overflow-hidden rounded-[38px] border border-[#eadde2] bg-white/65 shadow-[0_28px_90px_rgba(95,68,82,.10)] backdrop-blur-xl lg:grid-cols-[.88fr_1.12fr]">
        <section className="relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-[#f6dce5] p-8 md:p-11">
          <Link href="/" className="flex items-center gap-2 font-black text-[#493741]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/70"><Heart className="h-4 w-4 fill-[#e986a1] text-[#e986a1]" /></span>
            MYSTERY
          </Link>
          <div>
            <span className="inline-flex rounded-full bg-white/55 px-4 py-2 text-xs font-black uppercase tracking-[.15em] text-[#9a7182]">welcome back ♡</span>
            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[.92] tracking-[-.055em] text-[#493741] md:text-7xl">
              your plot is still <span className="font-serif italic text-[#d97694]">developing.</span>
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#806a75]">Pick up the conversations that were actually worth coming back to.</p>
        </section>

        <section className="grid place-items-center p-6 md:p-10">
          <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className="w-full max-w-lg rounded-[32px] border border-[#eadde2] bg-[#fffdfb]/90 p-7 shadow-[0_20px_50px_rgba(95,68,82,.08)] md:p-9">
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#b18aa0]">log in</p>
              <h2 className="mt-2 text-4xl font-bold tracking-[-.04em] text-[#493741]">good to see you.</h2>
            </div>
            <label className="block text-sm font-bold text-[#5c4652]">Email
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-2 h-13 w-full rounded-2xl border border-[#e7d8df] bg-[#fff8fa] px-4 outline-none transition focus:border-[#eca0b5] focus:bg-white focus:ring-4 focus:ring-[#f7dce5]" placeholder="name@example.com" />
            </label>
            <label className="mt-5 block text-sm font-bold text-[#5c4652]">Password
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="mt-2 h-13 w-full rounded-2xl border border-[#e7d8df] bg-[#fff8fa] px-4 outline-none transition focus:border-[#eca0b5] focus:bg-white focus:ring-4 focus:ring-[#f7dce5]" />
            </label>
            <div className="mt-3 text-right"><Link href="/forgot-password" className="text-xs font-bold text-[#a17ab2] hover:underline">forgot password?</Link></div>
            {error && <p className="mt-4 text-sm font-bold text-[#c95164]">{error}</p>}
            <button disabled={loading} className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-[#4b3944] font-bold text-white shadow-[0_10px_24px_rgba(75,57,68,.12)] transition hover:-translate-y-0.5 disabled:opacity-60">
              {loading ? "Signing in…" : <>back to the plot <Sparkles className="ml-2 h-4 w-4 text-[#ffe7a7]" /></>}
            </button>
            <p className="mt-6 text-center text-sm text-[#88727d]">New here? <Link href="/signup" className="font-bold text-[#d67592] hover:underline">start something cute</Link></p>
          </motion.form>
        </section>
      </div>
    </main>
  );
}
