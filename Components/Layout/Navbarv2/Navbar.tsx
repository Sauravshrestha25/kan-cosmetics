"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HoverSlider, TextStaggerHover, HoverSliderImage } from "@/Components/ui/animated-slideshow";
import { div } from "framer-motion/client";

const MENU_ITEMS = [
  { label: "Home", imageUrl:'/images/home.png', href: "/" },
  { label: "About", imageUrl:'/images/about.png',href: "/about" },
  { label: "Collections",imageUrl:'/images/collection.png', href: "/collections" },
  { label: "Journal",imageUrl:'/images/journal.png', href: "/journal" },
  { label: "Tips",imageUrl:'/images/tips.png', href: "/tips" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!overlayRef.current || !glowRef.current) return;

    gsap.set(overlayRef.current, {
      y: "-100%",
      pointerEvents: "none",
    });

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
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    open ? tlRef.current.play() : tlRef.current.reverse();
  }, [open]);

  return (
    <>
      {/* TOP NAV */}
      <nav className="fixed w-full z-110">
          
        <div className="relative flex items-center justify-between px-4 py-4 md:px-12">
          <Image
            src="/images/Logo/Logo_Latest.svg"
            alt="KAN Cosmetics"
            width={100}
            height={80}
            className="h-6 md:h-8 w-auto pointer-events-auto"
          />

          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "relative z-120 flex items-center transition-all duration-300",
              !open
                ? "bg-[#2b3962] text-white scale-90"
                : "bg-white text-[#2b3962]"
            )}
          >
            <Hamburger toggled={open} size={24} />
            <span className="hidden sm:flex sm:pr-2 sm:text-lg font-montserrat">
              MENU
            </span>
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
   <HoverSlider>
  <div
    ref={overlayRef}
    className="fixed inset-0 z-90 bg-[#141c35]/70 backdrop-blur-lg will-change-transform"
  >
    {/* Image Layer: absolute behind text */}
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {MENU_ITEMS.map((item, index) => (
        <HoverSliderImage
          key={index}
          index={index}
          imageUrl={item.imageUrl}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}
    </div>

    {/* Menu Layer: relative to overlay */}
    <div className="relative flex  h-full px-6 md:px-20 pt-32 pb-10 z-10">
      <div className="flex flex-col justify-center gap-6">
        {MENU_ITEMS.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className="menu-item-link relative"
          >
            <TextStaggerHover
              index={index}
              className="cursor-pointer text-5xl uppercase font-bold tracking-tighter text-white font-theseasons"
              text={item.label}
            />
          </Link>
        ))}
        <div>
          {MENU_ITEMS.map((slide,index) => (
            <div key={index} className="">
              <HoverSliderImage
              index={index}
              imageUrl={slide.imageUrl}
              src={slide.imageUrl}
              alt={slide.label}
              className="size-full max-h-96 object-cover"
              loading="eager"
              decoding="async"

              />
            </div>
          ))}
        </div>

        {/* Social & Contact */}
        <div className="flex gap-6 mt-12 text-white/70 text-xl menu-item-link z-10">
          <FaFacebookF />
          <FaInstagram />
          <FaTwitter />
        </div>

        <div className="mt-6 text-white/50 text-sm tracking-widest font-light space-y-1 menu-item-link z-10">
          <Link href="mailto:contact@koreaandnepal.com">
            contact@koreaandnepal.com
          </Link>
          <Link href="tel:+9779876543210">+977-9876543210</Link>
        </div>
      </div>

      {/* Glow */}
      <div
        ref={glowRef}
        className="absolute bottom-0 left-0 w-full h-32 bg-blue-500/30 blur-[100px] opacity-0 pointer-events-none"
      />
    </div>
  </div>
</HoverSlider>


      
    </>
  );
};

export default Navbar;
