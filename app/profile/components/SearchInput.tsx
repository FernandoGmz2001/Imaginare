// Dependencies: pnpm install lucide-react

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Mic, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Input27() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inputValue]);

  return (
    <div className="space-y-2 text-white w-4/12">
      <div className="relative">
        <Input
          id="input-27"
          className="peer pe-9 ps-9 bg-grayBackground"
          placeholder="Search..."
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              role="presentation"
            />
          ) : (
            <Search size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
