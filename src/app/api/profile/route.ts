import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

function normalizeAge(value: unknown, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(18, Math.min(99, Math.round(n))) : fallback;
}

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { interests: true, personalityResponses: true, preferences: true },
  });

  return NextResponse.json(profile);
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const body = await req.json();
    const displayName = String(body.displayName ?? "").trim();
    const age = normalizeAge(body.age, 18);
    const broadLocation = String(body.broadLocation ?? "").trim();
    const relationshipGoals = String(body.relationshipGoals ?? "Meaningful connection").trim().slice(0, 80);
    const visibility = ["public", "paused"].includes(String(body.visibility)) ? String(body.visibility) : "public";
    const bio = String(body.bio ?? "").trim().slice(0, 500);
    const interests: string[] = Array.isArray(body.interests)
      ? Array.from(
          new Set<string>(
            body.interests
              .map((x: unknown): string => String(x).trim())
              .filter((x: string) => x.length > 0)
          )
        ).slice(0, 12)
      : [];
    const responses = Array.isArray(body.personalityResponses)
      ? body.personalityResponses
          .map((item: { question?: unknown; answer?: unknown }) => ({
            question: String(item.question ?? "").trim(),
            answer: String(item.answer ?? "").trim(),
          }))
          .filter((item: { question: string; answer: string }) => item.question && item.answer)
          .slice(0, 8)
      : [];
    const prefs = body.preferences ?? {};
    const minAge = normalizeAge(prefs.minAge, 18);
    const maxAge = Math.max(minAge, normalizeAge(prefs.maxAge, 99));
    const distance = Math.max(1, Math.min(100, Number(prefs.distance ?? prefs.discoveryDistance ?? 50) || 50));

    if (!displayName) return new NextResponse("Display name is required", { status: 400 });

    const profile = await prisma.$transaction(async (tx) => {
      const saved = await tx.profile.upsert({
        where: { userId },
        update: {
          displayName,
          age,
          bio: bio || null,
          broadLocation: broadLocation || null,
          relationshipGoals,
          visibility,
          profileCompletion: 100,
          interests: {
            set: [],
            connectOrCreate: interests.map((name: string) => ({ where: { name }, create: { name } })),
          },
        },
        create: {
          userId,
          displayName,
          age,
          bio: bio || null,
          broadLocation: broadLocation || null,
          relationshipGoals,
          visibility,
          profileCompletion: 100,
          interests: {
            connectOrCreate: interests.map((name: string) => ({ where: { name }, create: { name } })),
          },
        },
      });

      await tx.personalityResponse.deleteMany({ where: { profileId: saved.id } });
      if (responses.length) {
        await tx.personalityResponse.createMany({
          data: responses.map((item: { question: string; answer: string }) => ({ ...item, profileId: saved.id })),
        });
      }

      await tx.preference.upsert({
        where: { profileId: saved.id },
        update: { minAge, maxAge, discoveryDistance: distance },
        create: { profileId: saved.id, minAge, maxAge, discoveryDistance: distance },
      });

      return tx.profile.findUnique({
        where: { id: saved.id },
        include: { interests: true, personalityResponses: true, preferences: true },
      });
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("[PROFILE_SAVE]", error);
    return new NextResponse("Unable to save profile", { status: 500 });
  }
}
