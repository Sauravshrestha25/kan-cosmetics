"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaGreaterThan } from "react-icons/fa";
import Testimonial from "../Testimonial/Testimonial";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "My skin has never felt this confident. From the very first use, I could see and feel the difference—smoother texture, a healthy glow, and a finish that looks effortlessly natural all day long.",
    author: "Sarah Chen",
    image: "/images/Testimonials/model2.jpg",
  },
  {
    id: 2,
    quote:
      "Every product feels intentional, luxurious, and incredibly gentle on the skin. It has completely elevated my daily routine into something that feels calm, refined, and truly indulgent.",
    author: "Martha Grey",
    image: "/images/Testimonials/after.jpg",
  },
  {
    id: 3,
    quote:
      "The finish is flawless yet natural, enhancing my features without ever feeling heavy or overdone. It’s the kind of makeup that makes you feel confident without announcing itself.",
    author: "Elena Voss",
    image: "/images/Testimonials/3.png",
  },
  {
    id: 4,
    quote:
      "I love how lightweight the makeup feels while still being incredibly long-lasting. It stays fresh and comfortable throughout the day, even during long hours and busy moments.",
    author: "Ava Laurent",
    image: "/images/Testimonials/2.png",
  },
  {
    id: 5,
    quote:
      "This brand truly understands modern beauty—clean formulations, elegant finishes, and a sense of confidence that feels authentic. It’s beauty that enhances, not overwhelms.",
    author: "Sabrina Vox",
    image: "/images/Testimonials/2.png",
  },
];

const Testimonials2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex, isMobile]);

  // if (isMobile === null) return null;

  // if (isMobile) {
  //   return (
  //     <div className="w-full">
  //       <div className="flex flex-col items-center justify-center pt-12">
  //         <h2 className="text-6xl font-theseasons leading-tight">Confidence</h2>
  //         <p className="italic text-neutral-400 font-light text-2xl  ">
  //           In their own words
  //         </p>
  //       </div>
  //       <Testimonial />
  //     </div>
  //   );
  // }

  return (
  <section className="min-h-screen w-full flex flex-col text-[#2b3962] bg-white overflow-hidden px-4 sm:px-12 py-10">
  <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between gap-10 lg:gap-20">
    
    {/* Quotes */}
    <div className="flex flex-col justify-center max-w-4xl w-full text-center md:text-left">
      
      <div className="flex flex-col items-center md:items-start justify-center mb-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-theseasons leading-tight">
          Confidence
        </h2>
        <p className="italic text-neutral-400 font-light text-2xl sm:text-3xl lg:text-5xl">
          In their own words
        </p>
      </div>

      <div
        key={activeIndex}
        className="transition-all duration-700 ease-out"
      >
        <h3 className="text-lg sm:text-xl lg:text-2xl sm:border sm:p-4 font-montserrat mb-6 leading-relaxed text-[#141c35]">
          {testimonials[activeIndex].quote}
        </h3>
{/* 
        <p className="text-sm sm:text-base font-montserrat flex items-center justify-center md:justify-start gap-3 text-[#141c35]">
          <span className="h-0.5 w-8 bg-[#141c35]" />
          {testimonials[activeIndex].author}
        </p> */}
      </div>
    </div>

    <div className="w-full md:w-1/2 h-[55vh] sm:h-[65vh] lg:h-[80vh] relative bg-neutral-200">
      <Image
        key={activeIndex}
        src={testimonials[activeIndex].image}
        alt={testimonials[activeIndex].author}
        fill
        priority
        className="object-cover transition-opacity duration-700"
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 flex items-center gap-4 bg-black/20 backdrop-blur-md p-3 sm:p-4 max-w-xs shadow-2xl">
        
        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev === 0 ? testimonials.length - 1 : prev - 1
            )
          }
          className="p-2  text-white border hover:bg-black transition"
        >
          <ChevronLeft className=" text-xs" />
        </button>

        <p className="flex-1 text-center text-sm sm:text-lg text-white font-semibold whitespace-nowrap">
          {testimonials[activeIndex].author}
        </p>

        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev === testimonials.length - 1 ? 0 : prev + 1
            )
          }
          className="p-2  text-white border hover:bg-black transition"
        >
          <ChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  </div>
</section>

  );
};

export default Testimonials2;
