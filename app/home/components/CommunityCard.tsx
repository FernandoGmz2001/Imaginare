import { MdVerified } from "react-icons/md";

export default function CommunityCard({ url, author, title } : { url?: string, author?: string, title?: string }) {
  return (
    <div className="relative border-1 border-white rounded-xl h-[400px] overflow-hidden group cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url('${url}')` }}
      />
      <div className="relative flex items-start flex-col justify-end text-white px-6 py-4 w-full h-full bg-gradient-to-b from-black/0 via-black/0 to-black/60 transition-opacity duration-500">
        <p className="text-small-text flex gap-2 items-center"><span className="text-red-500"><MdVerified /></span>{author}</p>
        <p className="font-bold text-normal-text">{title}</p>
      </div>
    </div>
  );
}