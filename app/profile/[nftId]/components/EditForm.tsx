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
  const [contractId, setcontractId] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postData({
      contractId
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
            Contract Id
          </Label>
          <Input
            type="text"
            id="contractId"
            name="contractId"
            placeholder="Contract id"
            className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white "
            onChange={(e) => setcontractId(e.target.value)}
          />
        </div>
        <div>
          <Button className="bg-white text-black font-semibold" type="submit">
            Exchange
          </Button>
        </div>
      </form>
    </>
  );
}
