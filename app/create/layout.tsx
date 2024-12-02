"use client"; // Necesario en Next.js para componentes del lado del cliente

import React, { useContext, createContext, useState } from "react";

type NftObject = {
  url: string;
  name: string;
  description: string;
  author?: string;
  price?: number;
};

// Definir el tipo del contexto para tipar `imageObj` y `setImageObj`
type ImageContextType = {
  imageObj: NftObject;
  setImageObj: React.Dispatch<React.SetStateAction<NftObject>>;
};

// Crear el contexto
const ImageContext = createContext<ImageContextType | null>(null);

// Crear el proveedor del contexto
export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [imageObj, setImageObj] = useState<NftObject>({
    url: "",
    name: "",
    description: "",
    price: 0,
  });

  return (
    <ImageContext.Provider value={{ imageObj, setImageObj }}>
      {children}
    </ImageContext.Provider>
  );
}

// Hook personalizado para consumir el contexto (opcional pero recomendado)
export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext debe usarse dentro de CreateLayout");
  }
  return context;
};
