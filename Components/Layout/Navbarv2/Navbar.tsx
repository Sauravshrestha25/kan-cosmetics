"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/Components/ui/animated-slideshow";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react"; 
import { cn } from "@/lib/utils";
import Link from "next/link";

const MENU_ITEMS = [
  { label: "Home", image: "/images/hero_photo.png", href:"/", info: "Welcome home" },
  { label: "About", image: "/images/about.png", href:"/", info: "About us" },
  { label: "Collections", image: "/images/collection.png",href:"/", info: "Our Collections" },
  { label: "Journal", image: "/images/journal.png",href:"/", info: "Our Journal" },
  { label: "Tips", image: "/images/tips.png",href:"/", info: "Our Tips" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

 const tlRef = React.useRef<gsap.core.Timeline | null>(null);

useGSAP(() => {
  if (!overlayRef.current || !glowRef.current) return;

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "expo.inOut" },
  });

  tl.to(overlayRef.current, {
    y: "0%",
    duration: 0.8,
    pointerEvents: "auto",
  })
    .fromTo(
      glowRef.current,
      { opacity: 0, scaleY: 0.5 },
      { opacity: 1, scaleY: 1.4, duration: 0.4 },
      "-=0.4"
    )
    .to(glowRef.current, { opacity: 0, duration: 0.6 })
    .from(
      ".menu-item-link",
      {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.3"
    );

  tlRef.current = tl;
}, { scope: overlayRef });

useEffect(() => {
  if (!tlRef.current) return;

  if (open) {
    tlRef.current.play();
  } else {
    tlRef.current.reverse();
  }
}, [open]);


  return (
    <>
      <nav className="fixed w-full  z-100 transition-colors duration-500">
        <div className="relative flex items-center justify-between px-4 py-4 md:px-12">
          
          {/* LOGO */}
          <div className=" pointer-events-auto">
            <Image
              src="/images/Logo/Logo_Latest.svg"
              alt="KAN Cosmetics"
              width={100}
              height={80}
              className="h-6 md:h-8 w-auto "
            />
          </div>

          <div className="ml-auto relative z-110">
            <button
              onClick={() => setOpen(!open)}
              className={cn(
                "flex items-center justify-center  transition-all duration-300",
                !open ? "bg-[#2b3962] text-white scale-90" : "text-[#2b3962] bg-white"
              )}
            >
              <Hamburger toggled={open} size={24} /><span className="hidden sm:flex sm:pr-2 font-montserrat sm:text-lg">MENU</span>
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-90 bg-[#141c35]/70 backdrop-blur-lg -translate-y-full will-change-transform"
      >
        <div className="flex flex-col md:flex-row h-full px-6 md:px-20 pt-32 pb-10">
          <HoverSlider className="flex flex-col md:flex-row w-full h-full gap-10">
            
            <div ref={menuItemsRef} className="flex flex-col justify-center gap-6 md:w-1/3">
              {MENU_ITEMS.map((item, index) => (
                <Link onClick={() => setOpen(!open)} key={item.label} href={item.href} className="menu-item-link">
                  <TextStaggerHover
                    index={index}
                    className="cursor-pointer text-5xl uppercase  font-bold  tracking-tighter text-white font-theseasons "
                    text={item.label}
                  />
                 
                </Link>
                
              ))}
                 

              <div className="flex gap-6 mt-12 text-white/70 text-xl menu-item-link">
                <FaFacebookF className="cursor-pointer hover:text-white transition" />
                <FaInstagram className="cursor-pointer hover:text-white transition" />
                <FaTwitter className="cursor-pointer hover:text-white transition" />
              </div>
              <div className="text-white/50 font-montserrat text-sm space-y-1 mb-4 flex flex-col  tracking-widest font-light">
                <Link href="mailto:contact@koreaandnepal.com" className="hover:text-white cursor-pointer transition">contact@koreaandnepal.com</Link>
                <Link href="tel:+977876543210" className="hover:text-white cursor-pointer transition">+977-9876543210</Link>
              </div>
            </div>

            <div className="hidden sm:flex sm:flex-1 flex-col items-center md:flex-row gap-10 ">
              <HoverSliderImageWrap className="relative w-[40vw] h-[50vh]  overflow-hidden border border-white/10 shadow-2xl">
                {MENU_ITEMS.map((item, index) => (
                  <HoverSliderImage
                    key={item.label}
                    index={index}
                    imageUrl={item.image}
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                ))}
              </HoverSliderImageWrap>
              
             
            </div>
          
          </HoverSlider>
        </div>

        {/* BLUE LIGHT GLOW: Visual flair at the bottom */}
        <div
          ref={glowRef}
          className="absolute bottom-0 left-0 w-full h-32 bg-blue-500/30 blur-[100px] opacity-0 pointer-events-none"
        />
      </div>
    </>
  );
};

export default Navbar;