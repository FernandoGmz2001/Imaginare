'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import EthInput from "./EthInput";
import { useImageContext } from "../layout";
import { FormEvent, useState } from "react";

export default function NftForm() {
  const { imageObj, setImageObj } = useImageContext();
  const [ imgName, setImgName ] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setImageObj({...imageObj,name: imgName, description: '', author: ''})
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
            placeholder="Name"
            className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white "
            onChange={(e)=> setImgName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-white font-semibold">
            Description
          </Label>
          <Input
            type="text"
            id="description"
            placeholder="Description"
            className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white "
          />
        </div>
        <div>
          <EthInput />
        </div>
        <div>
          <Button className="bg-white text-black font-semibold">Create</Button>
        </div>
      </form>
    </>
  );
}
