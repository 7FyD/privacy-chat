"use server";

import { db } from "../lib/prisma";

export async function deleteRoom(roomId: string) {
  const secret = process.env.CHAT_API_SECRET;

  await db.chat.delete({
    where: { id: roomId },
  });

  await fetch(`http://localhost:3000/api/deleteChatHistory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({ roomId }),
  });
}
