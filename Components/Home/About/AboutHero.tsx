"use client";
import React from "react";
import AboutPhotocard from "./AboutPhotocard";
import PremiumButton from "@/Components/ui/ArrowBtn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  useGSAP(() => {
    const photos = [
      { selector: ".photo-1", distance: -28 },
      { selector: ".photo-2", distance: -42 },
      { selector: ".photo-3", distance: -34 },
    ];

    photos.forEach(({ selector, distance }) => {
      gsap.fromTo(
        selector,
        { y: 0, willChange: "transform" },
        {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.4,
          },
        },
      );
    });

    return () => {
      photos.forEach(({ selector }) => {
        gsap.set(selector, { clearProps: "willChange" });
      });
    };
  }, []);

  return (
    <section
      id="about"
      className="relative h-screen overflow-hidden px-4 sm:px-8 lg:px-12"
    >
      <div className="absolute bg-white inset-0 -z-10 "></div>
      <div className="mx-auto flex h-full max-w-375 flex-col justify-between py-6 lg:py-8">
        <div className="photo-1 z-20 mb-6 hidden justify-center pt-2 md:flex lg:mb-0 lg:justify-start">
          <AboutPhotocard
            imageUrl="/images/IMG_1090.PNG"
            width={340}
            height={370}
          />
        </div>

        <div className="grid grid-cols-1 items-center lg:grid-cols-12">
          <div className="col-span-2" />
          <div className="flex flex-col items-center text-center lg:col-span-8">
            <h1 className="font-theseasons text-4xl font-medium leading-[1.02] text-[#141c35] sm:text-5xl lg:text-6xl">
              <span className=" ">Professional</span> beauty{" "}
              <br className="hidden lg:block" />
              starts with reliable <br className="hidden lg:block" />
              <span className="  ">essentials</span>.
            </h1>
          </div>

          <div className="photo-2 hidden justify-end self-center lg:col-span-2 lg:flex">
            <AboutPhotocard
              imageUrl="/images/IMG_1501.PNG"
              width={250}
              height={220}
            />
          </div>
        </div>

        <div className="photo-3 grid grid-cols-1 items-center gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="flex justify-center lg:justify-start">
            <AboutPhotocard
              imageUrl="/images/IMG_1296.PNG"
              width={420}
              height={168}
            />
          </div>

          <div className="flex items-center justify-center py-4 lg:py-0">
            <PremiumButton
              href="/collection"
              text="Shop Collection"
              className="md:scale-110"
            />
          </div>

          <div className="flex lg:hidden justify-center">
            <AboutPhotocard
              imageUrl="/images/IMG_1501.PNG"
              width={260}
              height={230}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
