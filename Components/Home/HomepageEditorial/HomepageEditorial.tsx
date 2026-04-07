"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import PremiumButton from "@/Components/ui/ArrowBtn";
import { PageContainer } from "@/Components/ui/design-system";
import { ImageComparisonSlider } from "@/Components/Home/ImageCompare/image-comparison-slider-horizontal";
import ProductCard from "@/Components/Shop/ProductCard";
import { getProductBySlug, type Product } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

const homepageThreeImageFrames = [
  "/homepage_3_image_section/leftimg.jpg",
  "/homepage_3_image_section/centerimg.jpg",
  "/homepage_3_image_section/right image.jpg",
];

const lipstickProducts = [
  getProductBySlug("lipstick"),
  getProductBySlug("liquid-lipstick"),
  getProductBySlug("ph-lipstick"),
].filter(Boolean) as Product[];

const foundationProducts = [
  getProductBySlug("foundation"),
  getProductBySlug("cc-air-cushion"),
  getProductBySlug("compact-powder"),
].filter(Boolean) as Product[];

const essentialsCategories = [
  {
    title: "Lips",
    copy: "Lip color built for clean payoff, comfort, and repeat wear.",
    image: "/KANWEBSITE/KAN PRODUCTS/lipstick.PNG",
    href: "/collection",
  },
  {
    title: "Complexion",
    copy: "Base products that even tone while keeping skin believable.",
    image: "/KANWEBSITE/KAN PRODUCTS/foundation 1.png",
    href: "/collection",
  },
  {
    title: "Eyes",
    copy: "Definition and pigment for everyday structure and depth.",
    image: "/KANWEBSITE/KAN PRODUCTS/MASCARA.png",
    href: "/collection",
  },
  {
    title: "Prep & Finish",
    copy: "Primers and setting products that improve hold and finish.",
    image: "/KANWEBSITE/KAN PRODUCTS/setting spray.png",
    href: "/collection",
  },
];

const routineSteps = [
  {
    index: "01",
    title: "Prep the skin",
    copy: "Start with primer or mist to improve texture, comfort, and wear before base makeup goes on.",
  },
  {
    index: "02",
    title: "Build the base",
    copy: "Apply foundation or cushion coverage in light layers for a smooth, even complexion that still looks like skin.",
  },
  {
    index: "03",
    title: "Set and define",
    copy: "Finish with color, powder, or setting spray to keep the look balanced and wearable throughout the day.",
  },
];

const journalCards = [
  {
    title: "Shop complexion with more control",
    copy: "Choose base products that even tone, sit smoothly, and stay polished without looking heavy.",
    href: "/collection/foundation",
  },
  {
    title: "Find a lip product that suits the finish",
    copy: "Compare classic lipstick, liquid formulas, and adaptive color to match the look you want to wear most.",
    href: "/collection/lipstick",
  },
  {
    title: "Round out the routine with finishing essentials",
    copy: "Primer, powder, and setting spray are often what make makeup wear better from morning to evening.",
    href: "/collection",
  },
];

