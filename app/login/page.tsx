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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { User } from "@/types/types";
import axios from "axios";

export interface UsersResponse {
  user: User[];
}

function Login() {
  const { setUser } = useUser();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");

  const { toast } = useToast();
  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:3000/api/user?userName=${userName}`)
    const data: UsersResponse = await response.data
    if (data) {
      if (data && data.user.length > 0) {
        setUser(data.user[0]);
      }
      toast({
        title: "Sesion iniciada exitosamente",
      });
      router.push("/home");
      return;
    }
    toast({
      title: "Ocurrio un error al intentar iniciar sesion",
      description: "Intentelo de nuevo",
    });
  };

  const onSignUp = () => {
    router.push("/register");
  };

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
                label="UserName"
                placeholder="p.ej user.test@gmail.com"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <CustomInput
                label="LastName"
                placeholder="p.ej Perez"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full"
            type="submit"
            onClick={onSignIn}
          >
            Sign in
          </Button>
          <Separator />
          <Button className="w-full" onClick={onSignUp}>
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
