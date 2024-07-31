"use client";

import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Clipboard } from "lucide-react";
import { Label } from "@/app/components/ui/label";

interface Message {
  user: string;
  text: string;
  timestamp: Date;
}

let socket: Socket;

const ChatClient: React.FC<{ roomId: string; username: string }> = ({
  roomId,
  username,
}) => {
  const [input, setInput] = useState<string>("");
  const [user, setUser] = useState<string>(username);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTimestamps, setShowTimestamps] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const message: Message = {
        user: user !== "" ? user : "Anonymous user",
        text: input,
        timestamp: new Date(),
      };
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="container mt-12">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-6">
          <div
            id="messagesContainer"
            className="min-h-[44rem] max-h-[44rem] w-full sm:w-[40rem] md:w-[48rem] xl:w-[64rem] break-words overflow-y-auto border-2 p-4 rounded-xl bg-white"
            ref={messagesEndRef}
          >
            {messages.length === 0 && (
              <p className="font-light">Chat is empty...</p>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`w-full flex items-center break-words group gap-2 p-2 ${
                  index % 2 === 0 ? "bg-white" : "bg-indigo-50"
                }`}
              >
                <div className={`w-[90px] ${showTimestamps ? "" : "hidden"}`}>
                  <span
                    className={`min-w-fit ${showTimestamps ? "" : "hidden"}`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString()}{" "}
                  </span>
                </div>
                <span className="min-w-fit">{msg.user}: </span>
                <span className="min-w-[1%]">{msg.text}</span>
                <Clipboard
                  onClick={() => {
                    navigator.clipboard.writeText(msg.text);
                  }}
                  className="ml-auto mr-2 min-w-5 max-w-5 hover:cursor-pointer hidden group-hover:inline"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Input
              value={input}
              type="text"
              maxLength={320}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              className="w-full md:max-w-xl bg-white"
              onKeyDown={handleKeyDown}
            />
            <Button className="w-48" variant={"default"} onClick={sendMessage}>
              Send message
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start space-y-6">
          <p>Time remaining: ...</p>
          <div className="flex justify-start items-center gap-2">
            <Checkbox
              checked={showTimestamps}
              onCheckedChange={() => setShowTimestamps(!showTimestamps)}
            />
            <p>Show timestamps</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Change username</Label>
            <Input
              value={user}
              type="text"
              maxLength={20}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Your name. . ."
              className="max-w-fit md:max-w-xs bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatClient;
