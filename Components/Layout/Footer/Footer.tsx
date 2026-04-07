"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import PremiumButton from "@/Components/ui/ArrowBtn";
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
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4.5 w-4.5"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4.5 w-4.5"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
          <PremiumButton
            text="Subscribe"
            type="submit"
            showDots={false}
            className="h-14 rounded-none px-8 text-sm tracking-[0.18em]! sm:min-w-37 [--btn-bg:#1d2c63] [--btn-fill:#ffffff] [--btn-text:#ffffff] [--btn-hover-text:#1d2c63]"
          />
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
                      className="font-matter text-[1rem] text-kan-brand transition-colors hover:text-kan-brand/80"
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
                      <WhatsAppIcon />
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
            © {new Date().getFullYear()} | All Rights Reserved | KAN
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
            <Link
              href="https://www.webxnepal.com"
              target="_blank"
              className="pb-1"
            >
              <Image
                src="/images/Logo/Logo_LightMode.jpeg"
                alt="WebX Nepal"
                width={50}
                height={50}
                className="h-auto w-auto"
              ></Image>
            </Link>
          </div>
        </PageContainer>
      </div>
    </footer>
  );
};

export default Footer;
