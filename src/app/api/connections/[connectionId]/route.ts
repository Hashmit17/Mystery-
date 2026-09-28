import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/session";

export async function PATCH(req: Request, { params }: { params: Promise<{ connectionId: string }> }) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  const { connectionId } = await params;
  const { action } = await req.json();

  const connection = await prisma.connection.findUnique({ where: { id: connectionId } });
  if (!connection || (connection.requesterId !== userId && connection.recipientId !== userId)) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (action === "accept" && connection.recipientId === userId) {
    return NextResponse.json(await prisma.connection.update({ where: { id: connectionId }, data: { status: "accepted" } }));
  }
  if (action === "decline" || action === "disconnect") {
    await prisma.connection.delete({ where: { id: connectionId } });
    return new NextResponse(null, { status: 204 });
  }
  return new NextResponse("Invalid action", { status: 400 });
}
