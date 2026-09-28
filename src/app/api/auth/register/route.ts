import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || name.length > 80 || !emailOk || password.length < 8 || password.length > 128) {
      return new NextResponse("Use a valid name, email, and password between 8 and 128 characters", { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return new NextResponse("An account with this email already exists", { status: 409 });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("[REGISTER]", error);
    return new NextResponse("Unable to create account", { status: 500 });
  }
}
