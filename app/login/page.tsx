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
  const [isloading, setisLoading] = useState(false);

  const { toast } = useToast();
  const onSignIn = async (e: React.FormEvent) => {
    setisLoading(true);
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:3000/api/user?userName=${userName}`
    );
    const data: UsersResponse = await response.data;
    if (data) {
      if (data && data.user.length > 0) {
        setUser(data.user[0]);
        toast({
          title: "Sesión iniciada exitosamente",
        });
        setisLoading(false);
        router.push("/home");
        return;
      }
    }
    toast({
      title: "Ocurrió un error al intentar iniciar sesión",
      description: "Inténtelo de nuevo",
    });
    setisLoading(false);
  };

  const onSignUp = () => {
    router.push("/register");
  };

  return (
    <div
      className="dark flex w-full h-screen items-center justify-center flex-col gap-6"
      style={{ backgroundImage: 'url("/images/LoginBackground.png")' }}
    >
      <h2 className="text-white text-h3-with-subtitle">Imaginare</h2>
      <Card className="bg-[#101617] p-10">

        <CardContent>
          <div className="flex flex-col gap-8">
            <header>
              <p className="text-h5-title">Sign in</p>
              <p className="text-2xl text-gray-500">Login</p>
            </header>
            <form className="flex flex-col gap-6 dark w-[300px]">
              <div className="flex flex-col gap-6">
                <CustomInput
                  label="Username"
                  placeholder="p.ej user.test@gmail.com"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-500"
            type="submit"
            onClick={onSignIn}
            disabled={isloading}
          >
            {isloading ? "Loading..." : "Sign in"}
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
