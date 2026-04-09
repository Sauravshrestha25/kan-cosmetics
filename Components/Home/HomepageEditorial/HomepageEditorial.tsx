"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import PremiumButton from "@/Components/ui/ArrowBtn";
import { PageContainer } from "@/Components/ui/design-system";
import ProductCard from "@/Components/Shop/ProductCard";
import { getProductBySlug, type Product } from "@/lib/products";
// import ScienceMeetsNature from "@/Components/Home/ScienceMeetsNature/ScienceMeetsNature";
// import HowThisWorks from "@/Components/Home/HowThisWorks/HowThisWorks";
// import FeatureBadges from "@/Components/Home/FeatureBadges/FeatureBadges";
// import ValueCards from "@/Components/Home/ValueCards/ValueCards";
import VirtualLipstickTryOn from "@/Components/Home/VirtualLipstickTryOn/VirtualLipstickTryOn";
import ReadyToTransform from "@/Components/Home/ReadyToTransform/ReadyToTransform";
import { TestimonialSection } from "@/Components/ui/testimonials";

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

// const foundationProducts = [
//   getProductBySlug("foundation"),
//   getProductBySlug("cc-air-cushion"),
//   getProductBySlug("compact-powder"),
// ].filter(Boolean) as Product[];

const testimonialsData = [
  {
    id: 1,
    quote:
      "He is super fast and creative, delivered the website design within a week. Highly skilled and professional designer!",
    author: "Sarah, Kickflip",
    image:
      "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900?q=80&w=1965&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "Impressed by the professionalism and attention to details in UI design. Highly Recommended!",
    author: "Martha, Unicell",
    image:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "A seamless experience from start to finish. Josh made our app design and experience really impressive.",
    author: "Victor, Horizone",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900?q=80&w=1887&auto=format&fit=crop",
  },
];

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

export default function HomepageEditorial() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set("[data-home-reveal]", { autoAlpha: 0, y: 22 });

      ScrollTrigger.batch("[data-home-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="bg-white text-[#141c35]">
      {/* Section 1: A clearer view of the brand */}
      <section className="overflow-hidden bg-white py-10 sm:py-14 lg:min-h-[clamp(42rem,100svh,70rem)] lg:py-20">
        <PageContainer>
          <div className="flex flex-col justify-center gap-5 text-center lg:min-h-[clamp(42rem,100svh,70rem)] lg:gap-6">
            <div
              className="mb-6 flex flex-col gap-4 text-center sm:mb-8 lg:mb-10"
              data-home-reveal
            >
              <div className="mx-auto max-w-3xl">
                <h2 className="font-theseasons text-[clamp(2rem,9vw,4.5rem)] leading-[0.95] text-[#141c35] sm:text-[clamp(2.4rem,5vw,4.5rem)]">
                  A clearer view of the brand.
                </h2>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {homepageThreeImageFrames.map((image) => (
                <div
                  key={image}
                  className="overflow-hidden border border-[#ded8ce] bg-white"
                  data-home-reveal
                >
                  <div className="relative aspect-4/5 overflow-hidden bg-[#e8dfd5] sm:aspect-5/7">
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                      quality={78}
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>
      {/* Section 6: Feature Badges */}
      {/* <FeatureBadges /> */}
      <section className="relative h-screen w-full overflow-hidden bg-white">
        <div className="absolute inset-0 h-full w-full">
          <video
            src="/video/hero_video_2.mp4"
            className="h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
          />
        </div>
      </section>
      {/* Section 4: Lipstick Products */}
      <section className="py-16 sm:py-24 bg-white">
        <PageContainer>
          <div className="mb-12 text-center">
            <h2 className="font-theseasons text-4xl md:text-5xl font-bold text-[#141c35] mb-4">
              Lip color, edited well.
            </h2>
            <p className="mx-auto max-w-2xl font-matter text-lg text-[#7a6f68]">
              Explore lip products that deliver strong payoff, comfortable wear.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lipstickProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </PageContainer>
      </section>
      <VirtualLipstickTryOn />

      {/* Section 2: Start by category */}
      <section className="min-h-[clamp(42rem,100svh,70rem)] overflow-hidden py-12 sm:py-16 lg:py-20">
        <PageContainer>
          <div className="flex min-h-[clamp(42rem,100svh,70rem)] flex-col justify-center py-0">
            <div className="mb-8 flex flex-col items-center gap-5 text-center sm:mb-10">
              <div data-home-reveal>
                <h2 className="max-w-2xl font-theseasons text-[clamp(2.35rem,5vw,4.5rem)] leading-[0.95]">
                  Start by category.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl font-matter text-[clamp(0.98rem,1.35vw,1.1rem)] leading-[1.8] text-[#6c6c74]">
                  Browse the collection by category to find the products that
                  fit your routine fastest.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {essentialsCategories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group block overflow-hidden border border-[#d9d7d1] bg-white transition-colors duration-300 hover:border-[#1d2c63] hover:shadow-[0_18px_40px_rgba(20,28,53,0.08)]"
                  data-home-reveal
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
                    <h3 className="mt-2 font-matter text-[clamp(1rem,1.5vw,1.15rem)] font-semibold tracking-[-0.03em] text-[#141c35]">
                      {category.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-56 font-matter text-[clamp(0.72rem,1vw,0.875rem)] leading-[1.7] text-[#6c6c74]">
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
          </div>
        </PageContainer>
      </section>

      {/* Section 3: WHERE SCIENCE MEETS NATURE */}
      {/* <ScienceMeetsNature /> */}

      {/* Section 5: HOW THIS WORKS */}
      {/* <HowThisWorks /> */}

      {/* Section 7: Value Cards */}
      {/* <ValueCards /> */}

      {/* Section 8: Foundation Products */}
      {/* <section className="py-16 sm:py-24 bg-white">
        <PageContainer>
          <div className="mb-12 text-center">
            <h2 className="font-theseasons text-4xl md:text-5xl font-bold text-[#141c35] mb-4">
              Complexion that stays polished.
            </h2>
            <p className="mx-auto max-w-2xl font-matter text-lg text-[#7a6f68]">
              Build your base with foundation, cushion coverage, and setting
              products that smooth tone, control shine, and wear well across the
              day.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foundationProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </PageContainer>
      </section> */}

      {/* Section 10: Testimonials */}
      <TestimonialSection
        title="See what all the talk is about!"
        subtitle="Transformative Client experience from all around the globe"
        testimonials={testimonialsData}
      />

      {/* Section 11: CTA - Ready to Transform */}
      <ReadyToTransform />
    </div>
  );
}
