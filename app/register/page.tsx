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

function Register() {
  const { error, postData, isLoading, responseData } = usePost(
    "http://localhost:3000/api/register",
  );
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData({ email, password });
    if (!error) {
      router.push("/home")
      console.log("Datos de respuesta:", responseData);
    }
  };

  const onSignIn = () => {
    router.push('/login')
  }

  return (
    <div className="dark flex w-full h-screen items-center justify-center">
      <Card className="w-">
        <CardHeader>
          <CardTitle>Imaginare</CardTitle>
          <CardDescription>Register</CardDescription>
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
            onClick={onSignUp}
            disabled={isLoading}
          >
            Sign up
          </Button>
          <Separator />
          <Button className="w-full" onClick={onSignIn}>Sign in</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
