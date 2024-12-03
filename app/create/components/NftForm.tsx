"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import EthInput from "./EthInput";
import { useImageContext } from "../layout";
import { FormEvent, useState } from "react";
import usePost from "@/app/hooks/usePost";

export default function NftForm() {
  const { imageObj, setImageObj } = useImageContext();
  const [formValues, setFormValues] = useState({ name: "", description: "" });
  const { error, postData, responseData } = usePost(
    "http://localhost:3000/api/nft",
  );
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...formValues, price: imageObj.price };
    postData(payload)
    if(!error){
    console.log(payload);
    console.log(responseData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
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
          className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white"
          onChange={handleChange}
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
          className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white"
          onChange={handleChange}
        />
      </div>
      <div>
        <EthInput />
      </div>
      <div>
        <Button className="bg-white text-black font-semibold" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
}
