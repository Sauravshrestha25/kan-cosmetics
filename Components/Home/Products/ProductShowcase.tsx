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
    imageUrl: "/images/concealer.png",
    name: "K & A Concealer",
    desc: "Long Lasting. Smudge Free. Natural.",
  },
   {
    imageUrl: "/images/concealer.png",
    name: "Concealer",
    desc: "Long Lasting. Smudge Free. Natural.",
  },
  
];

const ProductShowcase = () => {
  return (
    <section className="font-saolDisplay w-full min-h-screen pt-20">
      <Carousel className="relative mx-auto w-full ">
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
      </Carousel>
    </section>
  );
};

export default ProductShowcase;
