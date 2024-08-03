"use server";
import bcrypt from "bcryptjs";

import { db } from "../lib/prisma";
import { createAuthCookie } from "./auth-cookie";

const createRoom = async (
  password: string,
  ttl: number,
  user = "Anonymous user"
) => {
  if (password.length > 33)
    return { error: "Password cannot have more than 32 characters." };

  const validTTLs = [900, 1800, 3600, 10800, 21600, 86400];
  if (Number.isNaN(ttl) || !validTTLs.includes(ttl)) {
    return { error: "Please set a valid duration for the room." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newRoom = await db.chat.create({
      data: {
        password: hashedPassword,
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
