"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NftCard from "@/app/components/NftCard";
import nfts from "@/nfts.json";
import SearchInput from "./SearchInput";
import { useNftContext } from "../layout";
import { Nft, Upload } from "@/types/types";
import { useRouter } from "next/navigation";
import useFetch from "@/app/hooks/useFetch";
import { useUser } from "@/contexts/UserContext";

export interface UploadResponse {
  uploads: Upload[];
}

export default function MyNfts() {
  const { selectedNft, setSelectedNft } = useNftContext();
  const {user} = useUser()
  const { data, error, isLoading, fetchData } = useFetch<UploadResponse>(`http://localhost:3000/api/upload/?userId=8`);
  // const { data, error, isLoading, fetchData } = useFetch<UploadResponse>(`http://localhost:3000/api/upload/?userId=${user?.userId}`);
  const router = useRouter();


  useEffect(()=>{
      fetchData()
  },[])


  const handleExchange = (nft: Upload) => {
    console.log(nft);
    // setSelectedNft({
    //   url: nft.image,
    //   name: nft.title,
    //   description: nft.description || "",
    //   author: nft.autor,
    //   price: nft.price,
    // });
    // router.push(`/profile/${nft.id}`);
  };

  function getPathAfterUploads(filePath: string): string {
    const uploadsIndex = filePath.indexOf('uploads');
    if (uploadsIndex === -1) {
      throw new Error('The path does not contain "uploads".');
    }
    // Añadimos la longitud de 'uploads' para obtener la parte después de 'uploads'
    console.log(filePath.slice(uploadsIndex + 'uploads'.length))
    return filePath.slice(uploadsIndex + 'uploads'.length);
  }

  useEffect(() => {
    console.log("NFT seleccionado actualizado:", selectedNft);
  }, [selectedNft]);

  return (
    <div className="w-full dark flex flex-col gap-4">
      <div className="flex gap-4 dark">
        <SearchInput />
        <Select>
          <SelectTrigger className="w-[180px] text-white border-grayBackground">
            <SelectValue placeholder="Precio" />
          </SelectTrigger>
          <SelectContent className="text-white bg-background">
            <SelectItem value="high-to-low">Alto a bajo</SelectItem>
            <SelectItem value="low-to-high">Bajo a alto</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <>
          {data?.uploads.map((nft, index) => (
            <>
            <p>{nft.filePath}</p>
             <NftCard
              key={index}
              url={getPathAfterUploads(nft.filePath)}
              title={nft.fileName}
              onExchange={() => handleExchange(nft)}
            />
            </>

          ))}
        </>
      </div>
    </div>
  );
}
