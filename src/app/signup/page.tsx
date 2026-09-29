"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) setError(result.error);
        else router.push("/onboarding");
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
    <main className="relative min-h-screen overflow-hidden bg-[#fff9f7] px-4 py-5 md:px-6">
      <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-[#ffe8b8]/40 blur-3xl" />
      <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-[#d4c8f5]/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-[1280px] overflow-hidden rounded-[38px] border border-[#eadde2] bg-white/65 shadow-[0_28px_90px_rgba(95,68,82,.10)] backdrop-blur-xl lg:grid-cols-[1.02fr_.98fr]">
        <section className="relative flex min-h-[440px] flex-col justify-between overflow-hidden bg-[#e9e0f8] p-8 md:p-11">
          <div className="absolute -right-24 top-[18%] h-72 w-72 rounded-full bg-[#f6c7d5]/50 blur-2xl" />
          <Link href="/" className="relative z-10 flex items-center gap-2 font-black text-[#493741]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/65"><Heart className="h-4 w-4 fill-[#e986a1] text-[#e986a1]" /></span>
            MYSTERY
          </Link>
          <div className="relative z-10">
            <span className="inline-flex -rotate-1 rounded-full bg-[#fff4bf] px-4 py-2 text-xs font-black uppercase tracking-[.15em] text-[#7a6438]">rom-com energy, less chaos</span>
            <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[.9] tracking-[-.06em] text-[#4e3d58] md:text-7xl">
              maybe your next <span className="font-serif italic text-[#d67693]">favorite person</span> is here.
            </h1>
          </div>
          <p className="relative z-10 max-w-sm text-sm leading-6 text-[#7b6b83]">Start with a hello. Keep the photos mysterious. Let the chemistry earn the next chapter.</p>
        </section>

        <section className="grid place-items-center p-6 md:p-10">
          <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className="w-full max-w-lg rounded-[32px] border border-[#eadde2] bg-[#fffdfb]/92 p-7 shadow-[0_20px_50px_rgba(95,68,82,.08)] md:p-9">
            <div className="mb-7">
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#b18aa0]">join mystery</p>
              <h2 className="mt-2 text-4xl font-bold tracking-[-.04em] text-[#493741]">start your soft launch.</h2>
            </div>

            <label className="block text-sm font-bold text-[#5c4652]">Name
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required className="mt-2 h-13 w-full rounded-2xl border border-[#e7d8df] bg-[#fff8fa] px-4 outline-none transition focus:border-[#eca0b5] focus:bg-white focus:ring-4 focus:ring-[#f7dce5]" placeholder="What should we call you?" />
            </label>

            <label className="mt-4 block text-sm font-bold text-[#5c4652]">Email
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-2 h-13 w-full rounded-2xl border border-[#e7d8df] bg-[#fff8fa] px-4 outline-none transition focus:border-[#eca0b5] focus:bg-white focus:ring-4 focus:ring-[#f7dce5]" placeholder="name@example.com" />
            </label>

            <label className="mt-4 block text-sm font-bold text-[#5c4652]">Password
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={8} className="mt-2 h-13 w-full rounded-2xl border border-[#e7d8df] bg-[#fff8fa] px-4 outline-none transition focus:border-[#eca0b5] focus:bg-white focus:ring-4 focus:ring-[#f7dce5]" placeholder="Minimum 8 characters" />
            </label>

            {error && <p className="mt-4 text-sm font-bold text-[#c95164]">{error}</p>}

            <button disabled={loading} className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-[#4b3944] font-bold text-white shadow-[0_10px_24px_rgba(75,57,68,.12)] transition hover:-translate-y-0.5 disabled:opacity-60">
              {loading ? "Creating account…" : <>let’s see what happens <Sparkles className="ml-2 h-4 w-4 text-[#ffe7a7]" /></>}
            </button>

            <p className="mt-5 text-center text-sm text-[#88727d]">Already here? <Link href="/login" className="font-bold text-[#d67592] hover:underline">log in</Link></p>
            <p className="mt-4 text-center text-[11px] leading-5 text-[#9a858f]">By joining, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>. 18+ only.</p>
          </motion.form>
        </section>
      </div>
    </main>
  );
}
