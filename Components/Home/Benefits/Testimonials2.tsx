"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DividerLabel,
  PageContainer,
  Section,
  SectionHeading,
} from "@/Components/ui/design-system";

const testimonials = [
  {
    id: 1,
    quote:
      "My skin has never felt this confident. From the very first use, I could see and feel the difference—smoother texture, a healthy glow, and a finish that looks effortlessly natural all day long.",
    author: "Sarah Chen",
    image: "/images/Testimonials/model2.jpg",
  },
  {
    id: 2,
    quote:
      "Every product feels intentional, luxurious, and incredibly gentle on the skin. It has completely elevated my daily routine into something that feels calm, refined, and truly indulgent.",
    author: "Martha Grey",
    image: "/images/Testimonials/after.jpg",
  },
  {
    id: 3,
    quote:
      "The finish is flawless yet natural, enhancing my features without ever feeling heavy or overdone. It’s the kind of makeup that makes you feel confident without announcing itself.",
    author: "Elena Voss",
    image: "/images/Testimonials/3.png",
  },
  {
    id: 4,
    quote:
      "I love how lightweight the makeup feels while still being incredibly long-lasting. It stays fresh and comfortable throughout the day, even during long hours and busy moments.",
    author: "Ava Laurent",
    image: "/images/Testimonials/2.png",
  },
  {
    id: 5,
    quote:
      "This brand truly understands modern beauty—clean formulations, elegant finishes, and a sense of confidence that feels authentic. It’s beauty that enhances, not overwhelms.",
    author: "Sabrina Vox",
    image: "/images/Testimonials/2.png",
  },
];

const Testimonials2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex, isMobile]);

  // if (isMobile === null) return null;

  // if (isMobile) {
  //   return (
  //     <div className="w-full">
  //       <div className="flex flex-col items-center justify-center pt-12">
  //         <h2 className="text-6xl font-theseasons leading-tight">Confidence</h2>
  //         <p className="italic text-neutral-400 font-light text-2xl  ">
  //           In their own words
  //         </p>
  //       </div>
  //       <Testimonial />
  //     </div>
  //   );
  // }

  return (
    <Section className="h-screen overflow-hidden bg-white text-[#2b3962]">
      <PageContainer>
        <div className="grid h-full items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <SectionHeading
              align="center"
              eyebrow=""
              title={
                <>
                  Confidence
                  <span className="mt-2 block font-theseasons text-[clamp(2rem,4vw,4rem)] font-light italic text-[#a6acb7]">
                    In their own words
                  </span>
                </>
              }
              titleClassName="text-[clamp(3rem,5vw,5.4rem)] leading-[0.94]"
              description="A closer look at how KAN fits into real routines, real skin, and real everyday confidence."
              descriptionClassName="max-w-xl"
            />

            <div
              key={activeIndex}
              className="kan-surface-card mt-10 max-w-3xl border-[#e5e9f1] bg-white/90 p-6 transition-all duration-700 ease-out sm:p-8"
            >
              <p className="font-montserrat text-[1.05rem] leading-8 text-[#141c35] sm:text-[1.2rem] lg:text-[1.45rem] lg:leading-9">
                “{testimonials[activeIndex].quote}”
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#1d2c63]" />
                  <p className="font-matter text-sm uppercase tracking-[0.18em] text-[#1d2c63]">
                    {testimonials[activeIndex].author}
                  </p>
                </div>
                <DividerLabel
                  label={`${activeIndex + 1} / ${testimonials.length}`}
                  className="gap-3"
                />
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-2">
            <div className="relative h-[58vh] bg-neutral-200 sm:h-[64vh] lg:h-screen">
              <Image
                key={activeIndex}
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].author}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                priority
                className="object-cover transition-opacity duration-700"
              />

              <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#11131a]/55 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:min-w-88">
                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1,
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center border border-white/30 text-white transition hover:bg-black/20"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="min-w-0 flex-1">
                  <p className="font-matter text-xs uppercase tracking-[0.2em] text-white/70">
                    Testimonial
                  </p>
                  <p className="truncate font-matter text-base font-semibold text-white sm:text-lg">
                    {testimonials[activeIndex].author}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center border border-white/30 text-white transition hover:bg-black/20"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export default Testimonials2;
