"use server";

import { db } from "../lib/prisma";
import { deleteAuthCookie } from "./auth-cookie";
import { deleteRoom } from "./delete-room";

export const checkRoom = async (roomId: string) => {
  try {
    const room = await db.chat.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      deleteAuthCookie(roomId);
      return false;
    }

    const now = new Date();
    if (room?.createdAt < new Date(now.getTime() - room.ttl * 1000)) {
      deleteRoom(roomId);
      deleteAuthCookie(roomId);
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};
