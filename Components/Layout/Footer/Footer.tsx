"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PageContainer } from "@/Components/ui/design-system";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M14.5 3v10.2a3.8 3.8 0 1 1-3.8-3.8" />
    <path d="M14.5 3c.7 2.8 2.3 4.5 4.9 5" />
  </svg>
);

const leftGroups = [
  {
    title: "Explore",
    links: [
      { label: "All Collections", href: "/collection" },
      { label: "Lipstick Try-on", href: "/try-on" },
      { label: "Articles", href: "/articles" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Orders", href: "/orders" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const rightGroups = [
  {
    title: "Brand",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "New Arrivals", href: "/collection" },
    ],
  },
];

const footerSocials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1KjBH55Fgo/?mibextid=wwXIfr",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kan_nepal?igsh=MTB1bmRtMjE4Z2d0eA==",
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@kan_nepal?_r=1&_t=ZS-94l08i3XvQf",
    icon: TikTokIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/9779800000000",
    icon: FaWhatsapp,
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[#ded8ce] bg-white text-[#141c35] pt-8">
      <PageContainer className="relative py-12 lg:py-16 ">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12">
          <div className="grid gap-10 sm:grid-cols-2">
            {leftGroups.map((group) => (
              <div key={group.title}>
                <p className="font-matter text-[0.68rem] uppercase tracking-[0.24em] text-[#8d8479]">
                  {group.title}
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="font-matter text-[0.98rem] text-[#141c35] transition-colors hover:text-kan-brand-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="order-first flex flex-col items-center justify-center gap-7 text-center lg:order-0">
            <Image
              src="/images/Logo/Logo_Latest.svg"
              alt="KAN Korea & Nepal"
              width={430}
              height={165}
              className="h-auto w-[min(17rem,60vw)] sm:w-[min(21rem,46vw)] lg:w-[min(24rem,24vw)]"
            />

            <p className="max-w-sm font-matter text-sm leading-7 text-[#6c6c74]">
              Modern cosmetics shaped with refined color, polished texture, and
              a cleaner everyday finish.
            </p>

            <div className="flex items-center justify-center gap-3">
              {footerSocials.map((social) => {
                const Icon = social.icon;
                const isWhatsApp = social.label === "WhatsApp";
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9cfc1] bg-white text-[#1d2c63] transition-colors hover:border-[#1d2c63] hover:bg-[#1d2c63] hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon
                      className={[
                        "h-5 w-5",
                        isWhatsApp ? "text-kan-brand" : "",
                      ].join(" ")}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:justify-items-end">
            {rightGroups.map((group) => (
              <div key={group.title} className="w-full">
                <p className="font-matter text-[0.68rem] uppercase tracking-[0.24em] text-[#8d8479]">
                  {group.title}
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="font-matter text-[0.98rem] text-[#141c35] transition-colors hover:text-[#1d2c63]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="w-full lg:max-w-sm lg:justify-self-end">
              <p className="font-matter text-[0.68rem] uppercase tracking-[0.24em] text-[#8d8479]">
                Contact
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4efe8]">
                    <Mail className="h-4.5 w-4.5 text-[#1d2c63]" />
                  </div>
                  <div>
                    <p className="font-matter text-[0.68rem] uppercase tracking-[0.16em] text-[#8f857d]">
                      Email
                    </p>
                    <p className="font-matter text-sm text-[#141c35]">
                      support@kancosmetics.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4efe8]">
                    <Phone className="h-4.5 w-4.5 text-[#1d2c63]" />
                  </div>
                  <div>
                    <p className="font-matter text-[0.68rem] uppercase tracking-[0.16em] text-[#8f857d]">
                      Phone
                    </p>
                    <p className="font-matter text-sm text-[#141c35]">
                      +977 01-410458
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4efe8]">
                    <MapPin className="h-4.5 w-4.5 text-[#1d2c63]" />
                  </div>
                  <div>
                    <p className="font-matter text-[0.68rem] uppercase tracking-[0.16em] text-[#8f857d]">
                      Address
                    </p>
                    <p className="font-matter text-sm leading-6 text-[#141c35]">
                      Nepal, Kathmandu-10
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-[#ded8ce] pt-6 text-sm text-[#6c6c74] md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p className="font-matter text-center md:text-left">
            © {new Date().getFullYear()} | All Rights Reserved | KAN
          </p>

          <div className="flex items-center justify-center gap-8 font-matter">
            <Link href="/privacy-policy" className="hover:text-[#1d2c63]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#1d2c63]">
              Terms &amp; Conditions
            </Link>
          </div>

          <Link
            href="https://www.webxnepal.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-3 text-[#141c35] md:justify-end md:justify-self-end"
          >
            <span className="font-matter text-sm transition-colors group-hover:text-[#1d2c63]">
              Design by WebX Nepal
            </span>
            <Image
              src="/images/Logo/Logo_LightMode.jpeg"
              alt="WebX Nepal"
              width={243}
              height={76}
              className="h-6 w-auto object-contain"
            />
          </Link>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
