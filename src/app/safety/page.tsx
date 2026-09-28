"use client";

import Link from "next/link";
import { ShieldAlert, AlertTriangle, UserX, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SafetyCenterPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-white/5 p-4 sticky top-0 z-20">
        <div className="container mx-auto flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Safety Center</h1>
        </div>
      </header>

      <main className="container mx-auto p-6 max-w-4xl py-12">
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Safety Comes First</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            MYSTERY is designed to foster genuine connections in a secure environment. We've built tools to give you full control over your experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="glass-elevated p-6 rounded-2xl border border-white/5">
            <UserX className="w-8 h-8 text-destructive mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Block & Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If someone makes you uncomfortable, you can instantly end the connection, block them from seeing your profile, and report suspicious behavior.
            </p>
            <Link href="/guidelines"><Button variant="outline" className="text-white border-white/10 hover:bg-white/5">Community Guidelines</Button></Link>
          </div>
          
          <div className="glass-elevated p-6 rounded-2xl border border-white/5">
            <Lock className="w-8 h-8 text-secondary mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Privacy Controls</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your photos and identity are never revealed without mutual consent. Your exact location is never shared with anyone.
            </p>
            <Link href="/settings"><Button variant="outline" className="text-white border-white/10 hover:bg-white/5">Manage Privacy</Button></Link>
          </div>
        </div>

        <div className="glass p-8 rounded-2xl border border-primary/20 bg-primary/5">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-accent shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Tips for Meeting Offline</h3>
              <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-4">
                <li>Always meet in a busy, public place for the first few dates.</li>
                <li>Tell a friend or family member where you are going and who you are meeting.</li>
                <li>Arrange your own transportation to and from the date.</li>
                <li>Never share sensitive financial or personal information.</li>
                <li>Trust your instincts. If you feel uncomfortable, leave.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
