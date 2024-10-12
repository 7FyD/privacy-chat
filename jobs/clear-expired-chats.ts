import { client } from "@/trigger";
import { cronTrigger } from "@trigger.dev/sdk";
import { db } from "@/app/lib/prisma";
import { addSeconds, isBefore } from "date-fns";

client.defineJob({
  id: "delete-expired-chats",
  name: "Delete expired chats",

  version: "1.0.0",
  trigger: cronTrigger({
    cron: "*/15 * * * *",
  }),
  run: async (payload, io, ctx) => {
    try {
      const allChats = await io.runTask("fetch-all-chats", async () => {
        return await db.chat.findMany();
      });

      const currentTime = new Date();

      const expiredChats = allChats.filter((chat) => {
        const expirationTime = addSeconds(chat.createdAt, chat.ttl);
        return isBefore(expirationTime, currentTime);
      });

      await io.logger.info(`Found ${expiredChats.length} expired chat(s)`);

      await io.runTask("delete-expired-chats", async () => {
        const deletePromises = expiredChats.map((chat) =>
          db.chat.delete({
            where: { id: chat.id },
          })
        );
        await Promise.all(deletePromises);
      });

      await io.logger.info(`${expiredChats.length} expired chat(s) deleted.`);

      return { message: `${expiredChats.length} expired chat(s) deleted.` };
    } catch (error) {
      await io.runTask("handle-error", async () => {
        console.error("Error deleting expired chats:", error);
      });

      return { error: "Internal Server Error" };
    }
  },
});
