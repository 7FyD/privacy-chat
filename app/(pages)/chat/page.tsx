"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useState, useTransition } from "react";

import createRoom from "@/app/actions/createRoom";
import { useRouter } from "next/navigation";

const ChatDefault = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = () => {
    startTransition(() => {
      createRoom(password).then((data) => {
        if (data.error) {
          setSuccess("");
          setError(data.error);
        }
        if (data.success) {
          setError("");
          setSuccess(data.success);
          setTimeout(() => {
            router.push(`/chat/${data.id}`);
          }, 2000);
        }
      });
    });
  };
  return (
    <div className="flex flex-col items-center gap-12 mt-48">
      <h2 className="text-lg text-violet-700">
        Looking to start a conversation? Go forth!
      </h2>
      <p className="text-red-500">{error}</p>
      <p className="text-emerald-500">{success}</p>
      <Input
        value={password}
        type="password"
        maxLength={320}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your new room's password"
        className="max-w-md"
      />
      <Button disabled={isLoading} onClick={handleSubmit}>
        Start new conversation
      </Button>
    </div>
  );
};

export default ChatDefault;
