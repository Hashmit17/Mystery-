import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

function otherPerson(connection: any, userId: string) {
  return connection.requesterId === userId ? connection.recipient : connection.requester;
}

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const [connections, dates] = await Promise.all([
    prisma.connection.findMany({
      where: {
        status: { in: ["accepted", "revealed"] },
        OR: [{ requesterId: userId }, { recipientId: userId }],
      },
      include: {
        requester: { include: { profile: true } },
        recipient: { include: { profile: true } },
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.voiceDate.findMany({
      where: {
        connection: { OR: [{ requesterId: userId }, { recipientId: userId }] },
      },
      include: {
        connection: {
          include: {
            requester: { include: { profile: true } },
            recipient: { include: { profile: true } },
          },
        },
      },
      orderBy: { scheduledAt: "asc" },
    }),
  ]);

  return NextResponse.json({
    connections: connections.map((c) => {
      const other = otherPerson(c, userId);
      return {
        id: c.id,
        label: c.status === "revealed"
          ? (other.profile?.displayName ?? other.name ?? "Connection")
          : `Connection #${c.id.slice(-4).toUpperCase()}`,
      };
    }),
    dates: dates.map((d) => {
      const other = otherPerson(d.connection, userId);
      return {
        id: d.id,
        connectionId: d.connectionId,
        scheduledAt: d.scheduledAt,
        status: d.status,
        label: d.connection.status === "revealed"
          ? (other.profile?.displayName ?? other.name ?? "Connection")
          : `Connection #${d.connection.id.slice(-4).toUpperCase()}`,
      };
    }),
  });
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const connectionId = String(body.connectionId ?? "");
  const scheduledAt = new Date(String(body.scheduledAt ?? ""));
  if (!connectionId || Number.isNaN(scheduledAt.getTime())) {
    return new NextResponse("Choose a connection and valid date", { status: 400 });
  }
  if (scheduledAt.getTime() < Date.now() + 5 * 60_000) {
    return new NextResponse("Schedule the voice date at least 5 minutes in the future", { status: 400 });
  }

  const connection = await prisma.connection.findFirst({
    where: {
      id: connectionId,
      status: { in: ["accepted", "revealed"] },
      OR: [{ requesterId: userId }, { recipientId: userId }],
    },
  });
  if (!connection) return new NextResponse("Connection not found", { status: 404 });

  const date = await prisma.voiceDate.create({ data: { connectionId, scheduledAt } });
  return NextResponse.json(date, { status: 201 });
}

export async function PATCH(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const body = await req.json();
  const id = String(body.id ?? "");
  const action = String(body.action ?? "");
  if (!id || !["cancel", "complete"].includes(action)) return new NextResponse("Invalid action", { status: 400 });

  const date = await prisma.voiceDate.findFirst({
    where: { id, connection: { OR: [{ requesterId: userId }, { recipientId: userId }] } },
  });
  if (!date) return new NextResponse("Voice date not found", { status: 404 });

  const updated = await prisma.voiceDate.update({
    where: { id },
    data: { status: action === "cancel" ? "cancelled" : "completed" },
  });
  return NextResponse.json(updated);
}
