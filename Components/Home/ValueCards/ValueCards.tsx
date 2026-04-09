"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import "./ValueCards.css";

gsap.registerPlugin(ScrollTrigger);

export default function ValueCards() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const cardEls = gsap.utils.toArray<HTMLElement>("[data-mz-card]");
      gsap.set(cardEls, { autoAlpha: 0, y: 50 });

      ScrollTrigger.batch(cardEls, {
        start: "top 93%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.14,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="mz-values">
      <div className="mz-values__cards">
        <div className="mz-values__card" data-mz-card>
          <h3 className="mz-values__card-title">
            ADAPTS TO
            <br />
            YOUR NEEDS
          </h3>
          <p className="mz-values__card-desc">
            As you discover your style each month, your formulation will
            continue to adapt to the changing needs of your skin.
          </p>
          <div className="mz-values__card-img">
            <Image
              src="/KANWEBSITE/KAN PRODUCTS/compact powder.jpg"
              alt="Adapts to your needs"
              fill
              sizes="18vw"
              quality={80}
              className="object-contain"
            />
          </div>
        </div>

        <div className="mz-values__card" data-mz-card>
          <h3 className="mz-values__card-title">
            BEST
            <br />
            INGREDIENTS
          </h3>
          <p className="mz-values__card-desc">
            Developed with natural ingredients, the only scents you&apos;ll find
            in our products come from nature.
          </p>
          <div className="mz-values__card-img">
            <Image
              src="/KANWEBSITE/KAN PRODUCTS/beauty bleander.png"
              alt="Best ingredients"
              fill
              sizes="18vw"
              quality={80}
              className="object-contain"
            />
          </div>
        </div>

        <div className="mz-values__card" data-mz-card>
          <h3 className="mz-values__card-title">
            YOUR PERFECT
            <br />
            DOSE
          </h3>
          <p className="mz-values__card-desc">
            Each formula contains ingredients in the dosages that will do the
            most for your skin at that time.
          </p>
          <div className="mz-values__card-img">
            <Image
              src="/KANWEBSITE/KAN PRODUCTS/MASCARA.png"
              alt="Your perfect dose"
              fill
              sizes="18vw"
              quality={80}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
