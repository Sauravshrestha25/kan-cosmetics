"use client";
import React from "react";
import AboutPhotocard from "./AboutPhotocard";
import PremiumButton from "@/Components/ui/ArrowBtn";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const AboutHero = () => {
  useGSAP(() => {
  const photos = [".photo-1", ".photo-2", ".photo-3"];
  
  photos.forEach((photo, i) => {
    gsap.to(photo, {
      scrollTrigger: {
        trigger: "#about",
        start: "center 60%", 
        end: "bottom top",  
        scrub: true,       
      },
      y: (i + 1) * -50, 
      ease: "expo.out",
    });
  });
}, []); 

  return (
    <section id="about" className="relative min-h-screen sm:px-12  overflow-hidden">
      <div className="absolute bg-white inset-0 -z-10 "></div>
      <div className="flex flex-col mx-auto ">
        <div className="photo-1 hidden md:flex justify-center pt-8  lg:justify-start mb-10 lg:-mb-10 z-20">
          <AboutPhotocard
            imageUrl="/images/IMG_1090.PNG"
            width={460}
            height={500}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12  items-center">
          <div className="col-span-2" />
          <div className="flex flex-col items-center lg:items-center lg:col-span-8 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-theseasons uppercase tracking-[0.3em] text-sm sm:text-lg mb-6 pt-4 sm:pt-0 text-[#141c35] font-bold"
            >
              ABOUT US
            </motion.span>
            <h1 className="font-theseasons text-4xl sm:text-6xl lg:text-6xl leading-[1.1] md:leading-[0.9] text-[#141c35] font-medium">
              <span className=" ">
                Exquisite
              </span>{" "}
              beauty <br className="hidden lg:block" />
              starts with an <br className="hidden lg:block" />
              <span className="  ">
                exceptional
              </span>{" "}
              canvas.
            </h1>
          </div>

          <div className=" photo-2 hidden  lg:flex lg:col-span-2 justify-end self-center">
            <AboutPhotocard
              imageUrl="/images/IMG_1501.PNG"
              width={340}
              height={300}
            />
          </div>
        </div>

        <div className="photo-3  grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16 items-center">
          <div className="flex justify-center lg:justify-start">
            <AboutPhotocard
              imageUrl="/images/IMG_1296.PNG"
              width={600}
              height={240}
            />
          </div>

          <div className="flex items-center justify-center py-10 lg:py-0">
            <PremiumButton
              text="Discover the Collection"
              className=" scale-110 md:scale-125"
            />
          </div>

          <div className="flex lg:hidden justify-center">
            <AboutPhotocard
              imageUrl="/images/IMG_1501.PNG"
              width={440}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
