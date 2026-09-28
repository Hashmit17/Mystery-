import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

export async function POST(req: Request) {
  const reporterId = await getCurrentUserId();
  if (!reporterId) return new NextResponse("Unauthorized", { status: 401 });
  const { reportedUserId, reason } = await req.json();
  const cleanReason = String(reason ?? "").trim().slice(0, 1000);
  if (!reportedUserId || !cleanReason || reportedUserId === reporterId) return new NextResponse("Invalid report", { status: 400 });
  const target = await prisma.user.findUnique({ where: { id: String(reportedUserId) }, select: { id: true } });
  if (!target) return new NextResponse("User not found", { status: 404 });
  const report = await prisma.report.create({ data: { reporterId, reportedUserId: target.id, reason: cleanReason } });
  return NextResponse.json(report, { status: 201 });
}
