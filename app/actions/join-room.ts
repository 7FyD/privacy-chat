"use server";

import { db } from "../lib/prisma";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

let roomSecret: string;

const verifyPassword = async (roomId: string, password: string) => {
  try {
    const room = await db.chat.findUnique({
      where: {
        id: roomId,
      },
    });
    // roomSecret = room.secret;
    return room?.password === password;
  } catch (e) {
    return false;
  }
};

const generateSessionToken = (roomId: string) => {
  const uuid = randomUUID();
  return roomId + uuid;
};

export async function joinRoom(
  roomId: string,
  password: string,
  user?: string
) {
  const COOKIE_NAME = `chat_session_${roomId}`;
  const isValid = await verifyPassword(roomId, password);

  if (!isValid) {
    return { error: "Invalid room or password." };
  }

  const sessionToken = generateSessionToken(roomId);

  const combinedValue = `${sessionToken}:${user ? user : "Anonymous User"}`;

  // set the cookie in the response headers using cookies API
  cookies().set(COOKIE_NAME, combinedValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
    // how do I add name here?
  });

  return { success: "Verified and session started." };
}
