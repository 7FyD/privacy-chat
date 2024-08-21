"use server";

import { Chat } from "@prisma/client";
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
      return { error: "Invalid room. Redirecting." };
    }

    const now = new Date();
    if (room.createdAt < new Date(now.getTime() - room.ttl * 1000)) {
      deleteRoom(roomId);
      deleteAuthCookie(roomId);
      return { error: "Room expired. Redirecting." };
    }

    const expirationTime = new Date(now.getTime() - room.ttl * 1000);

    const remainingTime = room.createdAt.getTime() - expirationTime.getTime();

    return { remainingTime, success: "Room validated. " };
  } catch (e) {
    console.error(e);
    return { error: "Unknown server error occured. " };
  }
};
