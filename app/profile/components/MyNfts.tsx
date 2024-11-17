import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NftCard from '@/app/components/NftCard'
import nfts from '@/my-nfts.json'

import SearchInput from "./SearchInput";
import { Nft } from "@/types/types";
export default function MyNfts() {
  return (
    <div className=" w-full dark flex flex-col gap-4">
      <div className="flex gap-4 dark">
        <SearchInput />
        <Select>
          <SelectTrigger className="w-[180px] text-white border-grayBackground ">
            <SelectValue placeholder="Precio" />
          </SelectTrigger>
          <SelectContent className="text-white bg-background">
            <SelectItem value="light">Alto a bajo</SelectItem>
            <SelectItem value="dark">Bajo a alto</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {
          nfts.map((nft: Nft,index)=>(
            <NftCard key={index} url={nft.image} author={nft.autor} title={nft.title} price={nft.price}/>
          ))
        }
      </div>
    </div>
  );
}
