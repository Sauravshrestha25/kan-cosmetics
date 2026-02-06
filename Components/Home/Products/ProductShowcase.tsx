"use client";

import React from "react";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from "@/Components/ui/carousel";

const products = [
  {
    imageUrl: "/images/IMG_1089.PNG",
    name: "K & A Red",
    desc: "Deep Color. Long Lasting. Bright Red.",
  },
  {
    imageUrl: "/images/foundation_1.svg",
    name: "Foundation",
    desc: "Long Lasting. Smudge Free. Natural.",
  },
   {
    imageUrl: "/images/concealer.png",
    name: "Concealer",
    desc: "Long Lasting. Smudge Free. Natural.",
  },
   {
    imageUrl: "/images/concealer.png",
    name: "Concealer Max",
    desc: "Long Lasting. Smudge Free. Natural.",
  }, {
    imageUrl: "/images/IMG_1293.PNG",
    name: "K & A Dark Red",
    desc: "Deep Color. Long Lasting. Bright Red.",
  },
   {
    imageUrl: "/images/IMG_1135.png",
    name: "K & A Concealer",
    desc: "Long Lasting. Smudge Free. Natural.",
  },
  
];

const ProductShowcase = () => {
  return (
    <section className="font-theseasons w-full min-h-screen py-10 bg-white ">
      {/* <Carousel className="relative mx-auto w-full ">
        <div className="flex flex-col md:flex-row items-center justify-between px-10">
          <h2 className="mb-12  text-4xl text-[#141c35]">
            CURATED FOR YOU
          </h2>
          <CarouselNavigation alwaysShow />
        </div>
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.name} className="w-full md:w-1/2 ">
              <ProductCard
                {...product}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}
         <div className="flex flex-col md:flex-row items-center justify-center px-10 my-10">
          <div className="flex flex-col gap-4 items-center justify-center">
  <h2 className=" font-theseasons text-2xl sm:text-6xl text-[#141c35]">
            THE MODERN LUXE
          </h2>
          <h2 className="font-theseasons text-xl sm:text-4xl text-[#141c35]">
            Curated For You
          </h2>
          </div>
        
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen px-6">
         {products.map((product) => (
            <div key={product.name} className="w-full h-200 border border-gray-100  ">
              <ProductCard
                {...product}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
