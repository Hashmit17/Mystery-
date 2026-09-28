"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarClock, Phone, XCircle } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Connection = { id: string; label: string };
type VoiceDate = { id: string; connectionId: string; scheduledAt: string; status: string; label: string };

export default function VoicePage() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dates, setDates] = useState<VoiceDate[]>([]);
  const [connectionId, setConnectionId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const minDate = useMemo(() => {
    const d = new Date(Date.now() + 10 * 60_000);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 16);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/voice-dates", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setConnections(data.connections ?? []);
      setDates(data.dates ?? []);
      setConnectionId((current) => current || data.connections?.[0]?.id || "");
    }
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const schedule = async () => {
    setMessage("");
    const res = await fetch("/api/voice-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ connectionId, scheduledAt }),
    });
    if (!res.ok) return setMessage(await res.text());
    setScheduledAt("");
    setMessage("Voice date scheduled.");
    void load();
  };

  const cancel = async (id: string) => {
    await fetch("/api/voice-dates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "cancel" }),
    });
    void load();
  };

  return (
    <DashboardShell>
      <div className="p-6 max-w-4xl mx-auto pt-10 space-y-6">
        <header>
          <h1 className="text-2xl font-bold flex items-center gap-3"><Phone className="w-6 h-6 text-primary"/>Voice Dates</h1>
          <p className="text-muted-foreground mt-2">Schedule a voice conversation with an accepted connection. MYSTERY never activates your microphone automatically.</p>
        </header>

        <section className="glass-elevated rounded-3xl p-6 md:p-8">
          <h2 className="font-semibold mb-5">Schedule a date</h2>
          {connections.length === 0 ? (
            <p className="text-sm text-muted-foreground">Accept a connection first, then you can schedule a voice date here.</p>
          ) : (
            <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
              <div>
                <Label>Connection</Label>
                <select value={connectionId} onChange={(e)=>setConnectionId(e.target.value)} className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-[#0c0f1d] px-3 text-sm">
                  {connections.map((c)=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <Label>Date and time</Label>
                <input type="datetime-local" min={minDate} value={scheduledAt} onChange={(e)=>setScheduledAt(e.target.value)} className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-[#0c0f1d] px-3 text-sm"/>
              </div>
              <Button onClick={schedule} disabled={!connectionId || !scheduledAt}>Schedule</Button>
            </div>
          )}
          {message && <p className="text-sm text-muted-foreground mt-4">{message}</p>}
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold">Upcoming & recent</h2>
          {loading ? <p className="text-muted-foreground">Loading…</p> : dates.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground"><CalendarClock className="w-8 h-8 mx-auto mb-3"/>No voice dates scheduled.</div>
          ) : dates.map((d)=>(
            <div key={d.id} className="glass rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{d.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{new Date(d.scheduledAt).toLocaleString()} · <span className="capitalize">{d.status}</span></p>
              </div>
              {d.status === "scheduled" && <Button variant="ghost" size="icon" onClick={()=>cancel(d.id)} aria-label="Cancel voice date"><XCircle className="w-5 h-5"/></Button>}
            </div>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
