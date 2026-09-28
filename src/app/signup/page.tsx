"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        
        if (result?.error) {
          setError(result.error);
        } else {
          router.push("/onboarding");
        }
      } else {
        const message = await res.text();
        setError(message || "Something went wrong");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="glass-elevated border-white/10 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <Link href="/">
              <span className="text-2xl font-bold tracking-[0.2em] text-white mx-auto block mb-4">MYSTERY</span>
            </Link>
            <CardTitle className="text-2xl font-semibold text-white">Create an account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Begin your journey to genuine connections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="How should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-primary"
                  required
                />
              </div>
              
              {error && <p className="text-sm text-destructive text-center font-medium">{error}</p>}
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading}>
                {loading ? "Creating account..." : "Join MYSTERY"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </div>
            <p className="text-xs text-muted-foreground text-center px-4">
              By joining, you agree to our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. You must be at least 18 years old.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
