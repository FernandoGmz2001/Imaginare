"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FormEvent, useState } from "react";
import usePost from "@/app/hooks/usePost";

export default function NftForm() {
  const { error, postData, responseData } = usePost(
    "http://localhost:3000/api/exchange",
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postData({
      name,
      description
    });
    if(!error){
      console.log("Todo salio bien")
      console.log(`Respuesta: ${responseData}`)
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4 dark" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-white font-semibold">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white "
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-white font-semibold">
            Description
          </Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white "
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div></div>
        <div>
          <Button className="bg-white text-black font-semibold" type="submit">
            Exchange
          </Button>
        </div>
      </form>
    </>
  );
}
