"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
    <main className="min-h-screen bg-[#f5f0e7] p-3 md:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1500px] overflow-hidden rounded-[34px] border-2 border-[#161616] lg:grid-cols-[.9fr_1.1fr] md:min-h-[calc(100vh-2.5rem)]">
        <section className="flex flex-col justify-between bg-[#161616] p-7 text-white md:p-10">
          <Link href="/" className="font-serif text-2xl font-bold">MYSTERY<span className="text-[#ff5f4d]">.</span></Link>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8ff62]">WELCOME BACK</p>
            <h1 className="mt-4 max-w-xl font-serif text-6xl leading-[.82] tracking-[-0.06em] md:text-8xl">Pick up the conversation.</h1>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/45">No feeds. No popularity contest. Just the people you actually chose to know.</p>
        </section>

        <section className="grid place-items-center bg-[#ff5f4d] p-6 md:p-10">
          <motion.form initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className="w-full max-w-lg rounded-[30px] bg-[#f5f0e7] p-7 shadow-[12px_12px_0_#161616] md:p-9">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6d5dfc]">LOG IN</p>
              <h2 className="mt-2 font-serif text-5xl tracking-[-0.05em] text-[#161616]">Good to see you.</h2>
            </div>
            <label className="block text-sm font-bold text-[#161616]">Email
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-2 h-13 w-full rounded-2xl border-2 border-[#161616] bg-transparent px-4 outline-none focus:bg-white" placeholder="name@example.com" />
            </label>
            <label className="mt-5 block text-sm font-bold text-[#161616]">Password
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="mt-2 h-13 w-full rounded-2xl border-2 border-[#161616] bg-transparent px-4 outline-none focus:bg-white" />
            </label>
            <div className="mt-3 text-right"><Link href="/forgot-password" className="text-xs font-bold text-[#6d5dfc] hover:underline">Forgot password?</Link></div>
            {error && <p className="mt-4 text-sm font-bold text-[#d22f28]">{error}</p>}
            <button disabled={loading} className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-[#161616] font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-60">{loading ? "Signing in…" : <>Enter MYSTERY <ArrowUpRight className="ml-2 h-4 w-4"/></>}</button>
            <p className="mt-6 text-center text-sm text-[#6b655e]">New here? <Link href="/signup" className="font-bold text-[#161616] underline">Create an account</Link></p>
          </motion.form>
        </section>
      </div>
    </main>
  );
}
