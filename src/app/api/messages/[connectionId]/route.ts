import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

async function getConnection(connectionId: string, userId: string) {
  return prisma.connection.findFirst({
    where: {
      id: connectionId,
      status: { in: ["accepted", "revealed"] },
      OR: [{ requesterId: userId }, { recipientId: userId }],
    },
    include: {
      requester: { include: { profile: true } },
      recipient: { include: { profile: true } },
      revealRequests: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
}

export async function GET(_req: Request, { params }: { params: Promise<{ connectionId: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const { connectionId } = await params;
  const connection = await getConnection(connectionId, userId);
  if (!connection) return new NextResponse("Connection not found", { status: 404 });

  const messages = await prisma.message.findMany({
    where: { connectionId },
    orderBy: { createdAt: "asc" },
    select: { id: true, senderId: true, content: true, createdAt: true },
  });
  const other = connection.requesterId === userId ? connection.recipient : connection.requester;
  return NextResponse.json({
    connection: {
      id: connection.id,
      status: connection.status,
      alias: connection.status === "revealed" ? (other.profile?.displayName ?? other.name ?? "Connection") : `Connection #${connection.id.slice(-4).toUpperCase()}`,
      revealStatus: connection.revealRequests[0]?.status ?? null,
      otherUserId: other.id,
    },
    currentUserId: userId,
    messages,
  });
}

export async function POST(req: Request, { params }: { params: Promise<{ connectionId: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const { connectionId } = await params;
  const connection = await getConnection(connectionId, userId);
  if (!connection) return new NextResponse("Connection not found", { status: 404 });

  const { content } = await req.json();
  const message = String(content ?? "").trim().slice(0, 2000);
  if (!message) return new NextResponse("Message is required", { status: 400 });

  const created = await prisma.message.create({ data: { connectionId, senderId: userId, content: message } });
  await prisma.connection.update({ where: { id: connectionId }, data: { updatedAt: new Date() } });
  return NextResponse.json(created, { status: 201 });
}
