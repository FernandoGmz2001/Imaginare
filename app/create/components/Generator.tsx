"use client";

import { Input } from "@/components/ui/input";
import { useState, ChangeEvent, FormEvent, useContext  } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";
import { useImageContext } from "../layout";

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { imageObj, setImageObj } = useImageContext();


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault()
    if (prompt.trim() === "") {
      setError("The prompt is empty");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `${prompt}. Estilo pixel art 8 bit.`,
          image_generator_versions: "standard",
          use_old_model: false,
          turbo: true,
          genius_preference: 'classic'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setImageObj({
        url: data.ImageUrl,
      })
      setImgUrl(data.imageUrl);

    } catch (err : any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div >
        <form className="relative" onSubmit={handleSubmit}>
        <Input
          placeholder="Input a prompt to create a new NFT"
          className="bg-grayBackground rounded-2xl pr-9"
          onChange={handleChange}
          value={prompt}
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full text-white w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          disabled={isLoading}
        >
          {isLoading ?
          <LuLoader2 className="animate-spin"/>
          :
          <FaArrowUp />
          }
        </button>
        </form>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {imgUrl && <img src={imgUrl} alt="Generated NFT" className="mt-4" />}
    </>
  );
}
