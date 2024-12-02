"use client"
import React, { useContext, createContext, useState } from "react";
type NftObject = {
  url: string;
  name: string;
  description: string;
  author?: string;
  price?: number;
};
type NftContextType = {
  selectedNft: NftObject;
  setSelectedNft: React.Dispatch<React.SetStateAction<NftObject>>;
};
const NftContext = createContext<NftContextType | null>(null);

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedNft, setSelectedNft] = useState<NftObject>({
    url: "",
    name: "",
    description: "",
    price: 0,
  });

  return (
    <NftContext.Provider value={{ selectedNft, setSelectedNft }}>
      {children}
    </NftContext.Provider>
  );
}

// Hook personalizado para consumir el contexto (opcional pero recomendado)
export const useNftContext = () => {
  const context = useContext(NftContext);
  if (!context) {
    throw new Error("useImageContext debe usarse dentro de CreateLayout");
  }
  return context;
};

