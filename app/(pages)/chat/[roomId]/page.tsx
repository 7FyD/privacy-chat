import ChatClient from "./client";

export default function ChatPage({ params }: { params: { roomId: string } }) {
  return <ChatClient roomId={params.roomId} />;
}
