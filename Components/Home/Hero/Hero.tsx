"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Topbar from "@/Components/Layout/Topbar/Topbar";
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
      .to("#welcome", { y: -10, opacity: 0 })
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
      .to("#welcome", { y: -10, opacity: 0 })
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
      className="relative font-saolDisplay min-h-screen w-full overflow-hidden bg-[url('/images/texture_background.jpg')] bg-cover text-white/80"
    >
      <div id="topbar" className="absolute top-0 left-0 w-full z-50">
        <Topbar />
      </div>
      <div
        id="hero-video"
        className="absolute inset-0 z-10 w-full h-full overflow-hidden mx-auto shadow-2xl"
      >
        <video
          src="/video/hero_video.mp4"
          playsInline
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 z-20" />
      </div>
      <div
        id="hero-titles"
        className="relative z-30 flex flex-col items-center pt-40  min-h-screen px-4 text-center"
      >
        <div className="flex flex-col gap-6 items-center   tracking-widest w-full">
          <p id="welcome" className="uppercase text-lg md:text-2xl tracking-[0.2em]">
            Welcome
          </p>

          <div id="hero-motto" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight flex flex-col items-center">
            <p className="block">
              <span className="italic">Craft</span> beauty that lasts
            </p>
            <p className="block">
              beyond <span className="italic">trends</span>
            </p>
          </div>

          <div id="continue-btn">
            <PremiumButton text="continue" onClick={handleClick} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;