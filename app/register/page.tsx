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
    "http://localhost:3000/api/user"
  );
  const { toast } = useToast();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isloading, setisLoading] = useState(false);

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true)
    await postData({ firstName: userName, lastName });
    if (!error) {
      toast({
        title: "Usuario creado exitosamente",
        description: "Sera redirigido a la pagina para iniciar sesion con su nuevo usuario"
      });
      router.push("/login");
      setisLoading(false)
      return;
    }
    toast({
      title: "Ocurrio un error en la creacion del usuario",
      description: "Intentelo de nuevo",
    });
    setisLoading(false)
  };

  const onSignIn = () => {
    router.push("/login");
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
              <p className="text-h5-title">Sign up</p>
              <p className="text-2xl text-gray-500">Register</p>
            </header>
            <form className="flex flex-col gap-4 dark w-[300px]">
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
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-500"
            type="submit"
            onClick={onSignUp}
            disabled={isloading}
          >
            {isloading ? "Loading..." : "Sign up"}
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
