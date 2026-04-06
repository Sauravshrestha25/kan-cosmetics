"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const values = [
  {
    title: "Skin-first",
    text: "We create beauty that feels comfortable, wearable, and thoughtful from the very first swipe.",
  },
  {
    title: "Refined",
    text: "Every texture, finish, and shade is shaped to feel modern, minimal, and quietly luxurious.",
  },
  {
    title: "Rooted",
    text: "KAN brings together Korean beauty precision and Nepalese warmth in a language that feels personal.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white pt-28 pb-20 font-saolDisplay">
      <div className="mx-auto max-w-375 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-matter text-sm font-medium text-[#7a6f68] transition-colors hover:text-[#141c35]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>

        <h1 className="mt-8 font-theseasons text-[clamp(2.8rem,5.4vw,5rem)] font-bold tracking-[-0.06em] text-[#141c35]">
          About Us
        </h1>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_1.1fr] lg:items-start">
          <div className="max-w-160">
            <p className="font-matter text-sm uppercase tracking-[0.22em] text-[#7a6f68]">
              Korea &amp; Nepal
            </p>
            <p className="mt-6 font-matter text-[clamp(1.3rem,2.1vw,2rem)] leading-normal text-[#141c35]">
              KAN was created to bring elevated beauty into everyday rituals. We
              believe makeup should feel expressive, effortless, and deeply
              personal.
            </p>
            <p className="mt-6 max-w-136 font-matter text-lg leading-[1.8] text-[#7a6f68]">
              Our approach blends soft minimalism, premium textures, and a
              modern Asian beauty sensibility. From complexion products to
              statement color, each formula is designed to support real skin and
              real routines with elegance.
            </p>
            <p className="mt-6 max-w-136 font-matter text-lg leading-[1.8] text-[#7a6f68]">
              We build with intention: fewer distractions, better finishes, and
              products that feel as good on your shelf as they do on your skin.
            </p>
          </div>

          <div className="relative aspect-4/4.5 overflow-hidden bg-[#f8f7f4]">
            <Image
              src="/images/model.jpg"
              alt="KAN beauty portrait"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="border border-[#d9d7d1] bg-white px-6 py-8"
            >
              <h2 className="font-theseasons text-[1.6rem] font-bold tracking-[-0.04em] text-[#141c35]">
                {value.title}
              </h2>
              <p className="mt-4 font-matter text-base leading-7 text-[#7a6f68]">
                {value.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative aspect-16/10 overflow-hidden bg-[#f8f7f4]">
            <Image
              src="/images/happyfaces2.png"
              alt="Community portrait for KAN"
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between border border-[#d9d7d1] bg-white px-6 py-8 sm:px-8 lg:px-10">
            <div>
              <p className="font-matter text-sm uppercase tracking-[0.22em] text-[#7a6f68]">
                Our Community
              </p>
              <h2 className="mt-4 font-theseasons text-[clamp(2rem,3vw,3rem)] font-bold tracking-[-0.05em] text-[#141c35]">
                Beauty that feels relatable, modern, and lived in.
              </h2>
              <p className="mt-6 font-matter text-lg leading-[1.8] text-[#7a6f68]">
                We are inspired by the confidence of real people and the calm of
                intentional design. KAN is built for everyday beauty moments:
                skin that glows, textures that sit beautifully, and products
                that feel quietly premium.
              </p>
            </div>

            <div className="mt-8 border-t border-[#d9d7d1] pt-6">
              <Link
                href="/collection"
                className="inline-flex items-center font-matter text-sm font-semibold uppercase tracking-[0.08em] text-[#2b3962] transition-colors hover:text-[#d4a574]"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="border border-[#d9d7d1] bg-white px-6 py-8 sm:px-8 lg:px-10">
            <p className="font-matter text-sm uppercase tracking-[0.22em] text-[#7a6f68]">
              Our Vision
            </p>
            <h2 className="mt-4 font-theseasons text-[clamp(2rem,3vw,3rem)] font-bold tracking-[-0.05em] text-[#141c35]">
              To make premium beauty feel clear, calm, and personal.
            </h2>
            <p className="mt-6 font-matter text-lg leading-[1.8] text-[#7a6f68]">
              We focus on a slower, more deliberate beauty experience. That
              means better essentials, stronger point of view, and visuals that
              let the product speak without noise.
            </p>
          </div>

          <div className="relative aspect-16/10 overflow-hidden bg-[#f8f7f4]">
            <Image
              src="/images/potential image.jpg"
              alt="KAN premium skincare concept"
              fill
              className="object-cover"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
