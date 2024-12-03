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
import { Nft } from "@/types/types";
import { useRouter } from "next/navigation";
import useFetch from "@/app/hooks/useFetch";

export default function MyNfts() {
  const { selectedNft, setSelectedNft } = useNftContext();
  const { data, error, isLoading } = useFetch("http://localhost:3000/api/nfts");
  const router = useRouter();

  const handleExchange = (nft: Nft) => {
    console.log(nft);
    setSelectedNft({
      url: nft.image,
      name: nft.title,
      description: nft.description || "",
      author: nft.autor,
      price: nft.price,
    });
    router.push(`/profile/${nft.id}`);
  };

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
          {nfts.slice(-3).map((nft, index) => (
            <NftCard
              id={nft.id}
              key={index}
              url={nft.image}
              author={nft.autor}
              title={nft.title}
              price={nft.price}
              onExchange={() => handleExchange(nft)}
            />
          ))}
        </>
      </div>
    </div>
  );
}
