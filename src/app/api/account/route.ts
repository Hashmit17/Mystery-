import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

export async function DELETE() {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  await prisma.user.delete({ where: { id: userId } });
  return new NextResponse(null, { status: 204 });
}
