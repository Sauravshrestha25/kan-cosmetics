"use client";
import { ImageComparisonSlider } from "@/Components/ui/image-comparison-slider-horizontal";
import { motion } from "framer-motion";
import Image from "next/image";

const ImageSlider = () => {
  return (
    <section className="bg-[#141c35] h-screen">
        <ImageComparisonSlider
          leftImage="/images/after_img.png"
          rightImage="/images/before_img.png"
          altLeft="KAN Cosmetics"
          altRight="KAN Cosmetics"
        />
    </section>
  );
};

export default ImageSlider;
