"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
type C={id:string;incoming:boolean;alias:string;status:string;lastMessage:string};
export default function NotificationsPage(){const[x,setX]=useState<C[]>([]);useEffect(()=>{fetch('/api/connections',{cache:'no-store'}).then(r=>r.ok?r.json():[]).then((d:C[])=>setX(d.filter(c=>c.incoming||c.status==='accepted')))},[]);return <DashboardShell><div className="p-6 max-w-3xl mx-auto pt-10"><h1 className="text-2xl font-bold mb-6">Notifications</h1>{x.length===0?<div className="glass p-10 rounded-2xl text-center"><Bell className="w-8 h-8 mx-auto text-muted-foreground mb-3"/><p className="text-muted-foreground">Nothing new right now.</p></div>:<div className="space-y-3">{x.map(c=><Link key={c.id} href="/connections" className="block glass p-4 rounded-xl"><p className="font-medium">{c.incoming?'New connection request':`${c.alias} is ready to chat`}</p><p className="text-sm text-muted-foreground mt-1">{c.lastMessage}</p></Link>)}</div>}</div></DashboardShell>}
