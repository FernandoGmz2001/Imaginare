'use client'
import { Button } from "@/components/ui/button"
import { FaBagShopping } from "react-icons/fa6";
import { MdWallet } from "react-icons/md";
import { useRouter } from "next/navigation"


export default function Navbar({activeItem, hasBackground = true}:{activeItem?:string, hasBackground?:boolean}) {
  const router = useRouter()

  return (<>
    <div className={`flex justify-between items-center w-full dark py-4  sticky top-0 z-50   ${hasBackground ? "bg-background bg-opacity-95 backdrop-blur-xl" : "bg-transparent"}`}>
      <div>
        <p className="text-[24px] font-bold text-white cursor-pointer" onClick={()=> router.push('/')}>Imaginare</p>
      </div>
      <div className="flex gap-6  text-bold-text">
        <p className={`text-white opacity-55 hover:opacity-100 transition-colors  cursor-pointer ${activeItem == "Home" && "opacity-100" }`}>Home</p>
        <p className={`text-white opacity-55 hover:opacity-100 transition-colors  cursor-pointer ${activeItem == "Community" && "opacity-100" }`}>Community</p>
        <p className={`text-white opacity-55 hover:opacity-100 transition-colors  cursor-pointer ${activeItem == "Profile" && "opacity-100" }`}>Profile</p>
      </div>
      <div className="flex gap-4 ">
        <Button className="flex gap-4 font-bold "><MdWallet /> Login</Button>
        <Button className="flex gap-4 font-bold bg-grayBackground text-white hover:text-black hover:bg-white transition-colors duration-600"><FaBagShopping /></Button>
      </div>
    </div>
  </>)
}