function FeatureSection({
  id,
  title,
  description,
  cta,
  ctaHref,
  products,
  videoSrc,
  poster,
  reverse = false,
}: {
  id: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
  products: Product[];
  videoSrc: string;
  poster: string;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="py-18 sm:py-24" data-home-reveal>
      <PageContainer></PageContainer>

      <div
        className="overflow-hidden border-y border-[#ded8ce] bg-[#d9d1c7]"
        data-home-media
      >
        <div className={reverse ? "lg:[&>video]:object-[center_35%]" : ""}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            className="aspect-16/10 w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <PageContainer>
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="mx-auto max-w-4xl text-center" data-home-reveal>
            <h2 className="font-theseasons text-4xl leading-none text-[#141c35] sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-matter text-base leading-8 text-[#6c6c74] sm:text-lg">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={product.id}
                data-home-reveal
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center" data-home-reveal>
            <PremiumButton
              text={cta}
              href={ctaHref}
              showDots={false}
              className="px-6 py-3 text-xs tracking-[0.18em]! [--btn-bg:#1d2c63] [--btn-fill:#ffffff] [--btn-text:#ffffff] [--btn-hover-text:#1d2c63]"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

export default function HomepageEditorial() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-home-reveal]");
      const mediaBlocks = gsap.utils.toArray<HTMLElement>("[data-home-media]");

      reveals.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          },
        );
      });

      mediaBlocks.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0.5, scale: 0.94, y: 24 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          },
        );
      });

      const parallaxBlocks = gsap.utils.toArray<HTMLElement>(
        "[data-home-parallax]",
      );

      parallaxBlocks.forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement ?? element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="bg-white text-[#141c35]">
      <section className="py-18 sm:py-24">
        <PageContainer>
          <div
            className="mb-10 flex flex-col gap-4 text-center"
            data-home-reveal
          >
            <div className="mx-auto max-w-3xl">
              <h2 className="font-theseasons text-4xl leading-none text-[#141c35] sm:text-5xl lg:text-6xl">
                A clearer view of the brand.
              </h2>
              <p className="mt-4 font-matter text-base leading-8 text-[#6c6c74] sm:text-lg">
                KAN is built around modern color, refined texture, and a more
                polished approach to everyday makeup.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {homepageThreeImageFrames.map((image, index) => (
              <div
                key={image}
                className="overflow-hidden border border-[#ded8ce] bg-white"
                data-home-reveal
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="relative aspect-5/7 overflow-hidden bg-[#e8dfd5]">
                  <div className="absolute inset-0" data-home-parallax>
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      quality={78}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-18 sm:py-24">
        <PageContainer>
          <div className="mb-10 flex flex-col items-center gap-5 text-center">
            <div data-home-reveal>
              <h2 className="max-w-2xl font-theseasons text-4xl leading-none sm:text-5xl lg:text-6xl">
                Start by category.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-matter text-base leading-8 text-[#6c6c74] sm:text-lg">
                Browse the collection by category to find the products that fit
                your routine fastest.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {essentialsCategories.map((category, index) => (
              <Link
                key={category.title}
                href={category.href}
                className="group block overflow-hidden border border-[#ded8ce] bg-white transition-colors duration-300 hover:border-[#1d2c63] hover:shadow-[0_18px_40px_rgba(20,28,53,0.08)]"
                data-home-reveal
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-square overflow-hidden border-b border-[#ece8e1] bg-white">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    quality={76}
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-4 text-center sm:p-5">
                  <p className="font-matter text-[0.64rem] uppercase tracking-[0.18em] text-[#9a8f84]">
                    Category
                  </p>
                  <h3 className="mt-2 font-matter text-lg font-semibold tracking-[-0.03em] text-[#141c35] sm:text-xl">
                    {category.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-56 font-matter text-xs leading-6 text-[#6c6c74] sm:text-sm">
                    {category.copy}
                  </p>
                  <span className="mt-4 inline-flex font-matter text-[0.68rem] uppercase tracking-[0.18em] text-[#1d2c63] transition-transform duration-300 group-hover:translate-x-1">
                    Shop Now
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center" data-home-reveal>
            <PremiumButton
              text="View All Products"
              href="/collection"
              showDots={false}
              className="px-6 py-3 text-xs tracking-[0.18em]! [--btn-bg:#ffffff] [--btn-fill:#1d2c63] [--btn-text:#1d2c63] [--btn-hover-text:#ffffff]"
            />
          </div>
        </PageContainer>
      </section>

      <FeatureSection
        id="lip-edit"
        title="Lip color, edited well."
        description="Explore lip products that deliver strong payoff, comfortable wear, and cleaner finishes for both everyday looks and statement color."
        cta="Shop Lips"
        ctaHref="/collection"
        products={lipstickProducts}
        videoSrc="/video/hero_video_2.mp4"
        poster="/images/model.jpg"
      />

      <FeatureSection
        id="complexion"
        title="Complexion that stays polished."
        description="Build your base with foundation, cushion coverage, and setting products that smooth tone, control shine, and wear well across the day."
        cta="Shop Complexion"
        ctaHref="/collection"
        products={foundationProducts}
        videoSrc="/KANWEBSITE/kan video/compact powder.mp4"
        poster="/images/foundation 1.png"
        reverse
      />

      <section className="py-18 sm:py-24">
        <PageContainer>
          <div className="mb-10 flex flex-col items-center gap-5 text-center">
            <div data-home-reveal>
              <h2 className="max-w-2xl font-theseasons text-4xl leading-none sm:text-5xl lg:text-6xl">
                See the finish difference.
              </h2>
            </div>
            <p
              className="max-w-2xl font-matter text-base leading-8 text-[#6c6c74] sm:text-lg"
              data-home-reveal
            >
              Compare the complexion before and after application to see how
              coverage and finish can improve without losing dimension.
            </p>
          </div>
        </PageContainer>

        <div
          className="overflow-hidden border-y border-[#ded8ce] bg-white"
          data-home-reveal
        >
          <ImageComparisonSlider
            leftImage="/images/after_image.jpg"
            rightImage="/images/before_image.jpg"
            altLeft="KAN Cosmetics complexion result"
            altRight="KAN Cosmetics complexion before application"
            className="h-screen min-h-screen"
          />
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <PageContainer>
          <div className="mx-auto max-w-6xl text-center">
            <div
              className="relative min-h-112 overflow-hidden border border-[#ded8ce] bg-[#ddd3c8]"
              data-home-media
            >
              <div className="absolute inset-0" data-home-parallax>
                <Image
                  src="/images/IMG_1135.PNG"
                  alt="KAN Cosmetics premium beauty portrait"
                  fill
                  sizes="(min-width: 1024px) 72vw, 100vw"
                  quality={80}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-4xl" data-home-reveal>
              <h2 className="font-theseasons text-4xl leading-none sm:text-5xl lg:text-6xl">
                The result should look finished, not forced.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-matter text-base leading-8 text-[#6c6c74] sm:text-lg">
                That is where the collection comes together. The complexion
                looks smoother, the color sits cleaner, and the full routine
                feels intentional without becoming complicated.
              </p>
              <div className="mt-8 flex justify-center">
                <PremiumButton
                  text="Browse Collection"
                  href="/collection"
                  showDots={false}
                  className="px-6 py-3 text-xs tracking-[0.18em]! [--btn-bg:#1d2c63] [--btn-fill:#ffffff] [--btn-text:#ffffff] [--btn-hover-text:#1d2c63]"
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-18 sm:py-24">
        <PageContainer>
          <div className="mb-10 flex flex-col items-center gap-5 text-center">
            <div data-home-reveal>
              <h2 className="max-w-2xl font-theseasons text-4xl leading-none sm:text-5xl lg:text-6xl">
                Helpful places to start shopping.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {journalCards.map((card, index) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex min-h-68 flex-col justify-between border border-[#ded8ce] bg-white p-6 transition-colors duration-300 hover:border-[#1d2c63] hover:bg-[#fcfaf7]"
                data-home-reveal
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div>
                  <h3 className="max-w-xs font-theseasons text-3xl leading-none text-[#141c35]">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-sm font-matter text-sm leading-7 text-[#6c6c74]">
                    {card.copy}
                  </p>
                </div>
                <span className="mt-8 font-matter text-xs uppercase tracking-[0.18em] text-[#1d2c63] transition-transform duration-300 group-hover:translate-x-1">
                  Read More
                </span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
