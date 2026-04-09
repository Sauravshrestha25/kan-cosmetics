"use client";

import Image from "next/image";
import Link from "next/link";
import { formatNpr, Product } from "@/lib/products";
import PremiumButton from "@/Components/ui/ArrowBtn";
import RatingStars from "./RatingStars";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const imageContainerClassName = compact
    ? "relative aspect-[0.76/1] border-b border-[#ece8e1] p-0"
    : "relative aspect-square border-b border-[#ece8e1] p-6";
  const bodyClassName = compact ? "p-3 text-left" : "p-5";
  const titleClassName = compact
    ? "mb-1 font-matter text-[0.92rem] font-semibold tracking-[-0.03em] text-[#141c35] line-clamp-1"
    : "mb-3 font-matter text-lg font-semibold tracking-[-0.03em] text-[#141c35] line-clamp-1";
  const priceClassName = compact
    ? "mt-0.5 block font-matter text-[0.9rem] font-bold text-[#141c35]"
    : "mt-1 block font-matter text-xl font-bold text-[#141c35]";
  const actionsClassName = compact
    ? "grid grid-cols-2 gap-1.5 border-t border-[#ece8e1] p-1.5"
    : "grid grid-cols-2 gap-3 border-t border-[#ece8e1] p-3";
  const buttonClassName = compact
    ? "w-full justify-center whitespace-nowrap rounded-none border-[#d9d7d1] px-2 py-1.5 text-[9px] tracking-[0.12em]!"
    : "w-full justify-center whitespace-nowrap rounded-none border-[#d9d7d1] px-4 py-3 text-xs tracking-[0.16em]!";
  const imageClassName = compact
    ? "object-contain p-0 transition-transform duration-500 group-hover:scale-[1.03]"
    : "object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]";

  return (
    <div className="group relative border border-[#d9d7d1] bg-white transition-shadow duration-300 hover:shadow-[0_22px_50px_rgba(20,28,53,0.08)]">
      <Link href={`/collection/${product.slug}`} className="block">
        <div className={imageContainerClassName}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 180px, (min-width: 1024px) 16vw, (min-width: 768px) 24vw, 50vw"
            quality={70}
            className={imageClassName}
          />
        </div>

        <div className={bodyClassName}>
          <p className="mb-1 font-matter text-[0.64rem] uppercase tracking-[0.16em] text-[#8d827c] text-left">
            {product.category}
          </p>
          <h3 className={titleClassName}>
            {product.name}
          </h3>

          <RatingStars
            rating={product.rating}
            reviews={product.reviews}
            size="sm"
          />

          <div className="mt-2.5 flex items-end justify-between gap-2 text-left">
            <div>
              <p className="font-matter text-[0.62rem] uppercase tracking-[0.16em] text-[#98a2b3]">
                Price
              </p>
              <span className={priceClassName}>
                {formatNpr(product.price)}
              </span>
            </div>

            <div className="h-px flex-1 bg-[#ece8e1]" />
          </div>
        </div>
      </Link>

      <div className={actionsClassName}>
        <PremiumButton
          text="View Product"
          href={`/collection/${product.slug}`}
          showDots={false}
          className={buttonClassName}
          style={
            {
              "--btn-bg": "#ffffff",
              "--btn-fill": "#f8becd",
              "--btn-text": "#1d2c63",
              "--btn-hover-text": "#1d2c63",
            } as React.CSSProperties
          }
        />
        <PremiumButton
          text="Add To Cart"
          onClick={() => {
            const size = product.sizes[0];
            addToCart(product, { size });
            toast.success("Added to cart", {
              description: `${product.name}${size ? ` (${size})` : ""} is now in your cart.`,
              icon: (
                <span className="relative block h-10 w-10 border border-[#d9deea] bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="2.5rem"
                    className="object-contain p-1"
                  />
                </span>
              ),
            });
          }}
          showDots={false}
          className={`${buttonClassName} [--btn-bg:#ffffff] [--btn-fill:#f8becd] [--btn-text:#1d2c63] [--btn-hover-text:#1d2c63]`}
        />
      </div>
    </div>
  );
}
