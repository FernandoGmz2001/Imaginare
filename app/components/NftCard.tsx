'use client'
import { MdVerified } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

type CommunityCardProps = {
  id?: number;
  url?: string;
  author?: string;
  title?: string;
  price?: string;
  actions?: boolean;
  onExchange?: ()=> void;
};

export default function CommunityCard({
  id,
  url,
  author,
  title,
  price,
  actions = true,
  onExchange,
}: CommunityCardProps) {

  return (
    <div className="relative border-1 border-white rounded-xl h-[400px] overflow-hidden group cursor-pointer">
      {actions && (
        <div className="absolute right-1 text-white top-4 z-10 dark">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HiDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onExchange}>
                <FaExchangeAlt />
                Exchange
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MdDelete />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${url})` }}
      />
      <div className="relative flex items-start flex-col justify-end text-white px-6 py-4 w-full h-full bg-gradient-to-b from-black/0 via-black/0 to-black/60 transition-opacity duration-500">
        <p className="text-small-text flex gap-2 items-center">
          <span className="text-red-500">
            <MdVerified />
          </span>
          {author}
        </p>
        <p className="font-bold text-normal-text">{title}</p>
        {price && <p className="text-white text-normal-text">{price}</p>}
      </div>
    </div>
  );
}
