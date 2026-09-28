import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const { connectionId, requestedFields = "profile" } = await req.json();

  const connection = await prisma.connection.findFirst({
    where: { id: connectionId, status: { in: ["accepted", "revealed"] }, OR: [{ requesterId: userId }, { recipientId: userId }] },
    include: { requester: { select: { id: true, email: true } }, recipient: { select: { id: true, email: true } } },
  });
  if (!connection) return new NextResponse("Connection not found", { status: 404 });

  const other = connection.requesterId === userId ? connection.recipient : connection.requester;
  if (other.email?.endsWith("@mystery.local")) {
    await prisma.$transaction(async (tx) => {
      const own = await tx.revealRequest.findFirst({ where: { connectionId, requesterId: userId } });
      if (!own) await tx.revealRequest.create({ data: { connectionId, requesterId: userId, requestedFields: String(requestedFields).slice(0, 120), status: "accepted" } });
      const demoRequest = await tx.revealRequest.findFirst({ where: { connectionId, requesterId: other.id } });
      if (!demoRequest) await tx.revealRequest.create({ data: { connectionId, requesterId: other.id, requestedFields: "displayName,profile", status: "accepted" } });
      await tx.revealRequest.updateMany({ where: { connectionId }, data: { status: "accepted" } });
      await tx.connection.update({ where: { id: connectionId }, data: { status: "revealed" } });
    });
    return NextResponse.json({ status: "revealed" });
  }

  const existingOwn = await prisma.revealRequest.findFirst({
    where: { connectionId, requesterId: userId, status: "pending" },
    orderBy: { createdAt: "desc" },
  });

  const pendingOther = await prisma.revealRequest.findFirst({
    where: { connectionId, requesterId: { not: userId }, status: "pending" },
    orderBy: { createdAt: "desc" },
  });
  if (pendingOther) {
    await prisma.$transaction([
      prisma.revealRequest.updateMany({ where: { connectionId, status: "pending" }, data: { status: "accepted" } }),
      prisma.connection.update({ where: { id: connectionId }, data: { status: "revealed" } }),
    ]);
    return NextResponse.json({ status: "revealed" });
  }

  if (existingOwn) return NextResponse.json(existingOwn);

  const request = await prisma.revealRequest.create({
    data: { connectionId, requesterId: userId, requestedFields: String(requestedFields).slice(0, 120) },
  });
  return NextResponse.json(request, { status: 201 });
}
