"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatNpr, Product } from "@/lib/products";
import PremiumButton from "@/Components/ui/ArrowBtn";
import RatingStars from "./RatingStars";
import { addToCart, CART_EVENT, getProductCartQuantity } from "@/lib/cart";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const syncCart = () => {
      setCartQuantity(getProductCartQuantity(product.id));
    };

    syncCart();
    window.addEventListener(CART_EVENT, syncCart);

    return () => {
      window.removeEventListener(CART_EVENT, syncCart);
    };
  }, [product.id]);

  return (
    <div className="group relative border border-[#d9d7d1] bg-white transition-shadow duration-300 hover:shadow-[0_22px_50px_rgba(20,28,53,0.08)]">
      <Link href={`/collection/${product.slug}`} className="block">
        <div className="relative aspect-square border-b border-[#ece8e1] p-6">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 180px, (min-width: 1024px) 16vw, (min-width: 768px) 24vw, 50vw"
            quality={70}
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-5">
          <p className="mb-2 font-matter text-[0.72rem] uppercase tracking-[0.18em] text-[#8d827c]">
            {product.category}
          </p>
          <h3 className="mb-3 font-matter text-lg font-semibold tracking-[-0.03em] text-[#141c35] line-clamp-1">
            {product.name}
          </h3>

          <RatingStars
            rating={product.rating}
            reviews={product.reviews}
            size="sm"
          />

          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="font-matter text-[0.68rem] uppercase tracking-[0.2em] text-[#98a2b3]">
                Price
              </p>
              <span className="mt-1 block font-matter text-xl font-bold text-[#141c35]">
                {formatNpr(product.price)}
              </span>
            </div>

            <div className="h-px flex-1 bg-[#ece8e1]" />
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-3 border-t border-[#ece8e1] p-3">
        <PremiumButton
          text="View Product"
          href={`/collection/${product.slug}`}
          showDots={false}
          className="w-full justify-center whitespace-nowrap rounded-none border-[#d9d7d1] px-4 py-3 text-xs !tracking-[0.16em] [--btn-bg:#ffffff] [--btn-fill:#1d2c63] [--btn-text:#1d2c63] [--btn-hover-text:#ffffff]"
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
          endSlot={
            <span className="inline-flex items-center">
              {cartQuantity > 0 ? (
                <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-[#1d2c63] transition-colors duration-300 group-hover/premium-btn:bg-[#1d2c63] group-hover/premium-btn:text-white">
                  {cartQuantity}
                </span>
              ) : null}
            </span>
          }
          className="w-full justify-center whitespace-nowrap rounded-none border-[#1d2c63] px-4 py-3 text-xs !tracking-[0.16em] [--btn-bg:#1d2c63] [--btn-fill:#ffffff] [--btn-text:#ffffff] [--btn-hover-text:#1d2c63]"
        />
      </div>
    </div>
  );
}
