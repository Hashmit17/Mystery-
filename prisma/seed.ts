import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const demos = [
  { email: "demo.ava@mystery.local", name: "Ava", age: 24, location: "Central Bengaluru", goal: "Meaningful connection", bio: "Curious about design, new food, and conversations that run longer than expected.", interests: ["Art", "Food", "Travel", "Photography"], q: "What's your perfect weekend?", a: "A slow breakfast, a gallery, and an unplanned evening walk." },
  { email: "demo.noah@mystery.local", name: "Noah", age: 26, location: "South Bengaluru", goal: "Long-term relationship", bio: "Engineer by day, amateur musician after hours. I value kindness, curiosity, and showing up.", interests: ["Technology", "Music", "Books", "Fitness"], q: "What topic could you discuss for hours?", a: "How technology changes the way people create and connect." },
  { email: "demo.mira@mystery.local", name: "Mira", age: 23, location: "East Bengaluru", goal: "Meaningful connection", bio: "I collect tiny stories from ordinary days and probably know a café for every mood.", interests: ["Books", "Photography", "Food", "Movies"], q: "What's your perfect weekend?", a: "Coffee, a bookstore, cooking with friends, then a comfort movie." },
  { email: "demo.arjun@mystery.local", name: "Arjun", age: 27, location: "North Bengaluru", goal: "Long-term relationship", bio: "Weekend cyclist, product nerd, and enthusiastic home cook looking for something grounded.", interests: ["Fitness", "Technology", "Food", "Entrepreneurship"], q: "What topic could you discuss for hours?", a: "Why some products feel intuitive while others never quite click." },
  { email: "demo.zoe@mystery.local", name: "Zoe", age: 25, location: "Central Bengaluru", goal: "Meaningful connection", bio: "Travel plans, live music, and making ordinary Tuesdays slightly more interesting.", interests: ["Travel", "Music", "Movies", "Sports"], q: "What's your perfect weekend?", a: "A short trip somewhere green, good music, and no alarm clock." },
];

async function main() {
  for (const d of demos) {
    const user = await prisma.user.upsert({
      where: { email: d.email },
      update: { name: d.name },
      create: { email: d.email, name: d.name },
    });

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        displayName: d.name, age: d.age, broadLocation: d.location,
        relationshipGoals: d.goal, bio: d.bio, visibility: "public", profileCompletion: 100,
        interests: { set: [], connectOrCreate: d.interests.map((name) => ({ where: { name }, create: { name } })) },
      },
      create: {
        userId: user.id, displayName: d.name, age: d.age, broadLocation: d.location,
        relationshipGoals: d.goal, bio: d.bio, visibility: "public", profileCompletion: 100,
        interests: { connectOrCreate: d.interests.map((name) => ({ where: { name }, create: { name } })) },
      },
    });

    await prisma.personalityResponse.deleteMany({ where: { profileId: profile.id } });
    await prisma.personalityResponse.create({ data: { profileId: profile.id, question: d.q, answer: d.a } });
    await prisma.preference.upsert({
      where: { profileId: profile.id },
      update: { minAge: 18, maxAge: 40, discoveryDistance: 50 },
      create: { profileId: profile.id, minAge: 18, maxAge: 40, discoveryDistance: 50 },
    });
  }
  console.log(`Seeded ${demos.length} discovery profiles.`);
}

main().finally(async () => prisma.$disconnect());
