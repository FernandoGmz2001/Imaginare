'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MdWallet } from "react-icons/md";
import Navbar from './components/Navbar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const constrain = 40;
  const mainRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  const onRedirect = () => {
    router.push("/home");
  };

  const transforms = (x: number, y: number, el: HTMLElement) => {
    const box = el.getBoundingClientRect();
    const calcX = -(y - box.y - box.height / 2) / constrain;
    const calcY = (x - box.x - box.width / 2) / constrain;

    return (
      'perspective(4000px) rotateX(' +
      calcX +
      'deg) rotateY(' +
      calcY +
      'deg)'
    );
  };

  const transformElement = (el: HTMLElement, xyEl: [number, number, HTMLElement]) => {
    el.style.transform = transforms(xyEl[0], xyEl[1], xyEl[2]);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (layerRef.current) {
      const xy: [number, number] = [e.clientX, e.clientY];
      const position: [number, number, HTMLElement] = [...xy, layerRef.current] as [number, number, HTMLElement];

      window.requestAnimationFrame(() => {
        transformElement(layerRef.current!, position);
      });
    }
  };

  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('mousemove', handleMouseMove);

      return () => {
        mainElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <>
      <main className="bg-mainBg min-h-screen flex flex-col px-10" ref={mainRef}>
        <Navbar hasBackground={false}/>
        <div className="flex flex-1 justify-around px-16">
          <div className="w-[50%] flex justify-center flex-col text-left">
            <h2 className=" font-bold text-white text-[76px] w-[13ch]">
              DISCOVER, COLLECT AND SELL{' '}
              <span className="text-gradient bg-gradient-to-r from-[#ff9900] to-[#ff00ee]">
                NFTS
              </span>
            </h2>
            <p className="text-white">
              Explore a world of unique digital assets. Dive into the future of
              art and ownership by discovering, collecting, and trading
              extraordinary NFTs. Join our community today and unlock endless
              possibilities.
            </p>
            <div className="mt-4">
              <Button className="bg-gradient-to-r from-[#ff9900] to-[#ff00ee] px-6 py-6 transition-all duration-200 scale-100 hover:scale-110" onClick={onRedirect}><MdWallet /> Connect Wallet</Button>
            </div>
          </div>
          <div className="w-[50%] flex items-center justify-center">
            <div
              ref={layerRef}
              className="w-[500px] h-[500px] rounded-xl bg-cover bg-center bg-no-repeat z-10"
              style={{ backgroundImage: "url('/images/hero-dragon.png')" }}
            >
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

