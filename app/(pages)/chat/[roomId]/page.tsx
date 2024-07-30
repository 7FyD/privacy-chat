import { cookies } from "next/headers";
import ChatClient from "./client";
import Auth from "./Auth";

export default async function ChatPage({
  params,
}: {
  params: { roomId: string };
}) {
  const COOKIE_NAME = `chat_session_${params.roomId}`;
  const cookie = cookies().get(COOKIE_NAME);

  const isAuthenticated = !!cookie;

  return (
    <>
      {isAuthenticated ? (
        <ChatClient roomId={params.roomId} />
      ) : (
        <Auth roomId={params.roomId} />
      )}
    </>
  );
}
