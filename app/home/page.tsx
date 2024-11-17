'use client'
import Navbar from "@/app/components/Navbar";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useState, useEffect, useRef } from 'react'
import CarouselNft from "./components/CarouselNft";
import { mockup } from "./lib/mockupData";
import Community from "./components/Community";

export default function Page() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (<main className="px-10 flex flex-col">
    <Navbar activeItem="Home" />
    <div className="flex flex-col">
    <div className="w-full rounded-2xl flex items-center justify-center py-4 dark text-foreground">
      <Carousel setApi={setApi} className="max-w-[100%] rounded-2xl" plugins={[plugin.current]}>
        <CarouselContent className="rounded-2xl">
          {mockup.map((nft, index) => {
            return (
              <CarouselItem className="rounded-2xl" key={index}>
                <CarouselNft nftUrl={nft.nftUrl} title={nft.title} autor={nft.autor} description={nft.description} price={nft.price}/>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
    <section id="Community">
      <Community />
    </section>
    </div>
  </main>)
}
