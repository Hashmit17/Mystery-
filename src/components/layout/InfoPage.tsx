import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function InfoPage({ title, intro, sections }: { title: string; intro: string; sections: { title: string; body: string }[] }) {
  return <div className="min-h-screen bg-background"><header className="glass border-b border-white/5 p-4 sticky top-0"><div className="max-w-4xl mx-auto"><Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"><ArrowLeft className="w-4 h-4"/>Back to MYSTERY</Link></div></header><main className="max-w-4xl mx-auto p-6 py-12"><h1 className="text-4xl font-bold">{title}</h1><p className="text-muted-foreground mt-4 max-w-2xl">{intro}</p><div className="space-y-6 mt-10">{sections.map(s=><section key={s.title} className="glass p-6 rounded-2xl"><h2 className="text-xl font-semibold">{s.title}</h2><p className="text-muted-foreground mt-3 leading-relaxed">{s.body}</p></section>)}</div><p className="text-xs text-muted-foreground mt-10">Prototype notice: this page is product copy for the project and is not a substitute for legal review before a public launch.</p></main></div>;
}
