import { FaEthereum } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useImageContext } from "../layout";

export default function EthInput() {
  const { imageObj, setImageObj } = useImageContext();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setImageObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="input-16">Price</Label>
      <div className="relative flex rounded-lg shadow-sm shadow-black/5">
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground">
          <FaEthereum />
        </span>
        <Input
          id="input-16"
          name="price"
          className="pl-10 rounded-e-none shadow-none bg-grayBackground"
          placeholder="0.00"
          onChange={handleChange}
        />
        <span className="inline-flex items-center rounded-e-lg border border-input bg-grayPlaceholder text-white px-3 text-sm text-muted-foreground">
          ETH
        </span>
      </div>
    </div>
  );
}

