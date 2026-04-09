"use client";

import { type CSSProperties } from "react";
import PremiumButton from "@/Components/ui/ArrowBtn";

const Hero = () => {
  // const [showContent, setShowContent] = useState(false);

  return (
    <section className="relative min-h-svh overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero_photo.png"
        aria-label="KAN Cosmetics campaign video"
      >
        <source src="/video/kan-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex items-center justify-center bg-black/28 px-4 transition-opacity duration-500 sm:px-6 lg:px-8">
        <div className="flex max-w-[clamp(18rem,80vw,42rem)] flex-col items-center text-center">
          <p className="font-theseasons text-[clamp(2.75rem,8vw,6.75rem)] font-black leading-[0.9] tracking-wide text-white">
            Makeup, refined.
          </p>
          {/* <p className="mt-4 max-w-xl font-matter text-[clamp(0.95rem,1.8vw,1.15rem)] leading-[1.7] text-white/90">
            Shop complexion, lips, and finishing essentials designed for
            polished everyday wear.
          </p> */}
          <PremiumButton
            text="Shop Collection"
            href="/collection"
            className="mt-6 rounded-none border-white px-5 py-3 text-[0.68rem] sm:mt-8 sm:px-6"
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
