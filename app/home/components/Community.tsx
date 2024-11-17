import { Nft } from "@/types/types";
import CommunityCard from "./CommunityCard";
import nfts from "@/nfts.json"

export default function Community(){
  return <section className="min-h-screen mt-[70px]">
    <h3 className="text-h2-title font-bold text-white">Community</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {nfts.map((nft: Nft  , index ) => (
        <CommunityCard key={index} url={nft.image} author={nft.autor} title={nft.title}/>
      ))}
    </div>
  </section>
}
