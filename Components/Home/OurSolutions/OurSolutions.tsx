"use client";

import Image from "next/image";
import {
  // DividerLabel,
  PageContainer,
  Section,
  SectionHeading,
} from "@/Components/ui/design-system";

const solutions = [
  {
    title: "Gentle",
    image: "/images/gentle.png",
    alt: "Soft premium skincare illustration for gentle solution",
  },
  {
    title: "Natural",
    image: "/images/natural.png",
    alt: "Natural premium skincare illustration with botanical shapes",
  },
  {
    title: "K-beauty inspired",
    image: "/images/k-beauty-inspired.png",
    alt: "Premium K-beauty inspired skincare illustration",
  },
];

const OurSolutions = () => {
  return (
    <Section>
      {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#fbf8f4] via-white to-transparent" />
      <div className="pointer-events-none absolute left-[8%] top-16 h-40 w-40 rounded-full bg-[#f7e9e1] blur-3xl" />
      <div className="pointer-events-none absolute right-[16%] top-24 h-24 w-24 rounded-full border border-[#ece8e1]/80" />
      <div className="pointer-events-none absolute bottom-10 right-[8%] h-44 w-44 rounded-full bg-[#edf2fb] blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-[12%] h-px w-28 bg-[#ddd8ce]" /> */}

      <PageContainer>
        <SectionHeading
          align="center"
          className="mx-auto max-w-3xl"
          eyebrow="K-beauty essentials"
          title="Our Solutions"
          description="Thoughtful essentials shaped around comfort, wearability, and a more refined beauty ritual."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
          {solutions.map((solution) => (
            <article
              key={solution.title}
              className="kan-surface-card overflow-hidden"
            >
              <div className="relative aspect-5/6 bg-[#ececec]">
                <Image
                  src={solution.image}
                  alt={solution.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="border-t border-[#a8b2d3] bg-white px-0 py-3">
                <h3 className="font-matter text-center text-[clamp(1.25rem,2vw,2rem)] font-medium tracking-[-0.04em] text-[#11131a]">
                  {solution.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 border-t border-[#f0ede7] pt-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <p className="max-w-xl font-matter text-sm leading-7 text-[#7d8598]">
              Built to feel elevated yet easy, each solution stays rooted in a
              clean, wearable beauty experience.
            </p>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export default OurSolutions;
