"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import "./FeatureBadges.css";

gsap.registerPlugin(ScrollTrigger);

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

export default function FeatureBadges() {
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
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="mz-badges">
      <div className="mz-badges__inner">
        <div className="mz-badges__portrait" data-mz-reveal>
          <Image
            src="/KANWEBSITE/KAN PRODUCTS/lipstick.png"
            alt="KAN Cosmetics model"
            fill
            sizes="(min-width: 1024px) 35vw, 80vw"
            quality={88}
            className="object-cover object-top"
            data-mz-parallax
          />
        </div>

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
  );
}
