"use client";

import { joinRoom } from "@/app/actions/join-room";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Link from "next/link";

const Auth: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await joinRoom(roomId, password, user);
      if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError("Unexpected error occurred.");
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-16">
      <CardHeader>
        <CardTitle className="text-primary">Join room</CardTitle>
        <CardDescription className="text-primary/90">
          Enter your name and the room's password
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
        </div>
        <p className="text-red-500 font-medium mt-2">{error}</p>
      </CardContent>
      <CardFooter className={`flex justify-between ${!error && "mt-6"}`}>
        <Link href="/chat">
          <Button variant="outline">Go back</Button>
        </Link>
        <Button onClick={handleSubmit}>Join room</Button>
      </CardFooter>
    </Card>
  );
};

export default Auth;
