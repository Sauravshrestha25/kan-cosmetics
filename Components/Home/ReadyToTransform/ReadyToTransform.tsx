"use client";

import { type CSSProperties, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import PremiumButton from "@/Components/ui/ArrowBtn";
import { PageContainer } from "@/Components/ui/design-system";

gsap.registerPlugin(ScrollTrigger);

export default function ReadyToTransform() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const ctaLeft =
        rootRef.current?.querySelector<HTMLElement>("[data-mz-cta-left]");
      const ctaRight = rootRef.current?.querySelector<HTMLElement>(
        "[data-mz-cta-right]",
      );

      if (ctaLeft) {
        gsap.set(ctaLeft, { autoAlpha: 0, x: -60 });
        ScrollTrigger.create({
          trigger: ctaLeft.parentElement,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(ctaLeft, {
              autoAlpha: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            });
          },
        });
      }

      if (ctaRight) {
        gsap.set(ctaRight, { autoAlpha: 0, x: 60 });
        ScrollTrigger.create({
          trigger: ctaRight.parentElement,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(ctaRight, {
              autoAlpha: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              delay: 0.15,
              clearProps: "transform,opacity,visibility",
            });
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section className="relative overflow-visible bg-kan-brand text-white">
      <PageContainer className="grid min-h-0 grid-cols-1 items-center lg:min-h-[50vh] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div
          data-mz-cta-left
          className="order-2 flex min-h-0 items-center pb-10 lg:order-1 lg:min-h-[50vh] lg:items-center lg:justify-center lg:py-14"
        >
          <div className=" text-left">
            <h2 className="font-theseasons text-[clamp(2.3rem,11vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-white sm:text-6xl">
              READY TO
              {/* <br /> */}
              &nbsp;TRANSFORM
              <br />
              YOUR LOOK?
            </h2>

            {/* <p className="mt-6 max-w-176 font-matter text-[clamp(0.96rem,4.4vw,1.2rem)] leading-[1.7] text-white/78 sm:mt-7 sm:text-[clamp(1rem,1.35vw,1.2rem)]">
              Each and every formula contains ingredients in the dosages that
              will do the most for your skin right now.
            </p> */}

            <PremiumButton
              href="/collection"
              text="Browse COllection"
              showDots={false}
              className="mt-6 rounded-none border-white px-6 py-3 text-[0.7rem] tracking-[0.16em] shadow-none sm:mt-7 sm:text-xs sm:tracking-[0.18em]"
              style={
                {
                  "--btn-bg": "#ffffff",
                  "--btn-fill": "#e58ba0",
                  "--btn-text": "#1d2c63",
                  "--btn-hover-text": "#ffffff",
                } as CSSProperties
              }
            />
          </div>
        </div>

        <div
          data-mz-cta-right
          className="relative order-1 z-20 min-h-72 overflow-hidden sm:min-h-88 lg:order-2 lg:-mt-19 lg:min-h-[calc(50vh+6rem)]"
        >
          <Image
            src="/homepage_3_image_section/pngkaan.png"
            alt="Transform your look with KAN"
            fill
            sizes="(min-width: 1024px) 22vw, 100vw"
            quality={88}
            className="origin-bottom object-contain object-bottom scale-[1.4] translate-y-56 -translate-x-26 lg:-translate-x-36 lg:scale-[2] lg:object-bottom-left"
          />
        </div>
      </PageContainer>
    </section>
  );
}
