"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CART_EVENT,
  clearCart,
  getStoredCartItems,
  removeFromCart,
  type CartItem,
  updateCartItemQuantity,
} from "@/lib/cart";
import { formatNpr } from "@/lib/products";
import { getSessionUser } from "@/lib/auth";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const syncCart = () => {
      setItems(getStoredCartItems());
    };

    syncCart();
    window.addEventListener(CART_EVENT, syncCart);

    return () => {
      window.removeEventListener(CART_EVENT, syncCart);
    };
  }, []);

  const handleCheckout = () => {
    const user = getSessionUser();

    if (!user) {
      // Store the current URL to redirect back after login
      if (typeof window !== "undefined") {
        sessionStorage.setItem("checkout-redirect", "true");
      }
      router.push("/login");
      return;
    }

    router.push("/checkout");
  };

  const updateQuantity = (item: CartItem, delta: number) => {
    const nextQuantity = item.quantity + delta;

    if (nextQuantity <= 0) {
      removeFromCart(item.productId, item.size);
      return;
    }

    updateCartItemQuantity(item.productId, nextQuantity, item.size);
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const shipping = items.length > 0 ? 0 : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  return (
    <main className="bg-white pt-28 pb-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 font-matter text-sm font-medium text-[#727272] transition-colors hover:text-[#141c35]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>

        <h1 className="mt-8 font-matter text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-[-0.06em] text-[#1f1f1f]">
          YOUR CART
        </h1>

        {items.length === 0 ? (
          <div className="mt-12 border border-[#ececec] bg-[#fbfcfe] px-6 py-16 text-center">
            <p className="font-matter text-2xl font-semibold text-[#202020]">
              Your cart is empty.
            </p>
            <p className="mt-3 font-matter text-base text-[#7a7a7a]">
              Add a few favorites from the collection and they&apos;ll appear
              here.
            </p>
            <Link
              href="/collection"
              className="mt-8 inline-flex h-12 items-center justify-center bg-[#111] px-8 font-matter text-sm font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#1d2c63]"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.75fr_0.9fr] lg:gap-10">
            <section className="lg:pr-6">
              <div className="space-y-6">
                {items.map((item) => {
                  const lineTotal = item.price * item.quantity;

                  return (
                    <article
                      key={`${item.productId}-${item.size ?? "default"}`}
                      className="grid gap-6 border-b border-[#ececec] pb-6 md:grid-cols-[auto_1.4fr_0.55fr_0.6fr_auto]"
                    >
                      <div className="relative h-20 w-20 overflow-hidden border border-[#efefef] bg-[#fafafa]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <h2 className="max-w-[18rem] font-matter text-xl font-medium leading-[1.2] text-[#202020]">
                          {item.name}
                        </h2>
                        <p className="font-matter text-sm text-[#8b8b8b]">
                          {item.size ? `Size: ${item.size}` : "Standard option"}
                        </p>
                        <p className="font-matter text-sm font-medium text-[#202020]">
                          {formatNpr(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 font-matter text-[#222]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e4e4e4] text-[#888] transition-colors hover:border-[#111] hover:text-[#111]"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-4 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e4e4e4] text-[#888] transition-colors hover:border-[#111] hover:text-[#111]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="font-matter">
                        <p className="text-[2rem] font-semibold leading-none text-[#202020]">
                          {formatNpr(lineTotal)}
                        </p>
                        <p className="mt-1 text-sm text-[#9d9d9d]">
                          {formatNpr(item.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.productId, item.size)
                        }
                        className="flex h-10 w-10 items-center justify-center border border-[#e4e4e4] text-[#888] transition-colors hover:border-[#111] hover:text-[#111]"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </article>
                  );
                })}
              </div>

              <div className="mt-12 flex flex-col gap-6 border-t border-[#efefef] pt-10 md:flex-row md:items-end md:justify-between">
                <div className="w-full max-w-104">
                  <p className="font-matter text-sm text-[#525252]">
                    Have a coupon? Enter your code.
                  </p>
                  <div className="mt-5 flex gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(event) => setCouponCode(event.target.value)}
                      placeholder="Coupon code"
                      className="h-12 flex-1 border-b border-[#d7d7d7] bg-transparent px-0 font-matter text-base text-[#222] outline-none placeholder:text-[#b1b1b1]"
                    />
                    <button
                      type="button"
                      className="h-12 min-w-22 border border-[#d6d6d6] px-5 font-matter text-sm font-semibold text-[#5f5f5f] transition-colors hover:border-[#111] hover:text-[#111]"
                    >
                      APPLY
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => clearCart()}
                  className="inline-flex items-center gap-2 self-start font-matter text-sm font-medium text-[#808080] transition-colors hover:text-[#111] md:self-auto"
                >
                  <RotateCcw className="h-4 w-4" />
                  CLEAR CART
                </button>
              </div>
            </section>

            <aside className="border-l border-[#dbdbdb] pl-0 lg:pl-9">
              <div className="max-w-88">
                <h2 className="font-matter text-[2rem] font-light tracking-[-0.04em] text-[#202020]">
                  CART TOTALS
                </h2>

                <div className="mt-5 border-t border-[#dcdcdc] pt-5">
                  <div className="space-y-3 font-matter text-sm text-[#8c8c8c]">
                    <div className="flex items-center justify-between gap-6">
                      <span>Shipping (3-5 Business Days)</span>
                      <span className="font-medium text-[#202020]">Free</span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span>TAX (estimated for the United States (US))</span>
                      <span className="font-medium text-[#202020]">
                        {formatNpr(tax)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#202020]">
                        {formatNpr(subtotal)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#202020] pt-6">
                    <div className="flex items-center justify-between font-matter">
                      <span className="text-[1.7rem] font-light text-[#202020]">
                        Total
                      </span>
                      <span className="text-[2rem] font-semibold text-[#202020]">
                        {formatNpr(total)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="mt-12 flex h-14 w-full items-center justify-center bg-[#111] font-matter text-sm font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#1d2c63] cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/shop"
                    className="mt-6 inline-flex w-full items-center justify-center font-matter text-sm font-medium text-[#565656] transition-colors hover:text-[#111]"
                  >
                    &lt; Continue Shopping
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
