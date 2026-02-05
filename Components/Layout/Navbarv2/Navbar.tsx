"use client";

import React, { useRef, useState } from "react";
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
import { Squash as Hamburger } from "hamburger-react"; // Using Squash for a cleaner morph
import { cn } from "@/lib/utils";
import Link from "next/link";

const MENU_ITEMS = [
  { label: "Home", image: "/images/hero_photo.png", href:"/", info: "Welcome home" },
  { label: "About", image: "/images/about.png", href:"/about", info: "About us" },
  { label: "Collection", image: "/images/collection.png",href:"/collection", info: "Our Collection" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  /* ---------------- ANIMATION LOGIC ---------------- */
  useGSAP(() => {
    if (!overlayRef.current || !glowRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

    if (open) {
      // Open Overlay
      tl.to(overlayRef.current, { 
        y: "0%", 
        duration: 0.8, 
        pointerEvents: "auto" 
      })
      // Animate Blue Glow
      .fromTo(glowRef.current,
        { opacity: 0, scaleY: 0.5 },
        { opacity: 1, scaleY: 1.4, duration: 0.4 },
        "-=0.4"
      )
      .to(glowRef.current, { opacity: 0, duration: 0.6 })
      .from(".menu-item-link", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3");

    } else {
      tl.to(overlayRef.current, { 
        y: "-100%", 
        duration: 0.8, 
        pointerEvents: "none" 
      });
    }

    return () => tl.kill();
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 transition-colors duration-500">
        <div className="relative flex items-center px-6 py-4 md:px-12">
          
          {/* LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <Image
              src="/images/logo/Logo_Light.svg"
              alt="KAN Cosmetics"
              width={160}
              height={200}
              className="h-8 md:h-12 w-auto"
            />
          </div>

          <div className="ml-auto relative z-110">
            <button
              onClick={() => setOpen(!open)}
              className={cn(
                "flex items-center justify-center  transition-all duration-300",
                open ? "bg-white text-black scale-90" : "bg-black text-white"
              )}
            >
              <Hamburger toggled={open} size={24} />
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-90 bg-[#141c35]/80 backdrop-blur-2xl -translate-y-full will-change-transform"
      >
        <div className="flex flex-col md:flex-row h-full px-6 md:px-20 pt-32 pb-10">
          <HoverSlider className="flex flex-col md:flex-row w-full h-full gap-10">
            
            <div ref={menuItemsRef} className="flex flex-col justify-center gap-6 md:w-1/3">
              {MENU_ITEMS.map((item, index) => (
                <Link onClick={() => setOpen(!open)} key={item.label} href={item.href} className="menu-item-link">
                  <TextStaggerHover
                    index={index}
                    className="cursor-pointer text-5xl md:text-7xl font-bold  tracking-tighter text-white font-saolDisplay "
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

            <div className="hidden sm:flex sm:flex-1 flex-col md:flex-row gap-10 items-end">
              <HoverSliderImageWrap className="relative w-full h-[80vh]  overflow-hidden border border-white/10 shadow-2xl">
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
          className="absolute bottom-0 left-0 w-full h-32 bg-blue-500/40 blur-[100px] opacity-0 pointer-events-none"
        />
      </div>
    </>
  );
};

export default Navbar;