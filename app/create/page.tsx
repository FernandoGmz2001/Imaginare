'use client'
import Navbar from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Generator from "./components/Generator";
import NftForm from "./components/NftForm";
import NftCard from "@/app/components/NftCard";
import { useImageContext } from "./layout";
import FileInput from "./components/FileInput"

export default function CreateNft() {
  const { imageObj } = useImageContext();

  console.log("imageObj in CreateNft:", imageObj);

  return (
    <main className="px-10 pb-10 min-h-screen">
      <Navbar hasBackground activeItem="Create" />
      <div className="w-full h-full flex flex-col items-center justify-center pt-8">
        <div className="">
          <div className="mb-4">
            <h2 className="text-h2-title text-white">Create New NFT</h2>
          </div>
          <div className="flex gap-8">
            <div className="text-white dark flex flex-col gap-6 w-4/6">
              <Tabs defaultValue="generator" className="">
                <TabsList>
                  <TabsTrigger value="generator">Generator</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="generator"
                  className="w-[500px] border-2 border-dashed px-8 py-16 rounded-xl"
                >
                  <Generator />
                </TabsContent>
                <TabsContent
                  value="upload"
                  className="w-[500px] border-2 border-dashed px-8 py-16 rounded-xl"
                >
                  <FileInput/>
                </TabsContent>
              </Tabs>
              <NftForm />
            </div>
            <div>
              <p className="text-h5-title text-white">Preview</p>
              <div className="w-[400px]">
                <NftCard
                  url={imageObj.url}
                  author="Fernando Gomez"
                  title={imageObj.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
