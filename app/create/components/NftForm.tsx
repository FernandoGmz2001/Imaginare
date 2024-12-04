"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import EthInput from "./EthInput";
import { useImageContext } from "../layout";
import { FormEvent, useState } from "react";
import usePost from "@/app/hooks/usePost";
import axios from "axios";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { title } from "process";

export default function NftForm() {
  const {user} = useUser()
  const [isloading, setIsLoading ] = useState(false)
  const router = useRouter()
  const {toast} = useToast()
  const { imageObj, setImageObj } = useImageContext();
  const [formValues, setFormValues] = useState({ name: "", description: "" });
  const { error, postData, responseData } = usePost(
    `http://localhost:3000/api/upload?userId=${user?.userId}`,
  );
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: "Creating NFT, please wait...",
    });
    setIsLoading(true)
    try {
      const imageBlob = await onImageDownload(imageObj.url);
      if (!imageBlob) {
        console.error("Error al descargar la imagen.");
        return;
      }

      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      formData.append("address", "0x578B5dc7645a6424847C128B17393A08Db9884ee")

      const file = new File([imageBlob], "imagen.png", { type: "image/png" });
      formData.append("file", file);

      const response = await postData(formData);
      console.log(response)
      toast({
        title: "Nft added succesfully",
      });
      return
    } catch (error) {
      setIsLoading(false)
      console.error("Error al enviar los datos:", error);
      toast({
        title: "Error when loading nft",
      });
    }finally{
      setIsLoading(false)
    }
  };

  async function onImageDownload(imageUrl: string): Promise<Blob | null> {
    try {

      const response = await axios.get(imageUrl, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al descargar la imagen:", error.message);
      }
      return null;
    }
  }

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
        <Button className="bg-white text-black font-semibold" type="submit" disabled={isloading}>
          {isloading ? "Loading..." : "Create"}
        </Button>
      </div>
    </form>
  );
}
