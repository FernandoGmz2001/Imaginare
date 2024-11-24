'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useImageContext } from "../layout";
import { FormEvent, useState } from "react";

export default function NftForm() {


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

  };

  const handleChange = (data) => {
    console.log(data)
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
        </div>
        <div>
          <Button className="bg-white text-black font-semibold" type="submit">Edit</Button>
        </div>
      </form>
    </>
  );
}
