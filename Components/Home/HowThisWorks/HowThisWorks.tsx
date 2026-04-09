"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import "./HowThisWorks.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "TEST YOUR SHADE",
    copy: "Use our shade-matching guide or virtual try-on to find the tones that complement your natural features.",
  },
  {
    num: "02",
    title: "PREVIEW YOUR LOOK",
    copy: "After completing your shade match, you'll see your personalized recommendations and preview the products in your formula.",
  },
  {
    num: "03",
    title: "APPLY MAKEUP",
    copy: "Receive your curated products in a few days. They're designed to work with your existing routine.",
  },
  {
    num: "04",
    title: "ADAPT AND PERFECT",
    copy: "Each month, we'll adapt your routine so it continues to change as your skin and style change.",
  },
];

export default function HowThisWorks() {
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

      const parallaxEls = gsap.utils.toArray<HTMLElement>("[data-mz-parallax]");
      parallaxEls.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });

      const stepEls = gsap.utils.toArray<HTMLElement>("[data-mz-step]");
      gsap.set(stepEls, { autoAlpha: 0, y: 30 });

      ScrollTrigger.batch(stepEls, {
        start: "top 90%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="mz-howworks">
      <div className="mz-howworks__header" data-mz-reveal>
        <p className="mz-howworks__subtitle">HOW IT WORKS</p>
        <h2 className="mz-howworks__title">How this works</h2>
        <p className="mz-howworks__desc">
          We take care of everything, you just have to find your shade and
          apply.
        </p>
      </div>

      <div className="mz-howworks__body">
        <div className="mz-howworks__portrait" data-mz-reveal>
          <Image
            src="/homepage_3_image_section/aboutpage_img.png"
            alt="KAN Cosmetics beauty portrait"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            quality={85}
            className="object-cover"
            data-mz-parallax
          />
        </div>

        <ul className="mz-howworks__steps">
          {steps.map((step) => (
            <li key={step.num} className="mz-howworks__step" data-mz-step>
              <span className="mz-howworks__step-num">{step.num}</span>
              <h3 className="mz-howworks__step-title">{step.title}</h3>
              <p className="mz-howworks__step-desc">{step.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
