"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import io, { Socket } from "socket.io-client";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface Message {
  user: string;
  text: string;
  timestamp: Date;
}

let socket: Socket;

const ChatClient: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState("Anonymous user");
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (roomId) {
      socket = io();
      socket.emit("join room", roomId);

      socket.on("chat history", (history: Message[]) => {
        setMessages(history);
      });

      socket.on("message", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("chat history");
        socket.off("message");
        socket.disconnect();
      };
    }
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const message: Message = { user, text: input, timestamp: new Date() };
      socket.emit("message", { roomId, message });
      setInput("");
    }
  };

  const scrollToBottom = () => {
    const element = messagesEndRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  return (
    <div className="container">
      {!roomId && (
        <h2 className="font-bold text-3xl text-center text-red-500">
          Oops! Something went wrong.
        </h2>
      )}
      {roomId && (
        <div className="flex flex-col justify-start items-center gap-12">
          <Input
            value={user}
            type="text"
            maxLength={20}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter username"
            className="max-w-xs"
          />
          <div className="space-y-4">
            <div
              id="messagesContainer"
              className="min-h-80 max-h-80 w-[56rem] break-words overflow-y-auto border-2 p-4 rounded-xl"
              ref={messagesEndRef}
            >
              {messages.length === 0 && (
                <p className="font-light">Chat is empty...</p>
              )}
              {messages.map((msg, index) => (
                <div key={index}>
                  <span>{new Date(msg.timestamp).toLocaleTimeString()} </span>
                  <span>{msg.user}: </span>
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
            <Input
              value={input}
              type="text"
              maxLength={320}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              className="max-w-lg"
            />
            <Button variant={"outline"} onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatClient;
