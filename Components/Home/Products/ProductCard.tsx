"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
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

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !descRef.current) return;

    const descHeight = descRef.current.offsetHeight;

    const tl = gsap.timeline({ paused: true });
    tl
    .to(imageRef.current, { y: -descHeight, duration: 0.5, ease: "power2.out" })
    .fromTo(descRef,{yPercent: 20},{yPercent:0} )

    containerRef.current.addEventListener("mouseenter", () => tl.play());
    containerRef.current.addEventListener("mouseleave", () => tl.reverse());

    return () => {
      containerRef.current?.removeEventListener("mouseenter", () => tl.play());
      containerRef.current?.removeEventListener("mouseleave", () => tl.reverse());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-pointer overflow-hidden"
    >
      {/* IMAGE */}
      <div ref={imageRef}>
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className="w-full h-200 object-contain"
        />
      </div>

      {/* DESCRIPTION */}
      <div
        ref={descRef}
        className="absolute bottom-0 left-0 w-full bg-[#141c35] text-white px-4 py-4"
      >
        <p className="text-gray-400 uppercase text-sm tracking-widest mb-1">
          {desc}
        </p>
        <h3 className="text-xl font-semibold">{name}</h3>
        <button className="mt-1 font-matter cursor-pointer hover:underline transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
