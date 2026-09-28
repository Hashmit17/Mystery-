"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Form = {
  displayName: string; age: number; bio: string; broadLocation: string; relationshipGoals: string; visibility: string;
  interests: string[]; personalityResponses: { question: string; answer: string }[];
  preferences: { minAge: number; maxAge: number; distance: number };
};

export default function SettingsPage() {
  const [form, setForm] = useState<Form | null>(null);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" }).then(async (r) => r.ok ? r.json() : null).then((p) => {
      if (!p) return;
      setForm({
        displayName: p.displayName, age: p.age, bio: p.bio ?? "", broadLocation: p.broadLocation ?? "",
        relationshipGoals: p.relationshipGoals ?? "Meaningful connection", visibility: p.visibility ?? "public",
        interests: (p.interests ?? []).map((x: {name:string}) => x.name), personalityResponses: p.personalityResponses ?? [],
        preferences: { minAge: p.preferences?.minAge ?? 18, maxAge: p.preferences?.maxAge ?? 99, distance: p.preferences?.discoveryDistance ?? 50 },
      });
    });
  }, []);

  const save = async () => {
    if (!form) return;
    setSaving(true); setMsg("");
    const r = await fetch("/api/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setMsg(r.ok ? "Settings saved." : await r.text());
    setSaving(false);
  };

  const changePassword = async () => {
    setPasswordMsg("");
    const r = await fetch("/api/account/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword, newPassword }) });
    if (r.ok) { setCurrentPassword(""); setNewPassword(""); setPasswordMsg("Password updated."); }
    else setPasswordMsg(await r.text());
  };

  const deleteAccount = async () => {
    if (!confirm("Permanently delete your MYSTERY account and all associated data? This cannot be undone.")) return;
    const r = await fetch("/api/account", { method: "DELETE" });
    if (r.ok) await signOut({ callbackUrl: "/" });
  };

  return (
    <DashboardShell>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold pt-4">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1 mb-8">Profile, discovery, privacy, and account controls.</p>
        {!form ? <div className="glass p-6 rounded-2xl text-muted-foreground">Complete onboarding before editing discovery settings.</div> : (
          <div className="space-y-6">
            <section className="glass p-6 rounded-2xl space-y-4">
              <h2 className="font-semibold">Profile</h2>
              <div><Label>Display name</Label><Input className="mt-2" value={form.displayName} onChange={e=>setForm({...form,displayName:e.target.value})}/></div>
              <div><Label>Bio</Label><textarea maxLength={500} className="mt-2 w-full min-h-28 bg-black/20 border border-white/10 rounded-lg p-3" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/></div>
              <div><Label>Broad location</Label><Input className="mt-2" value={form.broadLocation} onChange={e=>setForm({...form,broadLocation:e.target.value})}/></div>
              <div><Label>Relationship goal</Label><Input className="mt-2" value={form.relationshipGoals} onChange={e=>setForm({...form,relationshipGoals:e.target.value})}/></div>
            </section>

            <section className="glass p-6 rounded-2xl space-y-4">
              <h2 className="font-semibold">Discovery & privacy</h2>
              <div>
                <Label>Profile visibility</Label>
                <select className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-[#0c0f1d] px-3 text-sm" value={form.visibility} onChange={e=>setForm({...form,visibility:e.target.value})}>
                  <option value="public">Visible in Discover</option><option value="paused">Pause discovery</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Minimum age</Label><Input type="number" min={18} max={99} className="mt-2" value={form.preferences.minAge} onChange={e=>setForm({...form,preferences:{...form.preferences,minAge:Number(e.target.value)}})}/></div>
                <div><Label>Maximum age</Label><Input type="number" min={18} max={99} className="mt-2" value={form.preferences.maxAge} onChange={e=>setForm({...form,preferences:{...form.preferences,maxAge:Number(e.target.value)}})}/></div>
              </div>
              <div><Label>Discovery distance: {form.preferences.distance} miles</Label><input type="range" min="1" max="100" className="w-full mt-3 accent-primary" value={form.preferences.distance} onChange={e=>setForm({...form,preferences:{...form.preferences,distance:Number(e.target.value)}})}/></div>
              <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
              {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
            </section>

            <section className="glass p-6 rounded-2xl space-y-4">
              <h2 className="font-semibold">Security</h2>
              <div><Label>Current password</Label><Input type="password" className="mt-2" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)}/></div>
              <div><Label>New password</Label><Input type="password" minLength={8} className="mt-2" value={newPassword} onChange={e=>setNewPassword(e.target.value)}/></div>
              <Button variant="outline" disabled={!currentPassword || newPassword.length < 8} onClick={changePassword}>Change password</Button>
              {passwordMsg && <p className="text-sm text-muted-foreground">{passwordMsg}</p>}
            </section>

            <section className="glass p-6 rounded-2xl">
              <h2 className="font-semibold mb-2">Account</h2>
              <p className="text-sm text-muted-foreground mb-4">Sign out of this browser, or permanently delete your account.</p>
              <div className="flex flex-wrap gap-3"><Button variant="outline" onClick={()=>signOut({callbackUrl:"/"})}>Sign out</Button><Button variant="destructive" onClick={deleteAccount}>Delete account</Button></div>
            </section>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
