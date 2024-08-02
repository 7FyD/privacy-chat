"use server";

import { cookies } from "next/headers";
import { generateSessionToken } from "../lib/token";

export const createAuthCookie = (roomId: string, user: string) => {
  try {
    const COOKIE_NAME = `chat_session_${roomId}`;
    const sessionToken = generateSessionToken(roomId);

    const combinedValue = `${sessionToken}:${user ? user : "Anonymous user"}`;
    cookies().set(COOKIE_NAME, combinedValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};
