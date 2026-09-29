"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, Settings as SettingsIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { genderLabel } from "@/lib/matching";

type Profile = {
  displayName: string;
  age: number;
  gender?: string | null;
  bio?: string | null;
  broadLocation?: string | null;
  relationshipGoals?: string | null;
  visibility: string;
  profileCompletion: number;
  interests: { name: string }[];
  personalityResponses: { question: string; answer: string }[];
};

export default function ProfilePage() {
  const [p, setP] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : null)
      .then(setP)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardShell>
      <div className="p-6 max-w-3xl mx-auto">
        <header className="mb-8 pt-4 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-sm text-muted-foreground">Manage the information used for matching.</p>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="icon"><SettingsIcon className="w-5 h-5" /></Button>
          </Link>
        </header>

        {loading ? (
          <p className="text-muted-foreground">Loading profile…</p>
        ) : !p ? (
          <div className="glass rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold">Finish your profile</h2>
            <p className="text-muted-foreground mt-2 mb-5">Complete onboarding to start appearing in discovery.</p>
            <Link href="/onboarding"><Button>Start onboarding</Button></Link>
          </div>
        ) : (
          <>
            <div className="glass-elevated rounded-[2rem] p-8 border border-white/5 mb-8">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/40 grid place-items-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{p.displayName}</h2>
                  <p className="text-muted-foreground">
                    {p.age} • {genderLabel(p.gender)}{p.broadLocation ? ` • ${p.broadLocation}` : ""}
                  </p>
                  <p className="text-sm text-primary mt-1">{p.relationshipGoals}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.interests.map((i) => (
                      <span key={i.name} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">{i.name}</span>
                    ))}
                  </div>
                </div>
              </div>
              {p.bio && <p className="mt-6 text-gray-300 leading-relaxed">{p.bio}</p>}
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />Conversation-first profile
              </h3>
              <p className="text-sm text-muted-foreground mt-2">Your account email remains private. Gender and preferences are used to determine compatible discovery results.</p>
              {p.personalityResponses.length > 0 && (
                <div className="mt-5 space-y-4">
                  {p.personalityResponses.map((q, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4">
                      <p className="text-xs text-primary">{q.question}</p>
                      <p className="text-sm mt-2">{q.answer}</p>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/onboarding"><Button variant="outline" className="mt-6">Edit profile</Button></Link>
            </div>
          </>
        )}
      </div>
    </DashboardShell>
  );
}
