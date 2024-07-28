"use server";
import { db } from "../lib/prisma";

const createRoom = async (password: string) => {
  // check password
  try {
    const newRoom = await db.chat.create({
      data: {
        password,
      },
    });
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
