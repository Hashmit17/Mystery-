import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const connections = await prisma.connection.findMany({
    where: { OR: [{ requesterId: userId }, { recipientId: userId }] },
    orderBy: { updatedAt: "desc" },
    include: {
      requester: { include: { profile: true } },
      recipient: { include: { profile: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      revealRequests: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  return NextResponse.json(connections.map((c) => {
    const other = c.requesterId === userId ? c.recipient : c.requester;
    const incoming = c.recipientId === userId && c.status === "pending";
    return {
      id: c.id,
      status: c.status,
      incoming,
      alias: c.status === "revealed" ? (other.profile?.displayName ?? other.name ?? "Connection") : `Connection #${c.id.slice(-4).toUpperCase()}`,
      lastMessage: c.messages[0]?.content ?? (incoming ? "Wants to connect with you." : "Connection request sent."),
      updatedAt: c.updatedAt,
      revealStatus: c.revealRequests[0]?.status ?? null,
    };
  }));
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { recipientId } = await req.json();
  if (!recipientId || recipientId === userId) return new NextResponse("Invalid recipient", { status: 400 });

  const target = await prisma.user.findUnique({ where: { id: recipientId }, select: { id: true, email: true } });
  if (!target) return new NextResponse("Profile not found", { status: 404 });
  const isDemo = target.email?.endsWith("@mystery.local") ?? false;

  const reverse = await prisma.connection.findFirst({
    where: { requesterId: recipientId, recipientId: userId },
  });
  if (reverse) {
    const updated = await prisma.connection.update({
      where: { id: reverse.id },
      data: { status: "accepted" },
    });
    return NextResponse.json(updated);
  }

  const connection = await prisma.connection.upsert({
    where: { requesterId_recipientId: { requesterId: userId, recipientId } },
    update: { status: isDemo ? "accepted" : "pending" },
    create: { requesterId: userId, recipientId, status: isDemo ? "accepted" : "pending" },
  });

  if (isDemo) {
    const count = await prisma.message.count({ where: { connectionId: connection.id } });
    if (count === 0) {
      await prisma.message.create({
        data: {
          connectionId: connection.id,
          senderId: recipientId,
          content: "Hey — glad we connected. What is something you have been genuinely excited about lately?",
        },
      });
    }
  }

  return NextResponse.json(connection, { status: 201 });
}
