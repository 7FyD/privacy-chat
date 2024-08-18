"use client";

import { checkRoom } from "@/app/actions/check-room";

import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Clipboard } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";

interface Message {
  user: string;
  text: string;
  timestamp: Date;
}

let socket: Socket;

type Connection = {
  id: string;
  username: string;
  roomId: string;
};

const ChatClient: React.FC<{ roomId: string; username: string }> = ({
  roomId,
  username,
}) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTimestamps, setShowTimestamps] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userList, setUserList] = useState<Array<Connection>>([]);
  useEffect(() => {
    const checkRoomValidity = async () => {
      const isValid = await checkRoom(roomId);
      if (!isValid) window.location.reload();
    };

    checkRoomValidity();
  }, [roomId]);

  useEffect(() => {
    socket = io();
    socket.emit("join room", { roomId, username });
    socket.on("chat history", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("room update", (connections: Array<Connection>) => {
      setUserList(connections);
    });

    return () => {
      socket.off("chat history");
      socket.off("message");
      socket.off("room update");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const message: Message = {
        user: username || "Anonymous user",
        text: input,
        timestamp: new Date(),
      };

      socket.emit("message", { roomId, message });
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-6">
          <div
            id="messagesContainer"
            className="min-h-[44rem] max-h-[44rem] w-full sm:w-[40rem] md:w-[48rem] xl:w-[64rem] break-words overflow-y-auto border-2 p-4 rounded-xl bg-white"
            ref={messagesEndRef}
          >
            {messages.length === 0 ? (
              <p className="font-light">Chat is empty...</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`w-full flex items-center break-words group gap-2 p-2 ${
                    index % 2 === 0 ? "bg-white" : "bg-indigo-50"
                  }`}
                >
                  {showTimestamps && (
                    <div className="w-[90px] min-w-fit">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                  <span className="min-w-fit">{msg.user}:</span>
                  <span className="min-w-[1%]">{msg.text}</span>
                  <Clipboard
                    onClick={() => copyToClipboard(msg.text)}
                    className="ml-auto mr-2 min-w-5 max-w-5 hover:cursor-pointer hidden group-hover:inline"
                  />
                </div>
              ))
            )}
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
            <Button className="w-48" variant="default" onClick={sendMessage}>
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
          <Separator className="h-[1.5px]" />
          <p className="font-bold mt-[-10px]">Connected users:</p>
          <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-16">
            {userList && userList.length > 0 ? (
              userList.map((user) => <p key={user.id}>{user.username}</p>)
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatClient;
