"use server";

import bcrypt from "bcryptjs";

import { db } from "../lib/prisma";
import { createAuthCookie } from "./auth-cookie";
import { deleteRoom } from "./delete-room";

let roomSecret: string;

const verifyPassword = async (roomId: string, password: string) => {
  try {
    const room = await db.chat.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) return false;

    const now = new Date();
    if (room?.createdAt < new Date(now.getTime() - room.ttl * 1000)) {
      console.log("expired room");
      deleteRoom(roomId);
    }
    const passwordMatch = await bcrypt.compare(password, room.password);
    return passwordMatch;
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
