'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import EthInput from "./EthInput";
import { useImageContext } from "../layout";
import { FormEvent, useState } from "react";

export default function NftForm() {
  const { imageObj, setImageObj } = useImageContext();

  const handleSubmit = (e: FormEvent) => {
    console.log(imageObj)
    e.preventDefault();

  };

  const handleChange = ( e: any ) => {
    const { name , value } = e.target
    setImageObj((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(imageObj)
  }

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
            className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white "
            onChange={handleChange}
          />
        </div>
        <div>
          <EthInput />
        </div>
        <div>
          <Button className="bg-white text-black font-semibold" type="submit">Create</Button>
        </div>
      </form>
    </>
  );
}
