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
import { useToast } from "@/hooks/use-toast";

function Register() {
  const { error, postData, isLoading, responseData } = usePost(
    "http://localhost:3000/api/user",
  );
  const { toast } = useToast();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData({ firstName: userName, lastName });
    if (!error) {
      toast({
        title: "Usuario creado exitosamente",
      });
      router.push("/login");
      return;
    }
    toast({
      title: "Ocurrio un error en la creacion del usuario",
      description: "Intentelo de nuevo",
    });
  };

  const onSignIn = () => {
    router.push("/login");
  };

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
            onClick={onSignUp}
            disabled={isLoading}
          >
            Sign up
          </Button>
          <Separator />
          <Button className="w-full" onClick={onSignIn}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
