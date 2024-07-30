"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { authRoom } from "@/app/actions/verify-password";

const Auth: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const verifyPassword = async () => {
    try {
      const response = await authRoom(roomId, password);
      console.log(response);
    } catch (err) {
      setError("Unexpected error occurred.");
    }
  };

  return (
    <div>
      <Input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <Button onClick={verifyPassword}>Enter chatroom</Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Auth;
