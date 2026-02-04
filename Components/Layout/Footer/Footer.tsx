"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FooterBackgroundGradient } from "@/Components/ui/hover-footer";
import { TextHoverEffect } from "@/Components/ui/hover-footer";

// --- Configuration Data ---
const NAV_SECTIONS = [
  {
    title: "Discover",
    links: [
      { label: "Our Philosophy", href: "#" },
      { label: "The Science", href: "#" },
      { label: "Global Heritage", href: "#" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Client Care", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Store Locator", href: "#" },
    ],
  },
];

const CONTACT_INFO = {
  email: "contact@koreaandnepal.com",
  phone: "+977 9876543210",
  socials: [
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaFacebook />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
  ],
};

function HoverFooter() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing:", email);
  };

  return (
    <footer className="relative w-full bg-[#141c35] pt-28 overflow-hidden border-t border-white/10 font-matter!">
      <div className="relative overflow-hidden ">
        {/* ATMOSPHERIC OVERLAY */}
        <div className="absolute inset-0 k pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] pointer-events-none" />

        <div className="relative z-40  mx-auto px-2">
          {/* ===================== INNER CIRCLE ===================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-32 border-b border-white/10 items-end">
            <div className="space-y-10">
              <h3 className="text-4xl md:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight">
                Join the <br />
                <span className="italic font-light text-neutral-400">
                  Inner Circle
                </span>
              </h3>

              <p className="text-xl md:text-2xl text-neutral-400 max-w-xl tracking-wide leading-relaxed">
                Receive the blueprint for timeless beauty — ritual knowledge,
                private releases, and seasonal formulations.
              </p>
            </div>

            {/* SUBSCRIBE */}
            <form
              onSubmit={handleSubscribe}
              className="
          group flex flex-col sm:flex-row items-stretch
          border border-white/20 focus-within:border-white
          transition-all duration-500 overflow-hidden
          backdrop-blur-sm
        "
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="
            flex-1 bg-transparent px-8 py-7
            text-xl text-white
            placeholder:text-neutral-600
            focus:outline-none tracking-wide
          "
              />

              <motion.button
                type="submit"
                whileHover={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  letterSpacing: "0.45em",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="
            bg-white/5 text-white px-14 py-7
            text-xs uppercase font-bold
            tracking-[0.35em]
            border-t sm:border-t-0 sm:border-l border-white/20
            transition-all
          "
              >
                Subscribe
              </motion.button>
            </form>
          </div>

          {/* ===================== FOOTER GRID ===================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 py-32">
            {/* BRAND */}
            <div className="space-y-10">
              <Image
                src="/images/new_logo.png"
                alt="Korea and Nepal"
                width={220}
                height={70}
                className="opacity-95"
              />

              <p className="text-lg md:text-xl text-neutral-300 tracking-wide leading-relaxed">
                Where Korean science <br />
                meets Himalayan purity.
              </p>
            </div>

            {/* NAV SECTIONS */}
            {NAV_SECTIONS.map((section) => (
              <div key={section.title}>
                <h4
                  className="
            text-white text-xs uppercase font-bold
            tracking-[0.25em] mb-12 opacity-80
            relative pl-5
            before:absolute before:left-0 before:top-1
            before:h-5 before:w-0.5 before:bg-white/30
          "
                >
                  {section.title}
                </h4>

                <ul className="space-y-7">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="
                    group inline-block text-xl md:text-2xl
                    text-neutral-400 hover:text-white
                    tracking-wide transition-all
                  "
                      >
                        <span className="relative">
                          {link.label}
                          <span
                            className="
                      absolute left-0 -bottom-1 h-px w-0
                      bg-white transition-all duration-500
                      group-hover:w-full
                    "
                          />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* INQUIRIES */}
            <div>
              <h4
                className="
          text-white text-xs uppercase font-bold
          tracking-[0.25em] mb-12 opacity-80
          relative pl-5
          before:absolute before:left-0 before:top-1
          before:h-5 before:w-0.5 before:bg-white/30
        "
              >
                Inquiries
              </h4>

              <div className="space-y-8">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="block text-xl md:text-2xl text-neutral-400 hover:text-white transition"
                >
                  {CONTACT_INFO.email}
                </a>

                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="block text-xl md:text-2xl text-neutral-400 hover:text-white transition"
                >
                  {CONTACT_INFO.phone}
                </a>

                <div className="flex gap-10 pt-8">
                  {CONTACT_INFO.socials.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className="
                  text-neutral-400 hover:text-white
                  transition-transform duration-300
                  hover:-translate-y-1 text-3xl
                "
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===================== FOOTER BAR ===================== */}
          <div
            className="
      pb-16 pt-10 border-t border-white/10
      flex flex-col md:flex-row justify-between items-center
      text-[11px] uppercase tracking-[0.25em]
      text-neutral-400 font-bold
    "
          >
            <p>© {currentYear} KOREA AND NEPAL. ALL RIGHTS RESERVED.</p>

            <div className="flex gap-14 mt-6 md:mt-0">
              <a className="hover:text-white transition underline underline-offset-8 decoration-white/10">
                Privacy
              </a>
              <a className="hover:text-white transition underline underline-offset-8 decoration-white/10">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex hidden  -mt-30 -mb-36">
        <TextHoverEffect text="KOREA & NEPAL" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
