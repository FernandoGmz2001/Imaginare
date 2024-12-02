"use client";
import { Button } from "@/components/ui/button";
import { FaBagShopping } from "react-icons/fa6";
import { MdWallet } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Navbar({
  activeItem,
  hasBackground = true,
}: {
  activeItem?: string;
  hasBackground?: boolean;
}) {
  const router = useRouter();

  const handleNavigation = (path: string, sectionId?: string) => {
    router.push(path);
    // Esperar un pequeño tiempo para asegurar que la navegación ha terminado
    setTimeout(() => {
      if (sectionId) {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Ajusta este tiempo si es necesario
  };

  const onLoginSubmit = () => {
    router.push("/login")
  }

  return (
    <>
      <div
        className={`flex justify-between items-center w-full dark py-4  sticky top-0 z-50   ${
          hasBackground
            ? "bg-background bg-opacity-95 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div>
          <p
            className="text-[24px] font-bold text-white cursor-pointer"
            onClick={() => router.push("/")}
          >
            Imaginare
          </p>
        </div>
        <div className="flex gap-6  text-bold-text">
          <p
            className={`text-white  hover:opacity-100 transition-colors  cursor-pointer ${
              activeItem == "Home" ? "opacity-100" : "opacity-55"
            }`}
            onClick={() => router.push("/home")}
          >
            Home
          </p>
          <p
            className={`text-white  hover:opacity-100 transition-colors  cursor-pointer ${
              activeItem == "Profile" ? "opacity-100" : "opacity-55"
            }`}
            onClick={() => router.push("/profile")}
          >
            Profile
          </p>
          <p
            className={`text-white  hover:opacity-100 transition-colors  cursor-pointer ${
              activeItem == "Create" ? "opacity-100" : "opacity-55"
            }`}
            onClick={() => router.push("/create")}
          >
            Create
          </p>
        </div>
        <div className="flex gap-4 ">
          <Button className="flex gap-4 font-bold " onClick={onLoginSubmit}>
            <MdWallet /> Login
          </Button>
          <Button className="flex gap-4 font-bold bg-grayBackground text-white hover:text-black hover:bg-white transition-colors duration-600">
            <FaBagShopping />
          </Button>
        </div>
      </div>
    </>
  );
}
