"use client";
import React from "react";
import AboutPhotocard from "./AboutPhotocard"
import PremiumButton from "@/Components/ui/ArrowBtn"
import { motion } from "framer-motion"

const AboutHero = () => {
  return (
    <section id="about" className="relative min-h-screen  overflow-hidden">
      <div className="absolute bg-[url('/images/texture_background.jpg')] bg-cover inset-0 -z-10 "></div>
      <div className="flex flex-col  py-2   mx-auto ">
        
        <div className="hidden md:flex justify-center lg:justify-start  mb-10 lg:-mb-10 z-20">
          <AboutPhotocard 
            imageUrl="/images/IMG_1090.PNG" 
            width={260} 
            height={500} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12  items-center">
          <div className="flex flex-col items-center lg:items-center lg:col-span-9 text-center">
             <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="uppercase tracking-[0.3em] text-sm sm:text-md mb-6 text-neutral-200 font-bold"
        >
          ABOUT US
        </motion.span>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl leading-[1.1] md:leading-[0.9] text-white/90 font-medium">
              <span className="italic font-light text-neutral-400">Exquisite</span> beauty <br className="hidden lg:block" />
              starts with an <br className="hidden lg:block" />
              <span className="italic font-light text-neutral-400">exceptional</span> canvas.
            </h1>
          </div>

          <div className="hidden lg:flex lg:col-span-3 justify-end self-center">
            <AboutPhotocard 
              imageUrl="/images/IMG_1501.PNG" 
              width={340} 
              height={300} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16 items-center">
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
              className="bg-black text-white hover:bg-[#141c35] transition-all scale-110 md:scale-125"
            />
          </div>

          <div className="flex lg:hidden justify-center">
            <AboutPhotocard 
              imageUrl="/images/IMG_1501.PNG" 
              width={340} 
              height={400} 
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutHero