import { randomUUID } from "crypto";

export const generateSessionToken = (roomId: string) => {
  const uuid = randomUUID();
  return roomId + uuid;
};
