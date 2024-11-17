import Navbar from "../components/Navbar";
import Filters from "./components/Filters";
import Header from "./components/Header";
import MyNfts from "./components/MyNfts";

export default function Profile() {
  return (
    <main className="px-10 ">
      <Navbar hasBackground={false} activeItem="Profile"/>
      <div className="flex items-start mt-[40px] flex-col">
        <Header />
        <div className="flex mt-[40px] gap-4 w-full">
          <MyNfts/>
        </div>
      </div>
    </main>
  );
}
