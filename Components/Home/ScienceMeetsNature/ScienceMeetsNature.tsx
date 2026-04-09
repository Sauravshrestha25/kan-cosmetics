"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import "./ScienceMeetsNature.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScienceMeetsNature() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const revealEls = gsap.utils.toArray<HTMLElement>("[data-mz-reveal]");
      gsap.set(revealEls, { autoAlpha: 0, y: 40 });

      ScrollTrigger.batch(revealEls, {
        start: "top 92%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });

      const tiltedBg = rootRef.current?.querySelector<HTMLElement>(
        ".mz-science__tilted-bg",
      );
      if (tiltedBg) {
        gsap.fromTo(
          tiltedBg,
          { yPercent: -10, rotate: -8 },
          {
            yPercent: 10,
            rotate: -4,
            ease: "none",
            scrollTrigger: {
              trigger: tiltedBg.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      }

      const floatEls = gsap.utils.toArray<HTMLElement>(".mz-science__float");
      floatEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: -15 - i * 5 },
          {
            yPercent: 15 + i * 5,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1 + i * 0.3,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="mz-science mt-19 w-full lg:mt-0">
      <div className="mz-science__inner mx-auto max-w-375">
        <div className="mz-science__copy mz-science__copy--left" data-mz-reveal>
          <h2 className="mz-science__heading">
            <span>WHERE</span>
            <span>SCIENCE</span>
            <span>MEETS</span>
            <span>NATURE</span>
          </h2>
        </div>

        <div className="mz-science__art" data-mz-reveal>
          {/* <div className="mz-science__tilted-bg" /> */}

          <div className="mz-science__product-img">
            <Image
              src="/KANWEBSITE/KAN PRODUCTS/foundation 1.png"
              alt="KAN Cosmetics product"
              width={420}
              height={760}
              sizes="(min-width: 1024px) 18vw, 50vw"
              quality={90}
              className="h-auto w-full object-contain drop-shadow-[0_28px_48px_rgba(20,28,53,0.2)]"
            />
          </div>

          <div className="mz-science__float mz-science__float--1">
            <Image
              src="/homepage_3_image_section/flopet.png"
              alt=""
              width={320}
              height={320}
              className="h-full w-full object-contain object-top"
            />
          </div>
          <div className="mz-science__float mz-science__float--2">
            <Image
              src="/homepage_3_image_section/peelpet.png"
              alt=""
              width={330}
              height={520}
              className="h-full w-full object-contain object-top"
            />
          </div>
          <div className="mz-science__float mz-science__float--3">
            <Image
              src="/homepage_3_image_section/flopet.png"
              alt=""
              width={300}
              height={300}
              className="h-full w-full object-contain object-bottom"
            />
          </div>
          <div className="mz-science__float mz-science__float--4">
            <Image
              src="/homepage_3_image_section/peelpet.png"
              alt=""
              width={280}
              height={420}
              className="h-full w-full object-contain object-bottom"
            />
          </div>
        </div>

        <div
          className="mz-science__copy mz-science__copy--right"
          data-mz-reveal
        >
          <p className="mz-science__description">
            Each and every formula contains ingredients in the dosages that will
            do the most for your skin right now. Your formula keeps changing as
            your skin changes! mco sint eiusmod culpa consuat en Mollit nostrud
            qui magna moollit nisi est officialin eudesece ecat adipisicing
            fugiat.
          </p>
        </div>
      </div>
    </section>
  );
}
