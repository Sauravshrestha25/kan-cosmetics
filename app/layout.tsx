import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Layout/Navbarv2/Navbar";
import Footer from "@/Components/Layout/Footer/Footer";
import LenisProvider from "@/Components/LenisProvider";
import Audio from "@/Components/Layout/Audio/Audio";
import ToastProvider from "@/Components/Layout/ToastProvider";
import AppPreloader from "@/Components/Layout/AppPreloader";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
// import LipstickScene from "@/Components/Layout/LipstickLoader/LipstickAnimation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

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
    },
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
    },
  ],
  variable: "--font-saolDisplay",
  display: "block",
});

const theseasons = localFont({
  src: [
    {
      path: "../public/fonts/theseasons/TheSeasons-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/theseasons/TheSeasons-Light.ttf",
      weight: "300",
      style: " normal",
    },
    {
      path: "../public/fonts/theseasons/TheSeasons-Bold.ttf",
      weight: "700",
      style: " normal",
    },
    {
      path: "../public/fonts/theseasons/TheSeasons-Italic.ttf",
      weight: "300",
      style: " normal",
    },
    {
      path: "../public/fonts/theseasons/TheSeasons-Bold-Italic.ttf",
      weight: "700",
      style: " italic",
    },
    {
      path: "../public/fonts/theseasons/TheSeasons-Light-Italic.ttf",
      weight: "300",
      style: " italic",
    },
  ],
  variable: "--font-seasons",
  display: "block",
});

export const metadata: Metadata = {
  title: "KAN Cosmetics",
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
        className={`min-h-screen bg-[#fff5f0] ${matter.variable} ${saolDisplay.variable} ${montserrat.variable} ${theseasons.variable} antialiased`}
        suppressHydrationWarning
      >
        <StyledComponentsRegistry>
          <AppPreloader>
            {/* <LipstickScene /> */}
            <Audio />
            <LenisProvider />
            <ToastProvider />
            <Navbar />
            {children}
            <Footer />
          </AppPreloader>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
