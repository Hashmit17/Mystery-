import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const own = await prisma.profile.findUnique({
    where: { userId },
    include: { interests: true, preferences: true },
  });
  if (!own) return NextResponse.json({ needsOnboarding: true, profiles: [] });

  const existing = await prisma.connection.findMany({
    where: { OR: [{ requesterId: userId }, { recipientId: userId }] },
    select: { requesterId: true, recipientId: true },
  });
  const excluded = new Set([userId]);
  existing.forEach((c) => { excluded.add(c.requesterId); excluded.add(c.recipientId); });

  const minAge = own.preferences?.minAge ?? 18;
  const maxAge = own.preferences?.maxAge ?? 99;
  const candidates = await prisma.profile.findMany({
    where: {
      userId: { notIn: [...excluded] },
      visibility: "public",
      age: { gte: minAge, lte: maxAge },
    },
    include: { interests: true, personalityResponses: true },
    take: 25,
  });

  const ownInterests = new Set(own.interests.map((i) => i.name));
  const profiles = candidates.map((p) => {
    const shared = p.interests.map((i) => i.name).filter((name) => ownInterests.has(name));
    return {
      userId: p.userId,
      alias: "Anonymous",
      age: p.age,
      broadLocation: p.broadLocation,
      bio: p.bio,
      interests: p.interests.map((i) => i.name),
      sharedInterests: shared,
      relationshipGoals: p.relationshipGoals,
      prompt: p.personalityResponses[0]?.question ?? "What are you looking forward to this week?",
      promptAnswer: p.personalityResponses[0]?.answer ?? null,
      compatibility: shared.length
        ? `You share ${shared.slice(0, 3).join(", ")}.`
        : "A fresh perspective outside your usual circle.",
    };
  });

  profiles.sort((a, b) => b.sharedInterests.length - a.sharedInterests.length);
  return NextResponse.json({ needsOnboarding: false, profiles });
}
