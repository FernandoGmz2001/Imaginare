import { Button } from "@/components/ui/button";

export default function CarouselNft({ nftUrl, title, description, status = "Venta no iniciada", autor, price }: { nftUrl: string, title: string, description: string, status?: string, autor: string, price: number }) {
  return <>
    <div className=" min-h-[85vh] w-screen flex items-center justify-center gap-8 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url('${nftUrl}')` }}
    >
      <div className="backdrop-blur-md bg-black/30 flex w-full h-full min-h-[85vh]  items-center justify-center px-4 gap-8">
        <div className="">
          <div className="w-[500px] h-[500px] rounded-2xl bg-center bg-cover"
            style={{ backgroundImage: `url('${nftUrl}')` }}
          > </div>
        </div>
        <div className="flex justify-center items-center  px-4">
          <div className="flex flex-col gap-4 w-[55ch]">
            <div className="">
              <p className="text-small-text">{status}</p>
              <h3 className="text-h2-title font-bold"
              >{title}</h3>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-white opacity-75">Hecho por </p>
              <span className="font-bold text-md  px-4 py-2 backdrop-blur bg-white/20 rounded-lg ">{autor}</span>
            </div>
            <p>{description}</p>
            <div>
              <Button className="font-bold">Reclamar por {price} ETH</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
