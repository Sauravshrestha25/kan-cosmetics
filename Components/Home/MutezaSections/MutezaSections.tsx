"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
// import Link from "next/link";
import PremiumButton from "@/Components/ui/ArrowBtn";
import "./MutezaSections.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const steps = [
  {
    num: "01",
    title: "TEST YOUR SHADE",
    copy: "Use our shade-matching guide or virtual try-on to find the tones that complement your natural features.",
  },
  {
    num: "02",
    title: "PREVIEW YOUR LOOK",
    copy: "After completing your shade match, you'll see your personalized recommendations and preview the products in your formula.",
  },
  {
    num: "03",
    title: "APPLY MAKEUP",
    copy: "Receive your curated products in a few days. They're designed to work with your existing routine.",
  },
  {
    num: "04",
    title: "ADAPT AND PERFECT",
    copy: "Each month, we'll adapt your routine so it continues to change as your skin and style change.",
  },
];

const reviews = [
  {
    quote:
      "Best first experience with a makeup product! Within 3 days, I saw changes to my skin — improving texture, moisture, and softening of fine lines.",
    author: "Michelle",
    stars: 5,
    image: null,
  },
  {
    quote:
      "It absorbs quickly and leaves my face feeling clean. It seemed to help clear up a few small breakout spots pretty quickly after I started using it.",
    author: "Jen",
    stars: 5,
    image: "/images/Testimonials/1.png",
  },
  {
    quote:
      "I don't wear makeup very often, but when I do I go for a natural, no-makeup look. This skin tint and concealer gives exactly that.",
    author: "Casey",
    stars: 0,
    image: "/images/Testimonials/2.png",
  },
  {
    quote:
      "This has already changed my skin in a month! And the ever-changing routine taking into account changes to my skincare regimen and seasonal changes is amazing!",
    author: "Delilah",
    stars: 5,
    image: null,
  },
  {
    quote:
      "I don't wear makeup very often, but when I do I go for a natural, no-makeup look. This skin tint and concealer gives exactly that. It helps even out my skin tone and looks very natural.",
    author: "Min",
    stars: 0,
    image: "/images/Testimonials/3.png",
  },
];

/* ─── Badge icons matching Muteza exactly ─── */
const NoFragranceIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M24 8c-2.5 0-4 1.5-4 4v7c0 2.5 1.5 4 4 4s4-1.5 4-4v-7c0-2.5-1.5-4-4-4z" />
    <path d="M20 23c-5 2-8 7-8 12 0 3 2.5 5 5 5h14c2.5 0 5-2 5-5 0-5-3-10-8-12" />
    <line x1="17" y1="6" x2="31" y2="42" strokeWidth="1.5" />
    <line x1="20" y1="8" x2="28" y2="8" />
  </svg>
);

const SulphateFreeIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="18" />
    <line x1="10" y1="10" x2="38" y2="38" strokeWidth="1.5" />
  </svg>
);

const GlutenFreeIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M24 6v36" />
    <path d="M24 12c-4-3-8-2-10 0 2 2 6 3 10 0" />
    <path d="M24 12c4-3 8-2 10 0-2 2-6 3-10 0" />
    <path d="M24 20c-4-3-8-2-10 0 2 2 6 3 10 0" />
    <path d="M24 20c4-3 8-2 10 0-2 2-6 3-10 0" />
    <path d="M24 28c-4-3-8-2-10 0 2 2 6 3 10 0" />
    <path d="M24 28c4-3 8-2 10 0-2 2-6 3-10 0" />
    <circle cx="24" cy="24" r="20" />
    <line x1="10" y1="10" x2="38" y2="38" strokeWidth="1.5" />
  </svg>
);

const CrueltyFreeIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M40 18c0 10-16 22-16 22S8 28 8 18a16 16 0 0 1 32 0z" />
    <path d="M24 14v10" />
    <path d="M19 19h10" />
  </svg>
);

