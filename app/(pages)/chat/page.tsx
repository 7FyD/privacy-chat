"use client";

import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";

const ChatDefault = () => {
  const router = useRouter();
  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    router.push(`/chat/${newRoomId}`);
  };
  return (
    <div className="flex flex-col items-center gap-12 mt-48">
      <h2 className="text-lg text-violet-700">
        Looking to start a conversation? Go forth!
      </h2>
      <Button onClick={createRoom}>Start new conversation</Button>
    </div>
  );
};

export default ChatDefault;
