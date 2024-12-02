import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
  isInvalid?: boolean;
  placeholder: string;
  type?: string;
  afterInputText?: string;
  hint?: string;
}

// Usamos forwardRef para manejar refs
const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      isInvalid = false,
      placeholder,
      type = "text",
      afterInputText,
      hint,
      ...rest
    },
    ref // Recibimos la ref del padre
  ) => {

    return (
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor={rest.id || rest.name} className={`text-white ${isInvalid ? "text-red-500" : ""}`}>
          {label}
        </Label>
        <div className="flex">
          <Input
            ref={ref} // Pasamos la ref al Input
            id={rest.id || rest.name}
            className="bg-grayBackground text-gray-placeholder placeholder:font-semibold text-white "
            type={type}
            placeholder={placeholder}
            {...rest}
          />
          {afterInputText && (
            <span className="z-10 inline-flex border-blue-gray text-white w-3/6 items-center rounded-e-lg border-input bg-[#1A1D26] px-3 text-sm text-muted-foreground">
              <p className="text-white">{afterInputText}</p>
            </span>
          )}
        </div>
        {isInvalid && <p className="text-sm text-red-500">{errorMessage}</p>}
        {hint && <p className="text-sm mb-2 text-placeholder">{hint}</p>}
      </div>
    );
  }
);

export default CustomInput;
