import Navbar from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Generator from "./components/Generator";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import NftForm from "./components/NftForm";

export default function CreateNft() {
  return (
    <main className="px-10 min-h-screen">
      <Navbar hasBackground={false} activeItem="Create" />
      <div className="w-full h-full flex flex-col items-center justify-center pt-8">
        <div className="">
          <div className="mb-4">
            <h2 className="text-h2-title text-white">Create New NFT</h2>
          </div>
          <div className="flex gap-8">
            <div className="text-white dark flex flex-col gap-6">
              <Tabs defaultValue="generator" className="">
                <TabsList>
                  <TabsTrigger value="generator">Generator</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="generator"
                  className="w-[500px] border-2 border-dashed px-8 py-16 rounded-xl"
                >
                  <Generator />
                </TabsContent>
                <TabsContent value="upload">
                  Change your password here.
                </TabsContent>
              </Tabs>
              <NftForm />
            </div>
            <div>
              <p className="text-h5-title text-white">Preview</p>
              <div className="w-[300px] h-[300px] bg-grayBackground rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