const Star = () => (
  <svg className="mz-reviews__star" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ─── Component ─── */
export default function MutezaSections() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      /* ── Fade-up reveals ── */
      const revealEls = gsap.utils.toArray<HTMLElement>("[data-mz-reveal]");
      gsap.set(revealEls, { autoAlpha: 0, y: 40 });

      ScrollTrigger.batch(revealEls, {
        start: "top 92%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });

      /* ── Parallax on images ── */
      const parallaxEls = gsap.utils.toArray<HTMLElement>("[data-mz-parallax]");
      parallaxEls.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });

      /* ── Tilted bg parallax ── */
      const tiltedBg = rootRef.current?.querySelector<HTMLElement>(
        ".mz-science__tilted-bg",
      );
      if (tiltedBg) {
        gsap.fromTo(
          tiltedBg,
          { yPercent: -10, rotate: -8 },
          {
            yPercent: 10,
            rotate: -4,
            ease: "none",
            scrollTrigger: {
              trigger: tiltedBg.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      }

      /* ── Floating product images ── */
      const floatEls = gsap.utils.toArray<HTMLElement>(".mz-science__float");
      floatEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: -15 - i * 5 },
          {
            yPercent: 15 + i * 5,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1 + i * 0.3,
            },
          },
        );
      });

      /* ── Step items reveal ── */
      const stepEls = gsap.utils.toArray<HTMLElement>("[data-mz-step]");
      gsap.set(stepEls, { autoAlpha: 0, y: 30 });

      ScrollTrigger.batch(stepEls, {
        start: "top 90%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });

      /* ── Floating badges scale-in ── */
      const badgeEls = gsap.utils.toArray<HTMLElement>("[data-mz-badge]");
      gsap.set(badgeEls, { autoAlpha: 0, scale: 0.5 });

      ScrollTrigger.batch(badgeEls, {
        start: "top 88%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.7)",
            stagger: 0.15,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });

      /* ── Value cards slide up ── */
      const cardEls = gsap.utils.toArray<HTMLElement>("[data-mz-card]");
      gsap.set(cardEls, { autoAlpha: 0, y: 50 });

      ScrollTrigger.batch(cardEls, {
        start: "top 93%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.14,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });

      /* ── Review cards stagger ── */
      const reviewEls = gsap.utils.toArray<HTMLElement>("[data-mz-review]");
      gsap.set(reviewEls, { autoAlpha: 0, y: 40 });

      ScrollTrigger.batch(reviewEls, {
        start: "top 94%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.1,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          });
        },
      });

      /* ── CTA split reveal ── */
      const ctaLeft =
        rootRef.current?.querySelector<HTMLElement>("[data-mz-cta-left]");
      const ctaRight = rootRef.current?.querySelector<HTMLElement>(
        "[data-mz-cta-right]",
      );

      if (ctaLeft) {
        gsap.set(ctaLeft, { autoAlpha: 0, x: -60 });
        ScrollTrigger.create({
          trigger: ctaLeft.parentElement,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(ctaLeft, {
              autoAlpha: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            });
          },
        });
      }

      if (ctaRight) {
        gsap.set(ctaRight, { autoAlpha: 0, x: 60 });
        ScrollTrigger.create({
          trigger: ctaRight.parentElement,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(ctaRight, {
              autoAlpha: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              delay: 0.15,
              clearProps: "transform,opacity,visibility",
            });
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="mz-root">
      {/* ━━━ Section 1: WHERE SCIENCE MEETS NATURE ━━━
          Layout: 3 columns — heading | product on tilted bg | description
      */}
      <section className="mz-science">
        <div className="mz-science__inner">
          {/* Left: Large stacked heading */}
          <div
            className="mz-science__copy mz-science__copy--left"
            data-mz-reveal
          >
            <h2 className="mz-science__heading">
              <span>WHERE</span>
              <span>SCIENCE</span>
              <span>MEETS</span>
              <span>NATURE</span>
            </h2>
          </div>

          {/* Center: Product on tilted pink bg */}
          <div className="mz-science__art " data-mz-reveal>
            <div className="mz-science__tilted" />

            <div className="mz-science__product-img">
              <Image
                src="/KANWEBSITE/KAN PRODUCTS/lipstick.png"
                alt="KAN Cosmetics product"
                width={420}
                height={760}
                sizes="(min-width: 1024px) 18vw, 50vw"
                quality={90}
                className="h-auto w-full object-contain drop-shadow-[0_28px_48px_rgba(20,28,53,0.2)]"
              />
            </div>

            {/* Floating botanical accents */}
            <div className="mz-science__float mz-science__float--1">
              <Image
                src="/homepage_3_image_section/flopet.png"
                alt=""
                width={320}
                height={320}
                className="h-full w-full object-contain object-top drop-shadow-[0_12px_20px_rgba(220,70,140,0.2)]"
              />
            </div>
            <div className="mz-science__float mz-science__float--2">
              <Image
                src="/homepage_3_image_section/peelpet.png"
                alt=""
                width={330}
                height={520}
                className="h-full w-full object-contain object-top drop-shadow-[0_12px_20px_rgba(255,146,66,0.18)]"
              />
            </div>
            <div className="mz-science__float mz-science__float--3">
              <Image
                src="/homepage_3_image_section/flopet.png"
                alt=""
                width={320}
                height={320}
                className="h-full w-full object-contain object-bottom drop-shadow-[0_12px_20px_rgba(120,170,40,0.2)]"
              />
            </div>
            <div className="mz-science__float mz-science__float--4">
              <Image
                src="/homepage_3_image_section/peelpet.png"
                alt=""
                width={280}
                height={420}
                className="h-full w-full object-contain object-bottom drop-shadow-[0_12px_20px_rgba(90,180,40,0.18)]"
              />
            </div>
          </div>

          {/* Right: Description paragraph */}
          <div
            className="mz-science__copy mz-science__copy--right"
            data-mz-reveal
          >
            <p className="mz-science__description">
              Each and every formula contains ingredients in the dosages that
              will do the most for your skin right now. Your formula keeps
              changing as your skin changes! mco sint eiusmod culpa consuat en
              Mollit nostrud qui magna moollit nisi est officialin eudesece ecat
              adipisicing fugiat.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ Section 2: HOW THIS WORKS ━━━
          Layout: centered header, then grid: portrait LEFT | steps RIGHT
          Each step: number | TITLE (uppercase serif) | description (aligned right)
          Horizontal dividers between steps
      */}
      <section className="mz-howworks">
        <div className="mz-howworks__header" data-mz-reveal>
          <p className="mz-howworks__subtitle">HOW IT WORKS</p>
          <h2 className="mz-howworks__title">How this works</h2>
          <p className="mz-howworks__desc">
            We take care of everything, you just have to find your shade and
            apply.
          </p>
        </div>

        <div className="mz-howworks__body">
          {/* Portrait on left */}
          <div className="mz-howworks__portrait" data-mz-reveal>
            <Image
              src="/homepage_3_image_section/aboutpage_img.png"
              alt="KAN Cosmetics beauty portrait"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={85}
              className="object-cover"
              data-mz-parallax
            />
          </div>

          {/* Steps on right */}
          <ul className="mz-howworks__steps">
            {steps.map((step) => (
              <li key={step.num} className="mz-howworks__step" data-mz-step>
                <span className="mz-howworks__step-num">{step.num}</span>
                <h3 className="mz-howworks__step-title">{step.title}</h3>
                <p className="mz-howworks__step-desc">{step.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ━━━ Section 3: Feature Badges ━━━
          Layout: center rectangular portrait, 4 badges positioned at corners
          No heading. Badges: icon + uppercase label
      */}
      <section className="mz-badges">
        <div className="mz-badges__inner">
          {/* Central portrait - rectangular */}
          <div className="mz-badges__portrait" data-mz-reveal>
            <Image
              src="/homepage_3_image_section/CTA_Girl.png"
              alt="KAN Cosmetics model"
              fill
              sizes="(min-width: 1024px) 35vw, 80vw"
              quality={88}
              className="object-cover object-top"
              data-mz-parallax
            />
          </div>

          {/* Desktop badges */}
          <div
            className="mz-badges__badge mz-badges__badge--tl hidden lg:flex"
            data-mz-badge
          >
            <div className="mz-badges__icon">
              <NoFragranceIcon />
            </div>
            <span className="mz-badges__label">No Added Fragrance</span>
          </div>

          <div
            className="mz-badges__badge mz-badges__badge--tr hidden lg:flex"
            data-mz-badge
          >
            <div className="mz-badges__icon">
              <GlutenFreeIcon />
            </div>
            <span className="mz-badges__label">Gluten-free</span>
          </div>

          <div
            className="mz-badges__badge mz-badges__badge--bl hidden lg:flex"
            data-mz-badge
          >
            <div className="mz-badges__icon">
              <SulphateFreeIcon />
            </div>
            <span className="mz-badges__label">Sulphate Free</span>
          </div>

          <div
            className="mz-badges__badge mz-badges__badge--br hidden lg:flex"
            data-mz-badge
          >
            <div className="mz-badges__icon">
              <CrueltyFreeIcon />
            </div>
            <span className="mz-badges__label">Cruelty-free</span>
          </div>
        </div>

        {/* Mobile badges grid */}
        <div
          className="mz-badges__mobile-grid lg:hidden"
          style={{ padding: "0 1.5rem", marginTop: "2rem" }}
        >
          {[
            { icon: <NoFragranceIcon />, label: "No Added Fragrance" },
            { icon: <GlutenFreeIcon />, label: "Gluten-free" },
            { icon: <SulphateFreeIcon />, label: "Sulphate Free" },
            { icon: <CrueltyFreeIcon />, label: "Cruelty-free" },
          ].map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-2"
              data-mz-badge
            >
              <div className="mz-badges__icon">{b.icon}</div>
              <span className="mz-badges__label">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ Section 4: Value Cards ━━━
          Layout: 3 tall cards side by side, each with:
          serif uppercase title, paragraph, product image at bottom
          Slightly different bg tones per card
      */}
      <section className="mz-values">
        <div className="mz-values__cards">
          <div className="mz-values__card" data-mz-card>
            <h3 className="mz-values__card-title">
              ADAPTS TO
              <br />
              YOUR NEEDS
            </h3>
            <p className="mz-values__card-desc">
              As you discover your style each month, your formulation will
              continue to adapt to the changing needs of your skin.
            </p>
            <div className="mz-values__card-img">
              <Image
                src="/KANWEBSITE/KAN PRODUCTS/compact powder.jpg"
                alt="Adapts to your needs"
                fill
                sizes="18vw"
                quality={80}
                className="object-contain"
              />
            </div>
          </div>

          <div className="mz-values__card" data-mz-card>
            <h3 className="mz-values__card-title">
              BEST
              <br />
              INGREDIENTS
            </h3>
            <p className="mz-values__card-desc">
              Developed with natural ingredients, the only scents you&apos;ll
              find in our products come from nature.
            </p>
            <div className="mz-values__card-img">
              <Image
                src="/KANWEBSITE/KAN PRODUCTS/beauty bleander.png"
                alt="Best ingredients"
                fill
                sizes="18vw"
                quality={80}
                className="object-contain"
              />
            </div>
          </div>

          <div className="mz-values__card" data-mz-card>
            <h3 className="mz-values__card-title">
              YOUR PERFECT
              <br />
              DOSE
            </h3>
            <p className="mz-values__card-desc">
              Each formula contains ingredients in the dosages that will do the
              most for your skin at that time.
            </p>
            <div className="mz-values__card-img">
              <Image
                src="/KANWEBSITE/KAN PRODUCTS/MASCARA.png"
                alt="Your perfect dose"
                fill
                sizes="18vw"
                quality={80}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Section 5: Reviews ━━━
          Layout: 3 staggered columns (Muteza-style masonry)
          Column 1: text review, then star + text review
          Column 2: image + text review, then image + text review
          Column 3: image + text review, then text review
      */}
      <section className="mz-reviews">
        <div className="mz-reviews__header" data-mz-reveal>
          <h2 className="mz-reviews__title">REVIEWS</h2>
        </div>

        <div className="mz-reviews__grid">
          {/* Column 1 */}
          <div className="mz-reviews__col">
            <div className="mz-reviews__card" data-mz-review>
              {reviews[0].stars > 0 && (
                <div className="mz-reviews__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              )}
              <p className="mz-reviews__quote">{reviews[0].quote}</p>
              <p className="mz-reviews__author">— {reviews[0].author}</p>
            </div>

            <div className="mz-reviews__card" data-mz-review>
              {reviews[3].stars > 0 && (
                <div className="mz-reviews__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              )}
              <p className="mz-reviews__quote">{reviews[3].quote}</p>
              <p className="mz-reviews__author">— {reviews[3].author}</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="mz-reviews__col">
            <div className="mz-reviews__card" data-mz-review>
              {reviews[1].image && (
                <div className="mz-reviews__card-img">
                  <Image
                    src={reviews[1].image}
                    alt={reviews[1].author}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    quality={80}
                    className="object-cover"
                  />
                </div>
              )}
              <p className="mz-reviews__quote">{reviews[1].quote}</p>
              <p className="mz-reviews__author">— {reviews[1].author}</p>
            </div>

            <div className="mz-reviews__card" data-mz-review>
              {reviews[4].image && (
                <div className="mz-reviews__card-img">
                  <Image
                    src={reviews[4].image}
                    alt={reviews[4].author}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    quality={80}
                    className="object-cover"
                  />
                </div>
              )}
              <p className="mz-reviews__quote">{reviews[4].quote}</p>
              <p className="mz-reviews__author">— {reviews[4].author}</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="mz-reviews__col">
            <div className="mz-reviews__card" data-mz-review>
              {reviews[2].image && (
                <div className="mz-reviews__card-img">
                  <Image
                    src={reviews[2].image}
                    alt={reviews[2].author}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    quality={80}
                    className="object-cover"
                  />
                </div>
              )}
              <p className="mz-reviews__quote">{reviews[2].quote}</p>
              <p className="mz-reviews__author">— {reviews[2].author}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Section 6: CTA — Ready to Transform ━━━
          Layout: 50/50 split — large portrait LEFT | heading + button RIGHT
          Big serif heading "READY TO TRANSFORM YOUR SKIN?"
          Salmon/peach CTA button
      */}
      <section className="mz-cta">
        <div className="mz-cta__inner">
          {/* Left: Full-bleed portrait */}
          <div className="mz-cta__image" data-mz-cta-left>
            <Image
              src="/homepage_3_image_section/aboutpage_img.png"
              alt="Transform your look with KAN"
              fill
              sizes="50vw"
              quality={88}
              className="object-cover object-top"
            />
          </div>

          {/* Right: Content */}
          <div className="mz-cta__content" data-mz-cta-right>
            <h2 className="mz-cta__heading">
              READY TO
              <br />
              TRANSFORM
              <br />
              YOUR LOOK?
            </h2>

            <PremiumButton
              href="/collection"
              text="SEE PRODUCTS ⟶"
              showDots={false}
              className="mt-2 rounded-none border-[#f8becd]! px-6 py-3 text-[0.68rem] tracking-[0.18em] shadow-none"
              style={
                {
                  "--btn-bg": "#f8becd",
                  "--btn-fill": "#ffffff",
                  "--btn-text": "#1d2c63",
                  "--btn-hover-text": "#1d2c63",
                } as CSSProperties
              }
            />

            <div className="mz-cta__divider" style={{ marginTop: "3rem" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
