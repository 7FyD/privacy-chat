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
import { MoonLoader } from "react-spinners";

const Auth: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("Anonymous user");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await joinRoom(roomId, password, user).then((data) => {
        if (data.error) {
          setError(data.error);
        }
      });
    } catch (err) {
      setError("Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="w-[300px] sm:w-[350px] mx-auto mt-16 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-primary">Join room</CardTitle>
        <CardDescription className="text-primary/90">
          Enter your name and the room's password
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
            <Label htmlFor="password">Room password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
        </div>
        <p className="text-red-500 font-medium mt-2">{error}</p>
      </CardContent>
      <CardFooter className={`flex justify-between ${!error && "mt-6"}`}>
        <Link href="/chat">
          <Button variant="outline">Go back</Button>
        </Link>
        {isLoading && <MoonLoader size="32" color="#7C3AED" />}
        <Button disabled={isLoading} onClick={handleSubmit}>
          Join room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Auth;
