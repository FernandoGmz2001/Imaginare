"use client";
import Navbar from "@/app/components/Navbar";
import React from "react";
import EditForm from "./components/EditForm";
import NftCard from "@/app/components/NftCard";

export default function Nft() {
  return (
    <main className="px-10">
      <Navbar activeItem="Profile" />
      <div className="py-10 flex flex-col gap-4 items-center justify-center">
        <div className="text-left">
        <h2 className="text-h2-title text-white">Exchange NFT</h2>
        </div>
        <div className="flex flex-col gap-4 w-[400px]">
          <div className="w-[400px]">
            <NftCard
              url="https://c.files.bbci.co.uk/17C16/production/_117320379_giocondacerca.jpg"
              author="Fernando gomez"
              title="La monalisa"
              price="0.00000010"
              actions={false}
            />
          </div>
          <EditForm />
        </div>
      </div>
    </main>
  );
}
