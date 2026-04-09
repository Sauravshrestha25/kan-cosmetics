"use client";

import React from "react";
// import Link from "next/link";
import {
  PageContainer,
  Section,
  SectionHeading,
} from "@/Components/ui/design-system";
import ProductCard from "@/Components/Shop/ProductCard";
import { featuredProducts } from "@/lib/products";

const ProductShowcase = () => {
  return (
    <Section className="w-full pt-6 sm:pt-8 lg:pt-10">
      <PageContainer className="max-w-375">
        <SectionHeading
          align="center"
          className="mx-auto max-w-3xl"
          eyebrow=""
          title="Featured Products"
          description="A curated set of essentials designed to feel elevated on the shelf and effortless in everyday use."
          // afterTitle={
          //   <Link
          //     href="/collection"
          //     className="inline-flex font-matter text-sm font-medium text-(--kan-heading) transition-colors hover:text-(--kan-brand-soft) sm:text-base"
          //   >
          //     View all collections
          //   </Link>
          // }
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-14 xl:grid-cols-4">
          {featuredProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export default ProductShowcase;
