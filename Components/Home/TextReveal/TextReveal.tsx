"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TextReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const textSplit = SplitText.create(textRef.current, {
        type: "chars, words",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "+=100%",
          scrub: true,
        },
      });

      tl.from(textSplit.words, {
        y: 5,
        opacity: 0.05,
        stagger: 0.1,
        ease: "expo.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="h-screen flex items-center justify-center"
    >
      <h1
        ref={textRef}
        className="text-2xl sm:text-7xl max-w-7xl text-[#2b3962] px-8 mx-auto text-center font-theseasons space-y-4"
      >
       Rare botanicals.  Elevated by Nature. Meticulously refined. A collection as singular as you.
      </h1>
    </section>
  );
};

export default TextReveal;
