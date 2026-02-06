"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import PremiumButton from "@/Components/ui/ArrowBtn";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  useGSAP(() => {
    const split = new SplitText("#hero-motto p", {
      type: "lines",
    });

    const introTl = gsap.timeline({
      delay: 0.5,
    });

    introTl
      .from("#hero", { opacity: 0, duration: 1.5 })
      .from("#topbar", { y: -20, opacity: 0, duration: 1 }, "-=1")
      .from("#welcome", { opacity: 0, scale: 1.1, duration: 1.5 }, "-=0.5")
      .from("#hero-motto", { opacity: 0, y: 5, duration: 1.5 }, "-=1")
      .from("#hero-video", {opacity: 0, duration: 1.5}, "-=1.5")

    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "100%",
        scrub: true,
        pin: true,
      },
    })
      .to('#continue-btn', { opacity: 0})
      .to(split.lines, { y: 50, opacity: 0, stagger: 0.05 }, 0)
      .fromTo(
        "#hero-video",
        {
          yPercent: 60,
          width: "90vw", 
        },
        {
          yPercent: 0,
          width: "100vw", 
          scale: 1,
          borderRadius: "0px",
          ease: "none"
        },
        0
      );
  }, []);

  const handleClick = () => {
gsap.timeline()
     .to('#continue-btn', { opacity: 0})
      .fromTo(
        "#hero-video",
        {
          yPercent: 60,
          width: "90vw", 
          duration: 2,
        },
        {
          yPercent: 0,
          width: "100vw", 
          scale: 1,
          borderRadius: "0px",
          ease: "none"
        },
        0
      );
  };

  return (
    <section
      id="hero"
      className="relative font-theseasons min-h-screen w-full h-auto overflow-hidden bg-white mx-auto   text-black"
    >
      
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]  pointer-events-none" />
      <div
        id="hero-video"
        className="absolute inset-0 z-10 w-full h-full overflow-hidden mx-auto shadow-2xl"
      >
        <video
          src="/video/hero_video_2.mp4"
          playsInline
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 -z-20" />
      </div>
      <div
        id="hero-titles"
        className="z-30 flex flex-col items-center pt-20 md:pt-40   min-h-screen px-4 text-center"
      >
        <div className="flex flex-col gap-6 items-center   tracking-widest w-full">
         

          <p id="hero-motto" className=" text-[#2b3962] text-4xl sm:text-6xl  leading-tight flex flex-col items-center">
           High-performance makeup,<br/> crafted for skin that deserves care.
          </p>

          <div id="continue-btn font-matter">
            <PremiumButton text="Explore Shades" onClick={handleClick} className=" text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;