"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  desc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, desc }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const shrinkTo = isMobile ? "68%" : "74%";
      const descHeight = isMobile ? "38%" : "31%";

      if (hovered) {
        gsap.to(imageRef.current, {
          height: shrinkTo,
          y: isMobile ? -6 : -10,
          duration: 0.7,
          ease: "expo.out",
        });
        gsap.to(descRef.current, {
          y: 0,
          opacity: 1,
          height: descHeight,
          duration: 0.7,
          ease: "expo.out",
        });
        gsap.to(glowRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "expo.out",
        });
      } else {
        gsap.to(imageRef.current, {
          height: "100%",
          y: 0,
          duration: 0.7,
          ease: "expo.out",
        });
        gsap.to(descRef.current, {
          y: "100%",
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
        });
        gsap.to(glowRef.current, {
          opacity: 0,
          scale: 0.92,
          duration: 0.7,
          ease: "expo.out",
        });
      }
    },
    { scope: containerRef, dependencies: [hovered] },
  );

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="kan-surface-card group relative h-full w-full overflow-hidden"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-x-[16%] top-[10%] h-36 rounded-full border  border-zinc-900 blur-3xl opacity-0 scale-[0.92]"
      />

      <div
        ref={imageRef}
        className="relative h-full w-full overflow-hidden transition-colors duration-500"
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain p-6 md:p-10 scale-[0.82] transition-transform duration-700 group-hover:scale-[0.86]"
          priority
        />
      </div>

      <div
        ref={descRef}
        className="absolute bottom-0 left-0 z-10 flex w-full translate-y-full flex-col justify-between bg-white/96 px-6 py-6 text-[#22305f] backdrop-blur-sm md:px-8 md:py-7"
      >
        <p className="font-matter text-[0.7rem] uppercase tracking-[0.24em] text-[#7a6f68] md:text-[0.74rem]">
          {desc}
        </p>
        <h3 className="mt-3 font-theseasons text-[1.85rem] font-semibold leading-[0.95] tracking-[-0.05em] text-[#141c35] md:text-[2.35rem] lg:text-[2.7rem]">
          {name}
        </h3>

        <div className="mt-5 flex flex-col items-center gap-3 font-matter text-sm font-semibold md:text-[0.95rem] sm:flex-row">
          <Button
            type="button"
            variant="kanSecondary"
            size="kan"
            className="w-full rounded-none"
          >
            VIEW PRODUCT
          </Button>
          <Button asChild variant="kanPrimary" size="kan" className="w-full rounded-none">
            <Link href="/collection">ADD TO CART</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
