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
    <footer className="relative w-full bg-[#141c35] pt-28 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black pointer-events-none" />

      <div className="mx-auto px-8 z-40 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-24 border-b border-white/10 items-end">
          <div>
            <h3 className="text-4xl md:text-6xl text-white mb-6 leading-tight">
              Join the <br /> <span className="italic font-light text-neutral-400">Inner Circle</span>
            </h3>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-xl tracking-wider leading-relaxed">
              Receive the blueprint for timeless beauty. Exclusive ritual guides and seasonal releases.
            </p>
          </div>

          <form 
            onSubmit={handleSubscribe} 
            className="flex flex-col sm:flex-row items-stretch bg-transparent border-2 border-neutral-700 focus-within:border-white transition-colors overflow-hidden mb-4"
          >
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex grow bg-transparent px-6 py-6 text-2xl text-white focus:outline-none placeholder:text-neutral-700 font-medium"
            />
            <motion.button 
              type="submit"
              whileHover={{ backgroundColor: "#000000", color: "#ffffff", scale: 1.02 }}
              className="bg-black text-white px-12 py-6 text-sm uppercase tracking-[0.3em] font-black border-l-2 border-neutral-700 hover:border-white transition-all"
            >
              Subscribe
            </motion.button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 py-28">
          <div className="space-y-8">
            <Image 
              src="/images/new_logo.png" 
              alt="Korea and Nepal" 
              width={220} 
              height={70} 
              className="opacity-100"
            />
            <p className="text-lg md:text-xl tracking-wider leading-relaxed text-white font-medium">
              Where Korean science meets <br/> Himalayan purity.
            </p>
          </div>

          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-md uppercase tracking-[0.2em] font-black mb-10 opacity-90 border-l-2 border-white/20 pl-4">
                {section.title}
              </h4>
              <ul className="space-y-6">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-neutral-300 text-xl md:text-2xl hover:text-white transition-all tracking-wider inline-block font-medium">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white text-md uppercase tracking-[0.2em] font-black mb-10 opacity-90 border-l-2 border-white/20 pl-4">
              Inquiries
            </h4>
            <div className="space-y-6">
              <a href={`mailto:${CONTACT_INFO.email}`} className="block text-xl md:text-2xl text-neutral-300 tracking-wider hover:text-white transition-colors font-medium">
                {CONTACT_INFO.email}
              </a>
              <a href={`tel:${CONTACT_INFO.phone}`} className="block text-xl md:text-2xl text-neutral-300 tracking-wider hover:text-white transition-colors font-medium">
                {CONTACT_INFO.phone}
              </a>
              <div className="flex gap-8 pt-6">
                {CONTACT_INFO.socials.map((social, i) => (
                  <a key={i} href={social.href} className="text-gray-300 hover:text-white transition-transform hover:-translate-y-1 text-3xl">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-16 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-[0.2em] text-gray-300 font-bold">
          <p>© {currentYear} KOREA AND NEPAL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-12 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors underline underline-offset-8 decoration-white/10">Privacy</a>
            <a href="#" className="hover:text-white transition-colors underline underline-offset-8 decoration-white/10">Terms</a>
          </div>
        </div>
      </div>

      <div className="lg:flex hidden  -mt-30 -mb-36">
        <TextHoverEffect text="K A N" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;