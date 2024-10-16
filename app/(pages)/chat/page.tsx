"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import createRoom from "@/app/actions/create-room";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";
import { MoonLoader } from "react-spinners";

const ChatDefault = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [user, setUser] = useState("Anonymous user");
  const [isLoading, startTransition] = useTransition();
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = () => {
    if (Number.isNaN(Number(duration)) || Number(duration) === 0) {
      setError("Please set a valid duration for the room.");
    } else {
      startTransition(() => {
        createRoom(password, Number(duration), user).then((data) => {
          if (data.error) {
            setSuccess("");
            setError(data.error);
          }
          if (data.success) {
            setError("");
            setSuccess(data.success);
            router.push(`/chat/${data.id}`);
          }
        });
      });
    }
  };
  // TODO add room created feedback (success toast + option to copy link? popup after redirect?)
  return (
    <Card className="w-[300px] sm:w-[350px] mx-auto mt-16 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-primary">Create a room</CardTitle>
        <CardDescription className="text-primary/90">
          Enter your name and your new room's desired password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-6">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Displayed Username</Label>
            <Input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="text"
              id="name"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Room password (optional)</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="duration">Room lifespan</Label>
            <Select
              onValueChange={(e) => setDuration(e)}
              defaultValue={duration}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={String(15 * 60)}>15 minutes</SelectItem>
                  <SelectItem value={String(30 * 60)}>30 minutes</SelectItem>
                  <SelectItem value={String(60 * 60)}>1 hour</SelectItem>
                  <SelectItem value={String(3 * 60 * 60)}>3 hours</SelectItem>
                  <SelectItem value={String(6 * 60 * 60)}>6 hours</SelectItem>
                  <SelectItem value={String(24 * 60 * 60)}>1 day</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-center text-emerald-500 font-medium mt-4">
          {success}
        </p>
        <p className="text-center text-red-500 font-medium mt-4">{error}</p>
        {isLoading && (
          <MoonLoader className="mx-auto" size="32" color="#7C3AED" />
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="mx-auto w-full"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Create room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChatDefault;
