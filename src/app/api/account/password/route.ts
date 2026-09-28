import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  const current = String(currentPassword ?? "");
  const next = String(newPassword ?? "");
  if (next.length < 8) return new NextResponse("New password must be at least 8 characters", { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { passwordHash: true } });
  if (!user?.passwordHash || !(await bcrypt.compare(current, user.passwordHash))) {
    return new NextResponse("Current password is incorrect", { status: 400 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await bcrypt.hash(next, 12) },
  });
  return new NextResponse(null, { status: 204 });
}
