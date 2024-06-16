import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication
    if (username === "user" && password === "password") {
      // Replace with actual authentication logic
      await login({ username });
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleLogin}>Sign in</Button>
      </CardFooter>
    </Card>


  );
};
