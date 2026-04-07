"use client";

import { type CSSProperties } from "react";
import PremiumButton from "@/Components/ui/ArrowBtn";

const Hero = () => {
  // const [showContent, setShowContent] = useState(false);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero_photo.png"
        aria-label="KAN Cosmetics campaign video"
      >
        <source src="/video/kan-hero.mp4" type="video/mp4" />
      </video>

      <div
        className={[
          "absolute inset-0 flex items-center justify-center bg-black/28 px-6 transition-opacity duration-500",
        ].join(" ")}
      >
        <div className="flex max-w-4xl flex-col items-center text-center">
          <p className="font-theseasons text-7xl leading-[0.9] tracking-wide text-white font-black">
            Makeup, refined.
          </p>
          <p className="mt-4 max-w-xl font-matter text-md leading-6 text-white/90 sm:text-base">
            Shop complexion, lips, and finishing essentials designed for polished everyday wear.
          </p>
          <PremiumButton
            text="Shop Collection"
            href="/collection"
            className="mt-8 rounded-none border-white px-6"
            style={
              {
                "--btn-bg": "#ffffff",
                "--btn-fill": "#141c35",
                "--btn-text": "#141c35",
                "--btn-hover-text": "#ffffff",
              } as CSSProperties
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
