"use server";

import { db } from "../lib/prisma";
import { createAuthCookie } from "./auth-cookie";

let roomSecret: string;

const verifyPassword = async (roomId: string, password: string) => {
  try {
    const room = await db.chat.findUnique({
      where: {
        id: roomId,
      },
    });
    // roomSecret = room.secret;
    if (!room) return false;

    const now = new Date();
    if (room?.createdAt < new Date(now.getTime() - room.ttl)) {
      console.log("expired room");
      // TODO delete room from database and remove the room's saved messages
    }

    return room.password === password;
  } catch (e) {
    return false;
  }
};

export async function joinRoom(
  roomId: string,
  password: string,
  user = "Anonymous user"
) {
  const isValid = await verifyPassword(roomId, password);

  if (!isValid) {
    return { error: "Invalid room or password." };
  }

  createAuthCookie(roomId, user);

  return { success: "Authentification completed, redirecting to room." };
}
