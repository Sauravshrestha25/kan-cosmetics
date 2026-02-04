"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import gsap from "gsap";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  desc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, desc }) => {

  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {

    if (hovered) {
      gsap.to("#product-details", {
        yPercent: 0,
        duration: 0.6,
        display: "block",
        ease: "expo.out",
      })

    } else {

      gsap.to("#product-details", {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    };
  }, [hovered])


  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="bg-white shadow-sm  overflow-hidden  transition-transform cursor-pointer w-full h-screen ">
      <div className="h-full">
        <Image
          id="image"
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className="relative w-full h-full object-contain"
        />
        <div className="absolute w-100 h-1 bg-black "></div>
      </div>
      <div id="product-details" className={` ${hovered ? "flex flex-col items-start gap-8 px-4 pt-8 bg-[#141c35] hover:bg-gray-100 text-white hover:text-black h-full" : "hidden"}`}>
        <p className="text-gray-400 uppercase text-sm tracking-widest mb-4">
          {desc}
        </p>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <button className="  font-matter cursor-pointer  hover:underline transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
