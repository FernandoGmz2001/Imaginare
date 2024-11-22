"use client"; // Necesario en Next.js para componentes del lado del cliente

import React, { useContext, createContext, useState } from "react";

type NftObject = {
  url: string;
  name: string;
  description: string;
  author?: string;
};
// Definir el tipo del contexto para tipar `imageObj` y `setImageObj`
type ImageContextType = {
  imageObj: NftObject; // Puedes especificar el tipo exacto si lo conoces
  setImageObj: React.Dispatch<React.SetStateAction<object>>;
};

// Crear el contexto
const ImageContext = createContext<ImageContextType | null>(null);

// Crear el proveedor del contexto
export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [imageObj, setImageObj] = useState<object>({url: '', name: '', description: '', author:''});

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
