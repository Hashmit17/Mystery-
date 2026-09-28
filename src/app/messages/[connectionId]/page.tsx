"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, Flag, Send, Unplug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

type Message = { id: string; senderId: string; content: string; createdAt: string };
type ChatData = {
  currentUserId: string;
  connection: { id: string; alias: string; status: string; revealStatus?: string | null; otherUserId: string };
  messages: Message[];
};

export default function ChatPage() {
  const { connectionId } = useParams<{ connectionId: string }>();
  const router = useRouter();
  const [data, setData] = useState<ChatData | null>(null);
  const [input, setInput] = useState("");
  const [showReveal, setShowReveal] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async (quiet = false) => {
    if (!connectionId) return;
    const res = await fetch(`/api/messages/${connectionId}`, { cache: "no-store" });
    if (res.ok) {
      setData(await res.json());
      if (!quiet) setError("");
    } else if (!quiet) setError(await res.text());
  }, [connectionId]);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(true), 5000);
    return () => window.clearInterval(timer);
  }, [load]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [data?.messages.length]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || !connectionId) return;
    setInput("");
    const res = await fetch(`/api/messages/${connectionId}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }),
    });
    if (res.ok) void load(); else setError(await res.text());
  };

  const requestReveal = async () => {
    const res = await fetch("/api/reveal-requests", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ connectionId, requestedFields: "displayName,profile" }),
    });
    if (res.ok) { setShowReveal(false); void load(); } else setError(await res.text());
  };

  const disconnect = async () => {
    if (!confirm("Disconnect from this person? The conversation will be removed.")) return;
    const res = await fetch(`/api/connections/${connectionId}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "disconnect" }),
    });
    if (res.ok) router.replace("/connections"); else setError(await res.text());
  };

  const report = async () => {
    if (!data || !reportReason.trim()) return;
    const res = await fetch("/api/report", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportedUserId: data.connection.otherUserId, reason: reportReason }),
    });
    if (res.ok) { setReportReason(""); setShowSafety(false); setError("Report submitted for review."); }
    else setError(await res.text());
  };

  return (
    <DashboardShell>
      <div className="min-h-[100dvh] flex flex-col">
        <header className="glass border-b border-white/5 p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/connections"><Button variant="ghost" size="icon" aria-label="Back to connections"><ArrowLeft className="w-5 h-5"/></Button></Link>
            <div className="min-w-0"><h2 className="font-medium truncate">{data?.connection.alias ?? "Conversation"}</h2><p className="text-xs text-primary capitalize">{data?.connection.status ?? "Loading…"}{data?.connection.revealStatus ? ` • reveal ${data.connection.revealStatus}` : ""}</p></div>
          </div>
          <div className="flex gap-2">
            {data && data.connection.status !== "revealed" && <Button variant="outline" size="sm" onClick={()=>setShowReveal(true)}><Eye className="w-4 h-4 mr-2"/><span className="hidden sm:inline">Request Reveal</span></Button>}
            {data && <Button variant="ghost" size="icon" onClick={()=>setShowSafety(true)} aria-label="Safety options"><Flag className="w-4 h-4"/></Button>}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 max-w-4xl w-full mx-auto">
          {error && <div className={`rounded-xl border p-3 text-sm ${error.startsWith("Report submitted") ? "bg-primary/10 border-primary/20 text-primary" : "bg-destructive/10 border-destructive/30 text-red-200"}`}>{error}</div>}
          {!data && !error && <p className="text-muted-foreground text-center mt-12">Loading conversation…</p>}
          {data?.messages.length === 0 && <div className="text-center text-muted-foreground mt-12">Start with a question, curiosity, or something from their profile.</div>}
          {data?.messages.map((msg) => (
            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} key={msg.id} className={`flex ${msg.senderId===data.currentUserId ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] rounded-2xl px-5 py-3 ${msg.senderId===data.currentUserId ? "bg-primary rounded-br-sm" : "bg-white/10 border border-white/5 rounded-bl-sm"}`}>
                <p className="text-sm md:text-base whitespace-pre-wrap break-words">{msg.content}</p>
                <p className="text-[10px] mt-1.5 opacity-50">{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef}/>
        </div>

        <div className="p-4 glass border-t border-white/5 sticky bottom-0 z-30">
          <form onSubmit={sendMessage} className="max-w-4xl mx-auto relative">
            <input value={input} onChange={e=>setInput(e.target.value)} maxLength={2000} aria-label="Message" placeholder="Type a message…" className="w-full bg-black/40 border border-white/10 rounded-full pl-5 pr-14 py-4 focus:outline-none focus:border-primary/50"/>
            <Button type="submit" size="icon" disabled={!input.trim()} className="absolute right-2 top-2 rounded-full" aria-label="Send message"><Send className="w-4 h-4"/></Button>
          </form>
        </div>

        <AnimatePresence>
          {showReveal && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm grid place-items-center p-4">
            <motion.div initial={{scale:.96}} animate={{scale:1}} className="glass-elevated p-8 rounded-3xl max-w-sm text-center">
              <Eye className="w-9 h-9 text-primary mx-auto mb-4"/><h3 className="text-xl font-bold">Request a mutual reveal?</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-6">Your identity is only revealed when both people request it.</p>
              <Button className="w-full" onClick={requestReveal}>Request Mutual Reveal</Button><Button variant="ghost" className="w-full mt-2" onClick={()=>setShowReveal(false)}>Cancel</Button>
            </motion.div>
          </motion.div>}
          {showSafety && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm grid place-items-center p-4">
            <motion.div initial={{scale:.96}} animate={{scale:1}} className="glass-elevated p-7 rounded-3xl w-full max-w-md">
              <h3 className="text-xl font-bold">Safety options</h3><p className="text-sm text-muted-foreground mt-2">Report concerning behavior or disconnect at any time.</p>
              <textarea maxLength={1000} value={reportReason} onChange={(e)=>setReportReason(e.target.value)} placeholder="Reason for report (optional unless submitting a report)" className="mt-5 w-full min-h-28 bg-black/30 border border-white/10 rounded-xl p-3"/>
              <div className="flex gap-3 mt-4"><Button variant="outline" className="flex-1" disabled={!reportReason.trim()} onClick={report}><Flag className="w-4 h-4 mr-2"/>Report</Button><Button variant="destructive" className="flex-1" onClick={disconnect}><Unplug className="w-4 h-4 mr-2"/>Disconnect</Button></div>
              <Button variant="ghost" className="w-full mt-2" onClick={()=>setShowSafety(false)}>Close</Button>
            </motion.div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
}
