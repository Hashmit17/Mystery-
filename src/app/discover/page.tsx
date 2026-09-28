"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Compass, MapPin, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Card = {
  userId: string; alias: string; age: number; broadLocation?: string | null; bio?: string | null;
  interests: string[]; sharedInterests: string[]; relationshipGoals?: string | null;
  prompt: string; promptAnswer?: string | null; compatibility: string;
};

export default function DiscoverPage() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/discover", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (data.needsOnboarding) return router.replace("/onboarding");
      setCards(data.profiles ?? []);
    } catch { setError("Unable to load discovery right now."); }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { void load(); }, [load]);

  const connect = async () => {
    const card = cards[0]; if (!card) return;
    const res = await fetch("/api/connections", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ recipientId: card.userId }) });
    if (res.ok) setCards((prev) => prev.slice(1)); else setError(await res.text());
  };
  const current = cards[0];

  return <div className="min-h-screen flex flex-col p-6 max-w-2xl mx-auto">
    <header className="flex justify-between items-center mb-8 pt-4">
      <div><h1 className="text-2xl font-bold text-white">Discover</h1><p className="text-sm text-muted-foreground flex items-center mt-1"><MapPin className="w-3 h-3 mr-1"/>Privacy-first profiles in your preference range</p></div>
      <Button variant="ghost" size="icon" onClick={() => setShowFilters(true)} className="rounded-full"><SlidersHorizontal className="w-5 h-5"/></Button>
    </header>
    {error && <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-red-200">{error}</div>}
    <div className="flex-1 flex items-center justify-center">
      {loading ? <p className="text-muted-foreground">Finding thoughtful matches…</p> :
      current ? <AnimatePresence mode="popLayout"><motion.div key={current.userId} initial={{opacity:0,scale:.96,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,x:-160,rotate:-8}} className="w-full">
        <div className="glass-elevated rounded-[2rem] p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"/>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white">{current.alias}</h2>
            <p className="text-muted-foreground mt-1">{current.age}{current.broadLocation ? ` • ${current.broadLocation}` : ""}</p>
            <p className="text-lg text-gray-200 my-6 leading-relaxed">{current.bio || "A private profile focused on conversation first."}</p>
            <div className="mb-6"><p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Interests</p><div className="flex flex-wrap gap-2">{current.interests.map((i)=><span key={i} className={`px-3 py-1.5 rounded-full border text-xs ${current.sharedInterests.includes(i) ? "bg-primary/15 border-primary/30 text-primary" : "bg-white/5 border-white/10 text-white"}`}>{i}</span>)}</div></div>
            <div className="mb-6 bg-primary/10 border border-primary/20 rounded-2xl p-5"><p className="text-xs text-primary uppercase tracking-wider mb-2">Connection insight</p><p className="text-sm text-gray-200">{current.compatibility}</p></div>
            <div className="mb-8 bg-black/30 rounded-2xl p-5 border border-white/5"><p className="text-xs text-muted-foreground mb-2">Conversation starter</p><p className="text-white italic">“{current.prompt}”</p>{current.promptAnswer && <p className="text-sm text-gray-400 mt-3">Their answer: {current.promptAnswer}</p>}</div>
            <div className="flex gap-4"><Button onClick={()=>setCards((p)=>p.slice(1))} variant="outline" className="flex-1 h-14 rounded-full border-white/10"><X className="w-5 h-5 mr-2"/>Pass</Button><Button onClick={connect} className="flex-1 h-14 rounded-full"><Check className="w-5 h-5 mr-2"/>Connect</Button></div>
          </div>
        </div>
      </motion.div></AnimatePresence> : <div className="text-center"><div className="w-24 h-24 rounded-full bg-white/5 grid place-items-center mx-auto mb-6"><Compass className="w-10 h-10 text-muted-foreground"/></div><h2 className="text-2xl font-bold">No new profiles right now</h2><p className="text-muted-foreground mt-2 mb-6">As more people join—or after you adjust preferences—new profiles will appear here.</p><Button variant="outline" onClick={()=>setShowFilters(true)}>Adjust filters</Button></div>}
    </div>
    <AnimatePresence>{showFilters && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end"><motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} className="w-full max-w-sm h-full glass-elevated p-6"><div className="flex justify-between items-center"><h2 className="text-xl font-bold">Discovery preferences</h2><Button variant="ghost" size="icon" onClick={()=>setShowFilters(false)}><X/></Button></div><p className="text-muted-foreground text-sm mt-6">Age range and discovery distance are saved from Settings. Update them there to change matching.</p><Button className="w-full mt-8" onClick={()=>router.push("/settings")}>Open Settings</Button></motion.div></motion.div>}</AnimatePresence>
  </div>;
}
