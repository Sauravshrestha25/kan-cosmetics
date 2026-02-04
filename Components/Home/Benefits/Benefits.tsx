"use client";
import { ImageComparisonSlider } from "@/Components/image-comparison-slider-vertical";
import { motion } from "framer-motion";
import Image from "next/image";


const Benefits = () => {
  const pillars = [
  {
    title: "Provenance",
    desc: "Rare botanicals ethically sourced from pristine, protected micro-climates."
  },
  {
    title: "Formulation",
    desc: "Advanced molecular craftsmanship designed for deep, intelligent skin absorption."
  },
  {
    title: "Responsibility",
    desc: "Consciously crafted with carbon-neutral glass and uncompromising cruelty-free standards."
  }
]


  return (
    <section className="min-h-screen w-full flex flex-col md:flex-row  text-black overflow-hidden">
      
      {/* --- Left Side: Content --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-16 md:py-20 order-2 md:order-1">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="uppercase tracking-[0.3em] text-sm sm:text-md mb-6 text-black font-bold"
        >
          Our Philosophy
        </motion.span>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-soalDisplay mb-10 md:mb-12 leading-tight">
          Crafted for the <br />
          <span className="italic text-neutral-400 font-light text-3xl sm:text-4xl lg:text-5xl">Discerning Canvas.</span>
        </h2>

        <div className="space-y-10 md:space-y-12">
          {pillars.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="max-w-md group"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-3">
                <span className="h-0.5 w-6 bg-black group-hover:w-12 transition-all duration-500" />
                {item.title}
              </h3>
              <p className="text-black text-base sm:text-lg tracking-wide leading-relaxed pl-9">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Right Side: Visuals --- */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative bg-neutral-200 order-1 md:order-2">
        {/* <Image 
          src="/images/model.jpg" 
          alt="k&a model" 
          fill 
          className="object-cover transition-transform duration-1000 hover:scale-105"
          priority
        /> */}
        <ImageComparisonSlider 
          topImage="/images/before.jpg"
          bottomImage="/images/after.jpg"
          altTop="KAN Cosmetics"
          altBottom="KAN Cosmetics"
          className="relative"
        />

        <div className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 bg-white/90 backdrop-blur-md p-6 sm:p-8 max-w-70 sm:max-w-xs shadow-xl border-l-4 border-[#141c35]">
          <p className="text-xs sm:text-lg italic leading-normal text-black font-medium">
            "Smart beauty starts with smart building—we ensure your foundation is as timeless as your style."
          </p>
        </div>
      </div>
      
    </section>
  );
};

export default Benefits;