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

const ChatDefault = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, startTransition] = useTransition();
  const [duration, setDuration] = useState("");
  console.log(Number(duration));
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
          router.push(`/chat/${data.id}`);
        }
      });
    });
  };
  return (
    <Card className="w-[350px] mx-auto mt-48">
      <CardHeader>
        <CardTitle className="text-primary">Create a room</CardTitle>
        <CardDescription className="text-primary/90">
          Enter your name and your new room's desired password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-6">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="text"
              id="name"
              placeholder="Anonymous user"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Room password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="******"
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
        <p className="text-center text-emerald-500 font-medium mt-2">
          {success}
        </p>
        <p className="text-center text-red-500 font-medium mt-2">{error}</p>
      </CardContent>
      <CardFooter className={`${!error && "mt-6"}`}>
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
