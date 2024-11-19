import { Input } from "@/components/ui/input";
import { FaArrowUp } from "react-icons/fa6";
export default function Generator() {
  return (
    <>
      <div className="relative">
        <Input
          placeholder="Input a prompt to create a new nft"
          className="bg-grayBackground rounded-2xl  pe-9"
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full text-white w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
        >
          <FaArrowUp />
        </button>
      </div>
    </>
  );
}
