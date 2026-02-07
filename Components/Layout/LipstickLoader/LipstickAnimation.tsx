"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LipstickScene = () => {
  const capRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const mainWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- INITIAL SETUP ---
    // We set a consistent width to prevent the "becoming small" issue
    const LIPSTICK_WIDTH = 120; 

    gsap.to([capRef.current, bodyRef.current], {
  width: 80,   // smaller width
  duration: 0.8,
  ease: "power3.out",
});
    
    gsap.set([capRef.current, bodyRef.current], { 
      position: "fixed", 
      top: "50%", 
      left: "50%", 
      xPercent: -50, 
      yPercent: -50, 
      width: `${LIPSTICK_WIDTH}px`,
      zIndex: 9999,
      pointerEvents: "none"
    });

    // Offset the cap so it sits ON the body, not IN the middle of it
    // Adjust -40% based on your specific SVG height
    gsap.set(capRef.current, { yPercent: -90 }); 
    gsap.set(bodyRef.current, { yPercent: 0 });

    const introTl = gsap.timeline();
    
    // 1. LOADER: Cap detaches further up
    introTl.to(capRef.current, { 
      y: "-=80", 
      duration: 1.5, 
      ease: "power3.inOut", 
      delay: 0.5 
    })
    // 2. MOVE TO HERO: Lands on button, stays at constant size
    .to([capRef.current, bodyRef.current], {
      top: "75%", 
      left: "50%",
      rotate: 20, 
      duration: 1.2,
      ease: "expo.inOut",
    }, "-=0.5");

    // 3. MOUSE FOLLOW (Smooth movement)
    const xTo = gsap.quickTo([capRef.current, bodyRef.current], "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo([capRef.current, bodyRef.current], "y", { duration: 0.8, ease: "power3" });

    const moveLipstick = (e: MouseEvent) => {
      // Check if we are above the final section
      const finalSection = document.querySelector("#comparison-container");
      const rect = finalSection?.getBoundingClientRect();
      
      if (!rect || rect.top > window.innerHeight) {
        const xVal = (e.clientX - window.innerWidth / 2) * 0.15;
        const yVal = (e.clientY - window.innerHeight / 2) * 0.15;
        xTo(xVal);
        yTo(yVal);
      }
    };
    window.addEventListener("mousemove", moveLipstick);

    // 4. THE LANDING (ScrollTrigger)
    // We use a timeline tied to the scroll so it can move BACK up when you scroll up
    gsap.timeline({
      scrollTrigger: {
        trigger: "#comparison-container",
        start: "top bottom",
        end: "center center",
        scrub: 1, // Smoothly tracks scroll position
      }
    })
    .to([capRef.current, bodyRef.current], {
      left: () => {
        const target = document.querySelector("#image");
        return target ? target.getBoundingClientRect().left + (target.getBoundingClientRect().width / 2) : 50;
      },
      top: () => {
        const target = document.querySelector("#image");
        return target ? target.getBoundingClientRect().top + (target.getBoundingClientRect().height / 2) : 50;
      },
      scale: 2.5, // Your final section size
      rotate: 0,
      x: 0,
      y: 0,
      ease: "none"
    });

    return () => {
      window.removeEventListener("mousemove", moveLipstick);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={mainWrapper} className="fixed inset-0 pointer-events-none z-10000">
      <div ref={capRef} className="absolute origin-bottom">
        <img src="/images/SVG/Lipstick_cap.svg" alt="Cap" className="w-full h-auto" />
      </div>
      <div ref={bodyRef} className="absolute origin-top">
        <img src="/images/SVG/Lipstick_body.svg" alt="Body" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default LipstickScene;