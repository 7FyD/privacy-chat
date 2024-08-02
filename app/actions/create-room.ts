"use server";
import { db } from "../lib/prisma";
import { createAuthCookie } from "./auth-cookie";

const createRoom = async (
  password: string,
  ttl: number,
  user = "Anonymous user"
) => {
  // TODO add password/time to live sanitization
  try {
    const newRoom = await db.chat.create({
      data: {
        password,
        ttl,
      },
    });

    createAuthCookie(newRoom.id, user);

    return {
      success: `Chat room ${newRoom.id} created. Redirecting...`,
      id: newRoom.id,
    };
  } catch (e) {
    console.error(e);
    return { error: "Internal server error. Chat room could not be created. " };
  }
};

export default createRoom;
