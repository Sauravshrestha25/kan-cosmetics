"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import PremiumButton from "@/Components/ui/ArrowBtn";

gsap.registerPlugin(ScrollTrigger);

const valueCards = [
  {
    title: "Texture First",
    text: "Formulas are chosen for how they sit on skin, how they wear through the day, and how refined they look up close.",
  },
  {
    title: "Quiet Luxury",
    text: "The brand language stays controlled: cleaner finishes, stronger essentials, and visual restraint instead of excess.",
  },
  {
    title: "Everyday Wear",
    text: "KAN is built for repeat use, real routines, and makeup that feels polished without becoming difficult to wear.",
  },
];

const storyPoints = [
  "Premium textures with practical wear",
  "A softer, more modern beauty point of view",
  "Products designed to feel elevated on real skin",
];

const galleryImages = [
  "/images/model.jpg",
  "/images/IMG_1090.PNG",
  "/images/happyfaces2.png",
];

export default function About() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set("[data-about-reveal]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-about-media]", { autoAlpha: 0, y: 18, scale: 0.985 });

      ScrollTrigger.batch("[data-about-reveal]", {
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

      gsap.utils
        .toArray<HTMLElement>("[data-about-media]")
        .forEach((element) => {
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

      gsap.utils
        .toArray<HTMLElement>("[data-about-parallax]")
        .forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: element.parentElement ?? element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
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
        <div
          className="overflow-hidden border-y border-[#ded8ce] bg-[#d8d0c6]"
          data-about-media
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero_photo.png"
            className="h-[72vh] w-full object-cover"
          >
            <source src="/video/about_video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="mx-auto mt-10 max-w-375 px-4 text-center sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl" data-about-reveal>
            <h1 className="font-theseasons text-[clamp(3rem,6vw,6rem)] leading-[0.92] text-[#141c35]">
              Beauty, made refined.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-matter text-base leading-8 text-[#6c6c74] sm:text-lg">
              KAN brings together elevated texture, modern color, and a calmer
              point of view on daily beauty. The result is makeup that looks
              polished, feels wearable, and earns its place in a real routine.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {valueCards.map((card) => (
              <article
                key={card.title}
                className="border border-[#ded8ce] bg-white px-6 py-8 text-center"
                data-about-reveal
              >
                <h3 className="font-theseasons text-3xl leading-none text-[#141c35]">
                  {card.title}
                </h3>
                <p className="mt-4 font-matter text-sm leading-7 text-[#6c6c74] sm:text-base">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="mx-auto max-w-375 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl text-center">
            <div data-about-reveal>
              <h2 className="font-theseasons text-4xl leading-none text-[#141c35] sm:text-5xl lg:text-6xl">
                The brand story stays visual.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-matter text-base leading-8 text-[#6c6c74] sm:text-lg">
                KAN is expressed through image, finish, and atmosphere just as
                much as product. Every visual decision is meant to support a
                calmer, more premium beauty experience.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {galleryImages.map((image) => (
                <div
                  key={image}
                  className="overflow-hidden border border-[#ded8ce] bg-white"
                  data-about-media
                >
                  <div className="relative aspect-5/7 overflow-hidden bg-[#ebe3d8]">
                    <div className="absolute inset-0" data-about-parallax>
                      <Image
                        src={image}
                        alt="KAN editorial imagery"
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        quality={80}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="mx-auto max-w-375 px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="text-center lg:text-left" data-about-reveal>
              <h2 className="font-theseasons text-4xl leading-none text-[#141c35] sm:text-5xl lg:text-6xl">
                What defines the collection.
              </h2>
              <p className="mt-6 font-matter text-base leading-8 text-[#6c6c74] sm:text-lg">
                KAN keeps beauty focused on the details that matter most:
                smoother texture, clearer finish, balanced color, and products
                that support repeat wear without losing their polish.
              </p>

              <div className="mt-10 grid gap-px overflow-hidden border border-[#dfd7ca] bg-[#dfd7ca]">
                {storyPoints.map((point) => (
                  <div
                    key={point}
                    className="bg-white px-6 py-5 text-center font-matter text-sm uppercase tracking-[0.18em] text-[#141c35] lg:text-left"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative min-h-112 overflow-hidden border border-[#ded8ce] bg-[#ddd3c8]"
              data-about-media
            >
              <div className="absolute inset-0" data-about-parallax>
                <Image
                  src="/images/potential image.jpg"
                  alt="KAN brand image"
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  quality={82}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="mx-auto max-w-375 px-4 text-center sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl" data-about-reveal>
            <h2 className="font-theseasons text-4xl leading-none text-[#141c35] sm:text-5xl lg:text-6xl">
              Explore the collection with the same point of view.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-matter text-base leading-8 text-[#6c6c74] sm:text-lg">
              From complexion to color, each product is designed to feel
              cleaner, more reliable, and more refined in daily use.
            </p>
            <div className="mt-8 flex justify-center">
              <PremiumButton
                text="Shop Collection"
                href="/collection"
                showDots={false}
                className="px-6 py-3 text-xs tracking-[0.18em]! [--btn-bg:#1d2c63] [--btn-fill:#ffffff] [--btn-text:#ffffff] [--btn-hover-text:#1d2c63]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
