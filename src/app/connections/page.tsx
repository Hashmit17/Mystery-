"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

type Connection = { id:string; status:string; incoming:boolean; alias:string; lastMessage:string; updatedAt:string; revealStatus?:string|null };

export default function ConnectionsPage() {
  const [items,setItems]=useState<Connection[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
  const load=useCallback(async()=>{setLoading(true);try{const r=await fetch('/api/connections',{cache:'no-store'});if(!r.ok)throw new Error();setItems(await r.json())}catch{setError('Unable to load connections.')}finally{setLoading(false)}},[]);
  useEffect(()=>{void load()},[load]);
  const act=async(id:string,action:string)=>{const r=await fetch(`/api/connections/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action})});if(r.ok)void load();};
  return <DashboardShell><div className="p-6 max-w-4xl mx-auto"><header className="mb-8 pt-4"><h1 className="text-2xl font-bold">Connections</h1><p className="text-sm text-muted-foreground mt-1">Requests and conversations, without forcing an identity reveal.</p></header>
    {error&&<p className="text-red-300 mb-4">{error}</p>}{loading?<p className="text-muted-foreground">Loading connections…</p>:items.length===0?<div className="glass rounded-2xl p-10 text-center"><MessageSquare className="w-10 h-10 mx-auto text-muted-foreground mb-4"/><h2 className="text-xl font-semibold">No connections yet</h2><p className="text-muted-foreground mt-2 mb-5">Discover someone interesting and send the first request.</p><Link href="/discover"><Button>Go to Discover</Button></Link></div>:<div className="space-y-4">{items.map((c,i)=><motion.div key={c.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.04}} className="glass p-5 rounded-2xl border border-white/5 flex gap-4 items-center justify-between"><Link href={c.status==='accepted'||c.status==='revealed'?`/messages/${c.id}`:'#'} className="flex items-center gap-4 min-w-0 flex-1"><div className="w-12 h-12 rounded-full bg-primary/20 grid place-items-center"><MessageSquare className="w-5 h-5 text-primary"/></div><div className="min-w-0"><h3 className="font-medium text-white">{c.alias}</h3><p className="text-xs text-primary capitalize">{c.status}{c.revealStatus?` • reveal ${c.revealStatus}`:''}</p><p className="text-sm text-muted-foreground truncate mt-1">{c.lastMessage}</p></div></Link>{c.incoming&&<div className="flex gap-2"><Button size="icon" onClick={()=>act(c.id,'accept')} aria-label="Accept"><Check className="w-4 h-4"/></Button><Button size="icon" variant="outline" onClick={()=>act(c.id,'decline')} aria-label="Decline"><X className="w-4 h-4"/></Button></div>}</motion.div>)}</div>}
  </div></DashboardShell>
}
