"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collection", href: "/collection" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();

  const [isActive, setIsActive] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";
  }, [isMobileOpen]);

  return (
    <>
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div className="relative flex items-center">
          <div
            onMouseLeave={() => setIsActive(false)}
            className={`absolute  top-1/2 -translate-y-1/2
              bg-black/80 rounded-xl
              transition-all duration-300 ease-in-out right-0
              ${
                isActive
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-4 pointer-events-none"
              }
            `}
          >
            <div className="flex flex-col gap-12 p-6 py-12 pl-8">
              <ul className="font-saolDisplay font-semibold text-4xl space-y-6 w-60 ">
                {navLinks.map((item, idx) => {
                  const active = pathname === item.href;
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className={`transition-all ease-in-out
                          ${
                            active
                              ? "text-white"
                              : "text-gray-400 hover:text-white hover:ml-2"
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="flex gap-4 text-xl text-white">
                <Link href="https://www.instagram.com" target="_blank">
                  <FaInstagram />
                </Link>
                <Link href="https://www.facebook.com" target="_blank">
                  <FaFacebook />
                </Link>
                <Link href="https://www.whatsapp.com" target="_blank">
                  <FaWhatsapp />
                </Link>
              </div>
            </div>
          </div>

          <div
            onMouseEnter={() => setIsActive(true)}
            className="font-saolDisplay font-semibold z-1 mr-2"
          >
            <p
              className={`text-sm rounded-full px-1 py-2 flex flex-col items-center leading-tight
                ${isActive ? "bg-white text-black" : "bg-black/60 text-white"}
              `}
            >
              {"MENU".split("").map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </p>
          </div>
        </div>
      </nav>

      <div className="fixed right-4 top-4 z-50 md:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="bg-black text-white rounded-full px-5 py-3 font-saolDisplay uppercase"
        >
          Menu
        </button>
      </div>

      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/95 z-40 md:hidden">
          <div className="flex flex-col justify-between h-full p-8">
            {/* Close */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-white text-sm self-end"
            >
              Close ✕
            </button>

            <ul className="font-saolDisplay text-4xl font-semibold space-y-8 ">
              {navLinks.map((item, idx) => {
                const active = pathname === item.href;

                return (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`block transition
                        ${active ? "text-white" : "text-gray-400"}
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex gap-6 text-white text-2xl">
              <FaInstagram />
              <FaFacebook />
              <FaWhatsapp />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
