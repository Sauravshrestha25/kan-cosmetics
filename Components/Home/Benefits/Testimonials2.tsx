"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaGreaterThan } from "react-icons/fa";
import Testimonial from "../Testimonial/Testimonial";
// import Testimonial from "@/components/Testimonial"; // 👈 import later

const testimonials = [
  {
    id: 1,
    quote:
      "My skin has never felt this confident. The quality is visible from the first use.",
    author: "Sarah Chen",
    image: "/images/Testimonials/model2.jpg",
  },
  {
    id: 2,
    quote:
      "Every product feels intentional, luxurious, and gentle. It truly elevated my routine.",
    author: "Martha Grey",
    image: "/images/Testimonials/after.jpg",
  },
  {
    id: 3,
    quote:
      "The finish is flawless and natural. It enhances beauty without overpowering it.",
    author: "Elena Voss",
    image: "/images/Testimonials/3.png",
  },
  {
    id: 4,
    quote:
      "I love how lightweight yet long-lasting the makeup feels. It lasts all day effortlessly.",
    author: "Ava Laurent",
    image: "/images/Testimonials/2.png",
  },
  {
    id: 5,
    quote:
      "This brand understands modern beauty—clean, elegant, and confidence-boosting.",
    author: "Sabrina Vox",
    image: "/images/Testimonials/1.png",
  },
];

const Testimonials2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // ✅ Detect mobile safely
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ Auto rotate testimonials (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex, isMobile]);

  // 🚫 Avoid hydration mismatch
  if (isMobile === null) return null;

  // 📱 Mobile component
  if (isMobile) {
    return (
      <div className="w-full">
        <Testimonial />
      </div>
    );
  }

  // 💻 Desktop component
  return (
    <section className="min-h-screen w-full flex flex-col text-[#2b3962] bg-white overflow-hidden sm:py-8 px-12">
      <div className="flex flex-col items-center justify-center sm:pt-8 mb-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-theseasons leading-tight">
          Confidence
        </h2>
        <p className="italic text-neutral-400 font-light text-3xl sm:text-4xl lg:text-5xl">
          In their own words
        </p>
      </div>

      <div className="w-full flex flex-row-reverse items-center justify-between gap-20">
        {/* Quotes */}
        <div className="space-y-2">
          {testimonials.map((item, i) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveIndex(i)}
              className={`cursor-pointer transition-all px-4 py-2 text-[#141c35] ${
                activeIndex === i
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <h3 className="text-lg sm:text-2xl font-montserrat mb-3">
                {item.quote}
              </h3>

              <p className="text-md font-montserrat flex items-center gap-2">
                <span
                  className={`h-0.5 transition-all ${
                    activeIndex === i
                      ? "w-8 bg-[#141c35]"
                      : "w-4 bg-neutral-400"
                  }`}
                />
                {item.author}
              </p>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="w-3/4 md:w-1/2 h-[80vh] relative bg-neutral-200">
          <Image
            key={activeIndex}
            src={testimonials[activeIndex].image}
            alt={testimonials[activeIndex].author}
            fill
            priority
            className="object-cover transition-opacity duration-700"
          />

          <div className="absolute bottom-6 left-6 flex items-center gap-4 bg-black/20 backdrop-blur-md p-4 max-w-xs shadow-2xl">
            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )
              }
              className="p-3 text-white border hover:bg-black transition"
            >
              <FaGreaterThan className="rotate-180 text-xs" />
            </button>

            <p className="flex-1 text-center text-sm sm:text-2xl text-white font-semibold">
              {testimonials[activeIndex].author}
            </p>

            <button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === testimonials.length - 1 ? 0 : prev + 1
                )
              }
              className="p-3 text-white border hover:bg-black transition"
            >
              <FaGreaterThan className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials2;
