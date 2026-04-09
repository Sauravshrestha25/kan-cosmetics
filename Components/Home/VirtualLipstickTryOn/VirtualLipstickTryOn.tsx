"use client";

import { type CSSProperties } from "react";
import Image from "next/image";
import PremiumButton from "@/Components/ui/ArrowBtn";

export default function VirtualLipstickTryOn() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative h-svh min-h-176 w-full">
        <Image
          src="/homepage_3_image_section/korean_girl.png"
          alt="Virtual lipstick try-on"
          fill
          sizes="100vw"
          quality={88}
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-white/8" />

        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <PremiumButton
            href="/try-on"
            text="VIRTUAL TRY ON"
            showDots={false}
            className="rounded-none border-[#f8becd] px-6 py-3 text-[0.68rem] tracking-[0.18em] shadow-none sm:px-8 sm:py-3.5"
            style={
              {
                "--btn-bg": "#f8becd",
                "--btn-fill": "#ffffff",
                "--btn-text": "#1d2c63",
                "--btn-hover-text": "#1d2c63",
              } as CSSProperties
            }
          />
        </div>
      </div>
    </section>
  );
}
