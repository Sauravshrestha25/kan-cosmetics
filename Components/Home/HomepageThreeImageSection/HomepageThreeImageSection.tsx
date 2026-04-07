"use client";

import Image from "next/image";
import { PageContainer, Section } from "@/Components/ui/design-system";

const images = [
  {
    src: "/homepage_3_image_section/leftimg.jpg",
    alt: "KAN beauty editorial left visual",
  },
  {
    src: "/homepage_3_image_section/centerimg.jpg",
    alt: "KAN beauty editorial center visual",
  },
  {
    src: "/homepage_3_image_section/right image.jpg",
    alt: "KAN beauty editorial right visual",
  },
];

export default function HomepageThreeImageSection() {
  return (
    <Section className="bg-[#f8f4ee] py-6 sm:py-8 lg:py-10">
      <PageContainer>
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {images.map((image) => (
            <div key={image.src}>
              <div className="relative aspect-[5/7] overflow-hidden bg-[#e9e2d8]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}
