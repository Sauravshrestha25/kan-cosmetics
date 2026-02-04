"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MenuToggleIcon } from "@/Components/ui/menu-toggle-icon";
import { useGSAP } from "@gsap/react";

const menuItems = [
  { label: "Home", image: "/images/menu/home.jpg" },
  { label: "About", image: "/images/menu/about.jpg" },
  { label: "Products", image: "/images/menu/products.jpg" },
  { label: "Contact", image: "/images/menu/contact.jpg" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null); // <-- separate ref for glow
  const imageRefs = useRef<HTMLImageElement[]>([]);

  /* ---------------- OVERLAY + BLUE LIGHT ANIMATION ---------------- */
  useGSAP(() => {
    if (!overlayRef.current || !glowRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    if (open) {
      // Slide overlay down + show blue glow
      tl.to(overlayRef.current, {
        y: "0%",
        duration: 0.8,
        pointerEvents: "auto",
      })
        .fromTo(
          glowRef.current,
          { opacity: 0, scaleY: 0.5 },
          { opacity: 1, scaleY: 1.4, duration: 0.4 },
          "-=0.5"
        )
        .to(glowRef.current, { opacity: 0, duration: 0.6 });
    } else {
      // Hide overlay
      tl.to(overlayRef.current, {
        y: "-100%",
        duration: 0.8,
        pointerEvents: "none",
      });
    }

    return () => tl.kill();
  }, [open]);

  /* ---------------- IMAGE HOVER ---------------- */
  const showImage = (index: number) => {
    if (window.innerWidth < 768) return;

    gsap.to(imageRefs.current.filter(Boolean), {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(imageRefs.current[index], {
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

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
            className="ml-auto z-50  bg-black/40 text-white"
          >
            <MenuToggleIcon open={open} className="size-8 md:size-10" duration={500} />
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className="
          fixed inset-0 z-40
          bg-[url('/images/texture_background.jpg')]
          bg-cover bg-center
          translate-y-full
        "
      >
        <div className="flex flex-col mt-20 md:mt-0 md:flex-row h-full px-6 md:px-20">

          {/* LINKS */}
          <div className="flex flex-col justify-center items-center md:items-start gap-8 md:gap-10 md:w-1/2">
            {menuItems.map((item, i) => (
              <p
                key={item.label}
                onMouseEnter={() => showImage(i)}
                className="
                  text-4xl md:text-6xl
                  font-saolDisplay uppercase tracking-widest
                  cursor-pointer text-white
                  transition-opacity hover:opacity-80
                "
              >
                {item.label}
              </p>
            ))}
          </div>

          {/* HOVER IMAGES */}
          <div className="hidden md:block md:w-1/2 relative">
            {menuItems.map((item, i) => (
              <Image
                key={item.label}
                src={item.image}
                alt={item.label}
                fill
                priority={i === 0}
                className="absolute object-cover opacity-0"
                ref={(el) => {
                  if (el) imageRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* BLUE LIGHT GLOW */}
        <div
          ref={glowRef} // <-- now safely separate
          className="
            absolute bottom-0 left-0 w-full h-24
            bg-blue-500/60
            blur-3xl
            opacity-0
            pointer-events-none
          "
        />
      </div>
    </>
  );
};

export default Navbar;
