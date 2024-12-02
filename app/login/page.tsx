"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CustomInput from "../components/CustomInput";
import usePost from "../hooks/usePost";
import { useRouter } from "next/navigation";

function Login() {
  const { error, postData, isLoading, responseData } = usePost(
    "http://localhost:3000/api/login",
  );
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData({ email, password });
    if (!error) {
      router.push("/home")
      console.log("Datos de respuesta:", responseData);
    }
  };

  const onSignUp = () => {
    router.push("/register")
  }

  return (
    <div className="dark flex w-full h-screen items-center justify-center">
      <Card className="w-">
        <CardHeader>
          <CardTitle>Imaginare</CardTitle>
          <CardDescription>login</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4 dark">
            <div className="flex flex-col gap-2">
              <CustomInput
                label="User"
                placeholder="p.ej user.test@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <CustomInput
                label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full"
            type="submit"
            onClick={onSignIn}
            disabled={isLoading}
          >
            Sign in
          </Button>
          <Separator />
          <Button className="w-full" onClick={onSignUp}>Sign up</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
