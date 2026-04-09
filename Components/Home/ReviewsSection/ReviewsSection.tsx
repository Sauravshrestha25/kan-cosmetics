"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import "./ReviewsSection.css";

gsap.registerPlugin(ScrollTrigger);

const Star = () => (
  <svg className="mz-reviews__star" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

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

export default function ReviewsSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
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
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="mz-reviews">
      <div className="mz-reviews__header" data-mz-reveal>
        <h2 className="mz-reviews__title">REVIEWS</h2>
      </div>

      <div className="mz-reviews__grid">
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
  );
}
