import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import EthInput from "./EthInput";


export default function NftForm() {
  return (
    <>
      <form className="flex flex-col gap-4 dark">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-white font-semibold">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-white font-semibold">
            Description
          </Label>
          <Input
            type="text"
            id="description"
            placeholder="Description"
            className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white " />
        </div>
        <div>
          <EthInput />
        </div>
        <div>
          <Button className="bg-white text-black font-semibold">Create</Button>
        </div>
      </form>
    </>
  );
}
