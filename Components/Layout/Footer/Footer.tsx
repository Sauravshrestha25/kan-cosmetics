"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FooterBackgroundGradient } from "@/Components/ui/hover-footer";
import { TextHoverEffect } from "@/Components/ui/hover-footer";
import { Footer } from "@/Components/ui/footer";

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
    <footer className="relative w-full bg-white  backdrop-blur-2xl overflow-hidden  font-montserrat! px-12">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] pointer-events-none" /> */}
      <div className="relative h-full z-20 ">
        {/* Newsletter */}
        <div className="relative z-40 mx-auto px-2">
          <div className="flex flex-col sm:flex-row justify-between items-end">
            <div className="space-y-10 ">
              <h3 className="text-4xl  font-theseasons md:text-6xl xl:text-8xl text-[#2b3962] leading-[1.05] tracking-tight">
                Join the <br />
                <span className="  text-[#2b3962]">
                  Inner Circle
                </span>
              </h3>

              <p className="text-xl md:text-2xl text-[#2b3962] max-w-xl tracking-wide font-montserrat leading-relaxed">
                Receive the blueprint for timeless beauty — ritual knowledge,
                private releases, and seasonal formulations.
              </p>
            </div>

            {/* SUBSCRIBE */}
            <div className="flex flex-col gap-8">
              <form
                onSubmit={handleSubscribe}
                className="
          group flex flex-col sm:flex-row items-stretch
          border border-[#2b3962] focus-within:border-white
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
            flex-1 bg-transparent px-8 py-7 w-120
            text-xl text-black
            placeholder:text-neutral-600
            focus:outline-[#2b3962] tracking-wide
          "
                />

                <motion.button
                  type="submit"
                  whileHover={{
                    backgroundColor: "#2b3962",
                    color: "#ffffff",
                    letterSpacing: "0.45em",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="
            bg-[#2b3962] text-white px-14 py-7
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
          </div>

          {/* ===================== FOOTER GRID ===================== */}

          <div className="w-full">
            <Footer
              brandName="Korea and Nepal"
              socialLinks={[
                {
                  icon: <FaTwitter className="h-5 w-5" />,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  icon: <FaInstagram className="h-5 w-5" />,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  icon: <FaFacebook className="h-5 w-5" />,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
              ]}
              mainLinks={[
                { href: "/", label: "Home" },
                { href: "/collection", label: "Collection" },
                { href: "/about", label: "About" },
                { href: "/journal", label: "Journal" },
              ]}
              legalLinks={[
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
              ]}
              copyright={{
                text: "© 2026 Korea & Nepal. ",
                license: " All rights reserved",
              }}
            />
          </div>
        </div>
      </div>

      <div className=" z-10 -mt-30 -mb-36 ">
        <TextHoverEffect text="KOREA & NEPAL" className="z-50 " />
      </div>

      {/* <FooterBackgroundGradient /> */}
    </footer>
  );
}

export default HoverFooter;
