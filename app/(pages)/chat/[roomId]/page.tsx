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
  const cookieValue = cookie?.value;
  let username: string;
  if (cookieValue && cookieValue.split(":")[1])
    username = cookieValue.split(":")[1];
  else username = "Anonymous user";

  const isAuthenticated = !!cookie;

  return (
    <>
      {isAuthenticated ? (
        <ChatClient roomId={params.roomId} username={username} />
      ) : (
        <Auth roomId={params.roomId} />
      )}
    </>
  );
}
