"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import ContactForm from "@/Components/Contact/ContactForm";
import ContactInfo from "@/Components/Contact/ContactInfo";

gsap.registerPlugin(ScrollTrigger);

const supportPoints = [
  "Product questions and shade guidance",
  "Order and delivery support",
  "Retail, press, and partnership inquiries",
];

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set("[data-contact-reveal]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-contact-media]", { autoAlpha: 0, y: 18, scale: 0.985 });

      ScrollTrigger.batch("[data-contact-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-contact-media]").forEach((element) => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          overwrite: true,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-contact-parallax]").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement ?? element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <main ref={rootRef} className="bg-white pt-19 pb-24 font-saolDisplay">
      <section>
        <div className="mx-auto max-w-375 px-4 pt-10 text-center sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl" data-contact-reveal>
            <h1 className="font-theseasons text-[clamp(3rem,6vw,5.6rem)] leading-[0.92] text-[#141c35]">
              Let&apos;s talk beauty.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-matter text-base leading-8 text-[#6c6c74] sm:text-lg">
              Reach out for product guidance, order support, or brand inquiries.
              We keep communication clear, helpful, and aligned with the same care behind the collection.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {supportPoints.map((point) => (
              <div
                key={point}
                className="border border-[#ded8ce] bg-white px-5 py-5 font-matter text-sm uppercase tracking-[0.18em] text-[#141c35]"
                data-contact-reveal
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="mx-auto max-w-375 px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start">
            <div data-contact-reveal>
              <ContactForm />
            </div>
            <div data-contact-reveal>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
