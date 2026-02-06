import { Button } from "@/Components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  imageUrl?: string;
  brandName: string;
  socialLinks: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    text: string;
    license?: string;
  };
}

export function Footer({
  imageUrl,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-6 pt-16 mb-20 lg:pb-8  text-[#2b3962] font-montserrat">
      <div className="px-2">
        <div className="md:flex md:items-start md:justify-between">
          {imageUrl && (
            <a
              href="/"
              className="flex items-center gap-x-2"
              aria-label={brandName}
            >
              <Image src={imageUrl} width={120} height={200} alt="kan"></Image>
            </a>
          )}
          <div className="flex flex-col gap-12 items-end sm:flex-row">
            <ul className="flex items-end gap-8 font-medium">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-xl  underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex items-end gap-8">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-[#141c35]/20 hover:pb-2"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          
        </div>
        <div className="flex justify-between border-t pt-8 mt-2">

      
        <div className="  flex gap-1 justify-between">
       
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
          <div>
             <div className="flex gap-4 ">
            <p>Designed & Developed by: </p>
            <Link href="https://www.webxnepal.com" target="_blank"><Image src="/images/Logo/Logo_LightMode.jpeg" alt="WebX Nepal" width={60} height={0}></Image></Link>
          </div>
          </div>
            </div>
</div>
    </footer>
  );
}
