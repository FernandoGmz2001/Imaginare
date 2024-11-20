import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NftCard from '@/app/components/NftCard'
import nfts from '@/nfts.json'

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
          <>
            <NftCard  url={nfts[nfts.length -1].image} author={nfts[nfts.length -1].autor} title={nfts[nfts.length -1].title} price={nfts[nfts.length -1].price}/>
            <NftCard  url={nfts[nfts.length -2].image} author={nfts[nfts.length -2].autor} title={nfts[nfts.length -2].title} price={nfts[nfts.length -2].price}/>
            <NftCard  url={nfts[nfts.length -3].image} author={nfts[nfts.length -3].autor} title={nfts[nfts.length -3].title} price={nfts[nfts.length -3].price}/>
          </>
        }
      </div>
    </div>
  );
}
