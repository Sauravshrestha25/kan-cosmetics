"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import PremiumButton from "@/Components/ui/ArrowBtn";
import { PageContainer } from "@/Components/ui/design-system";
import { heroProducts } from "@/lib/products";

const heroImageClasses: Record<string, string> = {
  lipstick: "w-[58%] max-w-[380px]",
  "liquid-lipstick": "w-[62%] max-w-[400px]",
  foundation: "w-[56%] max-w-[360px]",
  "cc-air-cushion": "w-[78%] max-w-[540px]",
  "big-eyeshadow-palette": "w-[84%] max-w-[660px]",
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? heroProducts.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === heroProducts.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <section className="relative overflow-hidden bg-white pt-12">
      <PageContainer className="flex min-h-[calc(100vh-2rem)] flex-col justify-between pb-10">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.05fr_1.65fr]">
          <div className="z-10 max-w-200 self-center pt-8 lg:pt-0">
            <h1 className="font-matter text-[clamp(2.5rem,4.9vw,4.9rem)] font-semibold leading-none tracking-[-0.06em] text-nowrap text-[#10121a]">
              Whatever the Flavor
            </h1>
            <p className="mt-6 max-w-107.5 font-matter text-lg leading-[1.45] text-[#74767e] sm:text-[1.9rem] sm:leading-[1.38] lg:text-[1.1rem] xl:text-[1.15rem]">
              Go and grab the most closest things that&apos;s connected to your
              heart.
            </p>

            <PremiumButton
              text="Learn Skin Care"
              href="/collection"
              className="mt-6 rounded-none px-5"
            />
          </div>

          <div className="relative flex min-h-115 items-center overflow-hidden lg:min-h-170">
            <div className="w-full overflow-hidden">
              <div
                className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {heroProducts.map((product, index) => (
                  <article
                    key={product.id}
                    className="flex h-115 w-full shrink-0 items-center justify-center md:h-140 lg:h-170"
                  >
                    <Link
                      href={`/collection/${product.slug}`}
                      className="relative flex h-full w-full items-center justify-center"
                      aria-label={`View ${product.name}`}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={1200}
                        height={1200}
                        priority={index === 0}
                        className={`${heroImageClasses[product.slug] ?? "w-[68%] max-w-115"} h-auto object-contain transition-transform duration-300 hover:scale-[1.02] select-none`}
                      />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-5 pb-2 sm:gap-7">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Show previous product"
            className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-kan-brand-deep text-kan-brand-deep transition-colors sm:h-32 sm:w-32"
          >
            <ChevronLeft className="h-10 w-10 stroke-[1.2] sm:h-12 sm:w-12" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Show next product"
            className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-kan-brand-deep text-kan-brand-deep transition-colors hover:bg-kan-brand-deep hover:text-white sm:h-32 sm:w-32"
          >
            <ChevronRight className="h-10 w-10 stroke-[1.2] sm:h-12 sm:w-12" />
          </button>
        </div>
      </PageContainer>
    </section>
  );
};

export default Hero;
