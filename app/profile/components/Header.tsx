import { MdContentCopy } from "react-icons/md";
export default function Header(){
  return <>
        <div className="flex gap-4 items-center">
          <div className="bg-gradient-to-br from-red-500  to-blue-500  rounded-full w-[100px] h-[100px]"></div>
          <div className="flex flex-col text-white">
            <p className="text-h3-with-subtitle">Fernando Gomez</p>
            <div className="flex gap-4 items-center text-normal-text">
              <p>0x92d08fd53a8........72760a36A1828cAe6</p>
              <MdContentCopy className="cursor-pointer"/>
            </div>
          </div>
        </div>
  </>
}