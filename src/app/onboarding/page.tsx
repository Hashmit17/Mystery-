"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";
import { GENDER_OPTIONS, normalizeInterestedGenders } from "@/lib/matching";

const INTEREST_OPTIONS = [
  "Music", "Movies", "Travel", "Technology", "Books",
  "Fitness", "Food", "Art", "Gaming", "Sports",
  "Photography", "Entrepreneurship"
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    displayName: "",
    age: "",
    gender: "",
    broadLocation: "",
    bio: "",
    relationshipGoals: "Meaningful connection",
    personalityResponses: [
      { question: "What's your perfect weekend?", answer: "" },
      { question: "What topic could you discuss for hours?", answer: "" }
    ],
    interests: [] as string[],
    preferences: {
      minAge: 18,
      maxAge: 99,
      distance: 50,
      interestedGenders: [] as string[],
    }
  });

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then(async (r) => r.ok ? r.json() : null)
      .then((p) => {
        if (!p) return;
        setFormData({
          displayName: p.displayName ?? "",
          age: String(p.age ?? ""),
          gender: p.gender ?? "",
          broadLocation: p.broadLocation ?? "",
          bio: p.bio ?? "",
          relationshipGoals: p.relationshipGoals ?? "Meaningful connection",
          personalityResponses: p.personalityResponses?.length
            ? p.personalityResponses.slice(0, 2).map((x: { question: string; answer: string }) => ({ question: x.question, answer: x.answer }))
            : [
                { question: "What's your perfect weekend?", answer: "" },
                { question: "What topic could you discuss for hours?", answer: "" }
              ],
          interests: (p.interests ?? []).map((x: { name: string }) => x.name),
          preferences: {
            minAge: p.preferences?.minAge ?? 18,
            maxAge: p.preferences?.maxAge ?? 99,
            distance: p.preferences?.discoveryDistance ?? 50,
            interestedGenders: normalizeInterestedGenders(p.preferences?.interestedGenders),
          },
        });
      })
      .catch(() => undefined);
  }, []);

  const nextStep = () => {
    setError("");

    if (step === 1 && (!formData.displayName.trim() || Number(formData.age) < 18 || !formData.gender)) {
      setError("Add a display name, age of 18 or older, and your gender.");
      return;
    }
    if (step === 2 && formData.personalityResponses.some((r) => !r.answer.trim())) {
      setError("Answer both personality prompts to continue.");
      return;
    }
    if (step === 3 && formData.interests.length < 2) {
      setError("Choose at least two interests.");
      return;
    }
    if (step === 4 && formData.preferences.interestedGenders.length === 0) {
      setError("Choose at least one gender you'd like to date.");
      return;
    }

    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleInterestedGender = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        interestedGenders: prev.preferences.interestedGenders.includes(gender)
          ? prev.preferences.interestedGenders.filter((item) => item !== gender)
          : [...prev.preferences.interestedGenders, gender],
      },
    }));
  };

  const submitProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push("/discover");
      } else {
        setError(await res.text());
      }
    } catch {
      setError("Unable to save your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGate>
      <div className="min-h-screen bg-background flex flex-col pt-20 px-4">
        <div className="max-w-2xl w-full mx-auto mb-8">
          <Progress value={(step / totalSteps) * 100} className="h-2 bg-white/10" />
        </div>

        <div className="flex-1 flex flex-col items-center max-w-2xl w-full mx-auto relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-6">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-bold text-white mb-4">Let's discover what makes you, you.</h1>
                  <p className="text-muted-foreground">The basics used to build your matches.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Display Name / Alias</Label>
                    <Input
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      className="bg-black/20 border-white/10 text-white h-12"
                      placeholder="How should people call you?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Age</Label>
                    <Input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="bg-black/20 border-white/10 text-white h-12"
                      placeholder="Must be 18+"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-300">Your gender</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {GENDER_OPTIONS.map((option) => {
                        const selected = formData.gender === option.value;
                        return (
                          <button
                            type="button"
                            key={option.value}
                            onClick={() => setFormData({ ...formData, gender: option.value })}
                            className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                              selected
                                ? "border-primary bg-primary/20 text-white"
                                : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground">Used for matching and discovery filtering.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Broad Location</Label>
                    <Input
                      value={formData.broadLocation}
                      onChange={(e) => setFormData({ ...formData, broadLocation: e.target.value })}
                      className="bg-black/20 border-white/10 text-white h-12"
                      placeholder="e.g., Central Bengaluru"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Short Bio</Label>
                    <textarea
                      value={formData.bio}
                      maxLength={500}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 text-white rounded-md p-4 min-h-[96px] focus:outline-none focus:border-primary"
                      placeholder="A few lines about what makes you, you…"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-6">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-bold text-white mb-4">Personality Discovery</h1>
                  <p className="text-muted-foreground">Your answers help us find meaningful connections.</p>
                </div>

                <div className="space-y-6">
                  {formData.personalityResponses.map((pr, idx) => (
                    <div key={idx} className="space-y-2">
                      <Label className="text-gray-300">{pr.question}</Label>
                      <textarea
                        value={pr.answer}
                        onChange={(e) => {
                          const newResponses = [...formData.personalityResponses];
                          newResponses[idx].answer = e.target.value;
                          setFormData({ ...formData, personalityResponses: newResponses });
                        }}
                        className="w-full bg-black/20 border border-white/10 text-white rounded-md p-4 min-h-[100px] focus:outline-none focus:border-primary"
                        placeholder="Type your answer here..."
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-6">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-bold text-white mb-4">Your Interests</h1>
                  <p className="text-muted-foreground">Select the topics you enjoy.</p>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  {INTEREST_OPTIONS.map((interest) => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-primary text-white border-primary"
                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-6">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-bold text-white mb-4">Dating Preferences</h1>
                  <p className="text-muted-foreground">Choose who you'd actually like to meet.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-gray-300">I'm interested in dating</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {GENDER_OPTIONS.map((option) => {
                        const selected = formData.preferences.interestedGenders.includes(option.value);
                        return (
                          <button
                            type="button"
                            key={option.value}
                            onClick={() => toggleInterestedGender(option.value)}
                            className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                              selected
                                ? "border-primary bg-primary/20 text-white"
                                : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                            }`}
                          >
                            {selected ? "✓ " : ""}{option.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground">Choose one or multiple. Discovery only shows mutually compatible profiles.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Relationship Goals</Label>
                    <select
                      value={formData.relationshipGoals}
                      onChange={(e) => setFormData({ ...formData, relationshipGoals: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 text-white rounded-md p-3 h-12 focus:outline-none focus:border-primary"
                    >
                      <option value="Meaningful connection">Meaningful connection</option>
                      <option value="Long-term relationship">Long-term relationship</option>
                      <option value="Casual dating">Casual dating</option>
                      <option value="New friends">New friends</option>
                      <option value="Still figuring it out">Still figuring it out</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <div className="space-y-2 flex-1">
                      <Label className="text-gray-300">Min Age</Label>
                      <Input
                        type="number"
                        value={formData.preferences.minAge}
                        onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, minAge: parseInt(e.target.value) } })}
                        className="bg-black/20 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label className="text-gray-300">Max Age</Label>
                      <Input
                        type="number"
                        value={formData.preferences.maxAge}
                        onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, maxAge: parseInt(e.target.value) } })}
                        className="bg-black/20 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Max Distance (miles): {formData.preferences.distance}</Label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={formData.preferences.distance}
                      onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, distance: parseInt(e.target.value) } })}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-6 text-center">
                <div className="mb-10">
                  <h1 className="text-4xl font-bold text-white mb-4">Your Signal is Ready</h1>
                  <p className="text-muted-foreground">Your matching filters are ready.</p>
                </div>
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-primary" />
                </div>
                <Button size="lg" onClick={submitProfile} disabled={loading} className="bg-primary text-white hover:bg-primary/90 h-14 px-12 rounded-full text-lg">
                  {loading ? "Saving..." : "Enter Discovery"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <p className="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

          <div className="fixed bottom-10 w-full max-w-2xl px-4 flex justify-between">
            {step > 1 && step < 5 ? (
              <Button variant="ghost" onClick={prevStep} className="text-gray-400 hover:text-white hover:bg-white/10">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : <div />}

            {step < 5 && (
              <Button onClick={nextStep} className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </AuthGate>
  );
}
