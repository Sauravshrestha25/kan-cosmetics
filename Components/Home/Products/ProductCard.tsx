"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  desc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, desc }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  useGSAP(() => {
    // Check if we are on desktop for different squish ratios
    const isMobile = window.innerWidth < 768;
    const shrinkTo = isMobile ? "65%" : "75%"; 
    const descHeight = isMobile ? "35%" : "25%";

    if (hovered) {
      gsap.to(imageRef.current, {
        height: shrinkTo,
        duration: 0.6,
        ease: "expo.out",
      });
      gsap.to(descRef.current, {
        y: 0,
        opacity: 1,
        height: descHeight,
        duration: 0.6,
        ease: "expo.out",
      });
    } else {
      gsap.to(imageRef.current, {
        height: "100%",
        duration: 0.6,
        ease: "expo.out",
      });
      gsap.to(descRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.6,
        ease: "expo.out",
      });
    }
  }, { scope: containerRef, dependencies: [hovered] });

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full h-140 md:h-180 lg:h-220 overflow-hidden bg-white"
    >
      {/* IMAGE CONTAINER */}
      <div 
        ref={imageRef} 
        className="relative w-full h-full overflow-hidden transition-colors duration-500"
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain p-4 md:p-8" 
          priority
        />
      </div>

      {/* DESCRIPTION */}
      <div
        ref={descRef}
        className="absolute bottom-0 left-0 w-full bg-[#141c35] text-white px-6 py-6 md:px-10 md:py-8 flex flex-col justify-center translate-y-full z-10"
      >
        <p className="text-gray-400 uppercase text-xs md:text-sm tracking-[0.2em] mb-2">
          {desc}
        </p>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
          {name}
        </h3>
        <button className="w-fit border-b-2 border-white pb-1 text-sm md:text-base font-medium hover:text-[#F2E689] hover:border-[#F2E689] transition-colors">
          VIEW PRODUCT
        </button>
      </div>
    </div>
  );
};

export default ProductCard;