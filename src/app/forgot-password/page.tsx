"use client";

import Link from "next/link";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="glass-elevated p-8 rounded-3xl w-full max-w-md text-center">
        <KeyRound className="w-9 h-9 text-primary mx-auto mb-4"/>
        <h1 className="text-2xl font-bold">Password recovery</h1>
        <p className="text-muted-foreground text-sm mt-3">This local build intentionally does not pretend to send reset emails. Email recovery needs a real mail provider and verified delivery domain.</p>
        <p className="text-muted-foreground text-sm mt-3">If you can still sign in, you can change your password securely from Settings.</p>
        <div className="grid gap-2 mt-6"><Link href="/login"><Button className="w-full">Back to sign in</Button></Link><Link href="/signup" className="text-sm text-muted-foreground hover:text-white py-2">Create a new account</Link></div>
      </div>
    </div>
  );
}
