"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { PageContainer, SectionHeading } from "@/Components/ui/design-system";

const footerGroups = [
  {
    title: "Collections",
    links: [
      { label: "All Collections", href: "/collection" },
      { label: "Lipstick Try-on", href: "/try-on" },
      { label: "New Arrivals", href: "/collection" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Articles", href: "/articles" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "+977 9800000000", href: "tel:+9779800000000" },
      { label: "hello@kanbeauty.com", href: "mailto:hello@kanbeauty.com" },
      { label: "Kathmandu, Nepal", href: "/contact" },
    ],
  },
];

const TikTokIcon = () => (
  <svg
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4.5 w-4.5"
  >
    <path
      d="M171 53.2V175.1C171 175.1 151.5 168 139.4 168C111.9 168 90.6 189.2 90.6 216.7C90.6 244.3 111.9 265.5 139.4 265.5C166.9 265.5 188.1 244.3 188.1 216.7V162.3C198.4 167.9 211.1 171.3 224.8 171.3C223.3 156.5 216.7 144.1 206.6 135.6C196.1 126.8 183 122.5 169.2 122.5C168.7 122.5 168.2 122.5 167.7 122.5V53.2H171Z"
      fill="currentColor"
    />
    <path
      d="M107.2 86.8C117.7 86.8 127 83.2 133.8 76.4C140.5 69.7 144.1 60.4 144.1 49.9V28.6H127.1C126.6 38.5 122.4 47.8 115.1 54.6C107.7 61.4 97.5 64.2 87.5 63.1V84.3C94.5 85.1 101.2 86.8 107.2 86.8Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Subscribe:", email);
  };

  return (
    <footer className="mt-16 bg-zinc-100">
      <PageContainer className="flex flex-col items-center py-16 text-center lg:py-20">
        <SectionHeading
          align="center"
          className="max-w-4xl"
          title="Join Our Beauty Community"
          description="Be the first to know about new products, exclusive offers, and beauty tips."
          titleClassName="text-[clamp(2rem,4vw,3.5rem)] text-kan-heading"
          descriptionClassName="max-w-208 text-[clamp(1rem,1.7vw,1.45rem)] text-kan-copy"
        />

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-124 flex-col sm:max-w-172 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="h-14 flex-1 border border-kan-line-strong bg-white px-5 font-matter text-lg text-kan-heading outline-none transition-colors placeholder:text-kan-copy-muted focus:border-kan-brand"
          />
          <Button
            type="submit"
            variant="kanPrimary"
            size="kan"
            className="h-14 rounded-none px-8 text-lg sm:min-w-37"
          >
            Subscribe
          </Button>
        </form>
      </PageContainer>

      <div>
        <PageContainer className="border-t border-kan-line-strong py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="font-matter text-xs uppercase tracking-[0.22em] text-kan-copy-muted">
                  {group.title}
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="font-matter text-[1rem] text-kan-brand transition-colors hover:text-kan-brand-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                {group.title === "Contact" ? (
                  <div className="mt-5 flex items-center gap-3">
                    <Link
                      href="https://www.facebook.com/share/1KjBH55Fgo/?mibextid=wwXIfr"
                      aria-label="Facebook"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-kan-line-strong text-kan-brand transition-colors hover:border-kan-brand hover:bg-kan-brand hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Facebook className="h-4.5 w-4.5" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/kan_nepal?igsh=MTB1bmRtMjE4Z2d0eA=="
                      aria-label="Instagram"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-kan-line-strong text-kan-brand transition-colors hover:border-kan-brand hover:bg-kan-brand hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram className="h-4.5 w-4.5" />
                    </Link>
                    <Link
                      href="https://www.tiktok.com/@kan_nepal?_r=1&_t=ZS-94l08i3XvQf"
                      aria-label="TikTok"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-kan-line-strong text-kan-brand transition-colors hover:border-kan-brand hover:bg-kan-brand hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TikTokIcon />
                    </Link>
                    <Link
                      href="https://wa.me/9779800000000"
                      aria-label="WhatsApp"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-kan-line-strong text-kan-brand transition-colors hover:border-kan-brand hover:bg-kan-brand hover:text-white"
                    >
                      <MessageCircle className="h-4.5 w-4.5" />
                    </Link>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </PageContainer>

        <PageContainer className="flex min-h-76 items-center justify-center py-16">
          <Image
            src="/images/Logo/Logo_Latest.svg"
            alt="KAN Korea & Nepal"
            width={430}
            height={165}
            className="h-auto w-[min(28rem,78vw)]"
          />
        </PageContainer>

        <PageContainer className="flex flex-col gap-5 pb-5 text-sm text-kan-brand md:flex-row md:items-center md:justify-between">
          <p className="font-matter text-center md:text-left">
            @ Copyright 2025 | All Rights reserved | KAN
          </p>

          <div className="flex items-center justify-center gap-8 font-matter">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms &amp; Conditions
            </Link>
          </div>

          <div className="font-matter text-center md:text-right flex gap-1 items-center">
            <p> Design &amp; Development By:</p>
            <Link href="https://www.webxnepal.com" className="pb-1">
              <Image
                src="/images/Logo/Logo_LightMode.jpeg"
                alt="WebX Nepal"
                width={50}
                height={50}
              ></Image>
            </Link>
          </div>
        </PageContainer>
      </div>
    </footer>
  );
};

export default Footer;
