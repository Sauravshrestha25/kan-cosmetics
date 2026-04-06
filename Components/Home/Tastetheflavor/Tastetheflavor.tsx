"use client";

import Image from "next/image";

const Tastetheflavor = () => {
  return (
    <section className="relative w-full bg-white">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-12 z-10 flex justify-center">
          <h2 className="font-matter text-center text-[clamp(2rem,4vw,4.25rem)] font-semibold leading-none tracking-[-0.06em] pr-30">
            <span className="relative -left-2.5 text-black">Taste </span>
            <span className="text-white">the</span>
            <span className="text-black"> flavor</span>
          </h2>
        </div>

        <Image
          src="/images/tastetheflavor.png"
          alt="A collection of lipstick shades in gold cases"
          width={1500}
          height={1000}
          className="h-auto w-full object-bottom"
        />
      </div>
    </section>
  );
};

export default Tastetheflavor;
