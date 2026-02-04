"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MenuToggleIcon } from "@/Components/ui/menu-toggle-icon";
import { useGSAP } from "@gsap/react";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/Components/ui/animated-slideshow";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const MENU_ITEMS = [
  { label: "Home", image: "/images/menu/home.jpg", info: "Welcome home" },
  { label: "About", image: "/images/menu/about.jpg", info: "About us" },
  { label: "Collection", image: "/images/menu/products.jpg", info: "Our products" },
  { label: "Contact", image: "/images/menu/contact.jpg", info: "Get in touch" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* ---------------- OVERLAY + BLUE LIGHT ANIMATION ---------------- */
  useGSAP(() => {
    if (!overlayRef.current || !glowRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    if (open) {
      tl.to(overlayRef.current, { y: "0%", duration: 0.8, pointerEvents: "auto" })
        .fromTo(
          glowRef.current,
          { opacity: 0, scaleY: 0.5 },
          { opacity: 1, scaleY: 1.4, duration: 0.4 },
          "-=0.5"
        )
        .to(glowRef.current, { opacity: 0, duration: 0.6 });
    } else {
      tl.to(overlayRef.current, { y: "-100%", duration: 0.8, pointerEvents: "none" });
    }

    return () => tl.kill();
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="relative flex items-center px-4 py-3">
          {/* LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/new_logo.png"
              alt="KAN Cosmetics"
              width={160}
              height={200}
              className="h-6 md:h-12 w-auto"
            />
          </div>

          {/* MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto z-50 bg-black/40 text-white p-2 rounded"
          >
            <MenuToggleIcon open={open} className="size-8 md:size-10" duration={500} />
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-2xl translate-y-full"
      >
        <div className="flex flex-col md:flex-row h-full px-6 md:px-20 mt-20 md:mt-0">
          {/* HOVER SLIDER WRAP */}
          <HoverSlider className="flex flex-col md:flex-row w-full h-full gap-10">
            {/* LEFT: Menu + Social */}
            <div className="flex flex-col justify-center gap-8 md:w-1/3">
              {MENU_ITEMS.map((item, index) => (
                <TextStaggerHover
                  key={item.label}
                  index={index}
                  className="cursor-pointer text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white font-saolDisplay"
                  text={item.label}
                />
              ))}

              {/* Social icons */}
              <div className="flex gap-4 mt-12 text-white text-lg">
                <FaFacebookF className="cursor-pointer hover:text-blue-500 transition" />
                <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
                <FaTwitter className="cursor-pointer hover:text-blue-400 transition" />
              </div>
            </div>

            {/* RIGHT: Images + Info */}
            <div className="flex-1 flex flex-col md:flex-row gap-6">
              {/* Hover images */}
              <HoverSliderImageWrap className="relative w-full md:w-2/3 h-96 md:h-125 flex-1">
                {MENU_ITEMS.map((item, index) => (
                  <HoverSliderImage
                    key={item.label}
                    index={index}
                    imageUrl={item.image}
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover absolute opacity-0"
                  />
                ))}
              </HoverSliderImageWrap>

              {/* Info text */}
              <div className="hidden md:flex flex-col md:w-1/3 text-white justify-center">
                {MENU_ITEMS.map((item, index) => (
                  <TextStaggerHover
                    key={`info-${item.label}`}
                    index={index}
                    className="text-xl md:text-2xl"
                    text={item.info}
                  />
                ))}
              </div>
            </div>
          </HoverSlider>
        </div>

        {/* BLUE LIGHT GLOW */}
        <div
          ref={glowRef}
          className="absolute bottom-0 left-0 w-full h-24 bg-blue-500/60 blur-3xl opacity-0 pointer-events-none"
        />
      </div>
    </>
  );
};

export default Navbar;
