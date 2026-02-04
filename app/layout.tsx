import type { Metadata } from "next";
import localFont from "next/font/local"

import "./globals.css";
import Navbar from "@/Components/Layout/Navbarv2/Navbar";

const matter = localFont({
  src: [
    {
      path: "../public/fonts/Matter-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
     path: "../public/fonts/Matter-Medium.woff2",
      weight: "600",
      style: " normal",
    },
    {
      path: "../public/fonts/Matter-Regular.woff2",
      weight: "400",
      style: " normal",
    }
  ],
  variable: "--font-matter",
  display: "block",
});
const saolDisplay = localFont({
  src: [
    {
      path: "../public/fonts/SaolDisplay-LightItalic.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SaolDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
     path: "../public/fonts/SaolDisplay-Medium.woff2",
      weight: "600",
      style: " normal",
    },
    {
      path: "../public/fonts/SaolDisplay-Regular.woff2",
      weight: "400",
      style: " normal",
    }
  ],
  variable: "--font-saolDisplay",
  display: "block",
});


export const metadata: Metadata = {
  title: "K & N",
  description: "Korea & Nepal - Cosmetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${matter.variable} ${saolDisplay.variable}  antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
