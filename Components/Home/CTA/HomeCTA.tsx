"use client";

import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/Components/ui/design-system";
import { Button } from "@/Components/ui/button";

const HomeCTA = () => {
  return (
    <section className="overflow-hidden bg-[#1d2c63] text-white">
      <PageContainer className="relative">
        <div className="grid min-h-[clamp(32rem,80svh,44rem)] items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-0">
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <p className="mb-4 font-matter text-[0.7rem] uppercase tracking-[0.22em] text-white/65">
              Premium cosmetics
            </p>
            <h2 className="font-theseasons text-[clamp(2.5rem,5.2vw,4.9rem)] leading-[0.92]">
              Feel beautiful in your own skin.
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-matter text-[clamp(0.98rem,1.35vw,1.1rem)] leading-[1.8] text-white/88 lg:mx-0">
              Discover Korean makeup that enhances your natural glow, makes
              every shade yours, and brings a polished finish to your everyday
              routine.
            </p>

            <div className="mt-7 flex justify-center lg:justify-start">
              <Button
                asChild
                variant="kanSecondary"
                size="kan"
                className="rounded-none border-[#ead9d4] bg-white px-6 py-3 text-[0.68rem] tracking-[0.18em] shadow-none hover:border-[#e58ba0] hover:bg-[#fff6f7] hover:text-[#1d2c63]"
              >
                <Link href="/collection">See Products</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex h-full items-end justify-center lg:justify-end">
            <div className="relative w-full max-w-[clamp(22rem,54vw,32rem)]">
              <div className="absolute -inset-x-20 bottom-0 top-10 rounded-full bg-white/6 blur-3xl" />
              <Image
                src="/homepage_3_image_section/CTA_Girl.png"
                alt="KAN cosmetics campaign model"
                width={900}
                height={900}
                sizes="(min-width: 1024px) 10vw, 60vw"
                quality={88}
                className="relative z-10 h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default HomeCTA;
