"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageContainer } from "@/Components/ui/design-system";
import { clearCart, getStoredCartItems, type CartItem } from "@/lib/cart";
import { getSessionUser } from "@/lib/auth";
import { createOrder } from "@/lib/orders";
import { formatNpr } from "@/lib/products";

export default function CheckoutPage() {
  const router = useRouter();
  const sessionUser = getSessionUser();
  const [items] = useState<CartItem[]>(() => getStoredCartItems());
  const [fullName, setFullName] = useState(() => sessionUser?.fullName ?? "");
  const [email, setEmail] = useState(() => sessionUser?.email ?? "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const handleSubmitOrder = () => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim()
    ) {
      toast.error("Please complete your checkout details");
      return;
    }

    const order = createOrder({
      items,
      total: subtotal,
      accountEmail: sessionUser?.email,
      customer: {
        fullName,
        email,
        phone,
        address,
        city,
        notes,
      },
    });

    clearCart();
    toast.success("Order request submitted", {
      description: `${order.id} is now visible in your orders.`,
    });
    router.push("/orders");
  };

  return (
    <main className="bg-white pt-28 pb-24">
      <PageContainer>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 font-matter text-sm font-medium text-[#727272] transition-colors hover:text-[#141c35]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <div className="mt-8 max-w-272">
          <h1 className="font-theseasons text-[clamp(2.8rem,5vw,4.8rem)] font-semibold tracking-[-0.05em] text-[#171717]">
            Checkout
          </h1>
          <p className="mt-6 max-w-3xl font-matter text-[clamp(1rem,1.4vw,1.15rem)] leading-8 text-[#5f6f86]">
            Complete your delivery details and review your order. We are not
            using a payment gateway here, so your request can be confirmed
            manually after submission.
          </p>
        </div>

        <div className="mt-14 grid gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.72fr)] lg:items-start">
          <section>
            <div className="space-y-14">
              <section>
                <h2 className="font-matter text-sm font-semibold uppercase tracking-[0.22em] text-[#6f6f6f]">
                  Contact Details
                </h2>
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <label className="block">
                    <span className="font-matter text-lg font-semibold text-[#202020]">
                      Full name
                    </span>
                    <input
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className="mt-4 w-full border-b border-[#d7d7d7] bg-transparent pb-3 font-matter text-base text-[#202020] outline-none placeholder:text-[#a0a0a0]"
                      placeholder="Your full name"
                    />
                  </label>
                  <label className="block">
                    <span className="font-matter text-lg font-semibold text-[#202020]">
                      Email address
                    </span>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="mt-4 w-full border-b border-[#d7d7d7] bg-transparent pb-3 font-matter text-base text-[#202020] outline-none placeholder:text-[#a0a0a0]"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="block">
                    <span className="font-matter text-lg font-semibold text-[#202020]">
                      Phone number
                    </span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="mt-4 w-full border-b border-[#d7d7d7] bg-transparent pb-3 font-matter text-base text-[#202020] outline-none placeholder:text-[#a0a0a0]"
                      placeholder="+977"
                    />
                  </label>
                  <label className="block">
                    <span className="font-matter text-lg font-semibold text-[#202020]">
                      City
                    </span>
                    <input
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      className="mt-4 w-full border-b border-[#d7d7d7] bg-transparent pb-3 font-matter text-base text-[#202020] outline-none placeholder:text-[#a0a0a0]"
                      placeholder="Kathmandu"
                    />
                  </label>
                </div>
              </section>

              <section>
                <h2 className="font-matter text-sm font-semibold uppercase tracking-[0.22em] text-[#6f6f6f]">
                  Shipping Address
                </h2>
                <div className="mt-8 space-y-8">
                  <label className="block">
                    <span className="font-matter text-lg font-semibold text-[#202020]">
                      Address
                    </span>
                    <input
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      className="mt-4 w-full border-b border-[#d7d7d7] bg-transparent pb-3 font-matter text-base text-[#202020] outline-none placeholder:text-[#a0a0a0]"
                      placeholder="Street, area, landmark"
                    />
                  </label>

                  <label className="block">
                    <span className="font-matter text-lg font-semibold text-[#202020]">
                      Order notes
                    </span>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      rows={4}
                      className="mt-4 w-full resize-none border-b border-[#d7d7d7] bg-transparent pb-3 font-matter text-base leading-7 text-[#202020] outline-none placeholder:text-[#a0a0a0]"
                      placeholder="Anything we should know before confirming your order?"
                    />
                  </label>
                </div>
              </section>

              <section className="border-t border-[#202020] pt-8">
                <p className="max-w-184 font-matter text-[1.05rem] leading-8 text-[#5f6f86]">
                  After you submit this order request, we can confirm delivery
                  details manually. No payment gateway is required at this step.
                </p>

                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  className="mt-10 inline-flex h-14 items-center justify-center bg-[#111] px-8 font-matter text-sm font-semibold uppercase tracking-[0.05em] text-white transition-colors hover:bg-[#1d2c63]"
                >
                  Submit Order Request
                </button>
              </section>
            </div>
          </section>

          <aside className="lg:sticky lg:top-28">
            <div className="border border-[#ececec] bg-[#fafafa] p-6 sm:p-8">
              <h2 className="font-matter text-sm font-semibold uppercase tracking-[0.22em] text-[#6f6f6f]">
                Order Summary
              </h2>

              {items.length === 0 ? (
                <p className="mt-8 font-matter text-[1.05rem] leading-8 text-[#5f6f86]">
                  Your cart is empty. Add products from the collection before
                  continuing to checkout.
                </p>
              ) : (
                <>
                  <div className="mt-8 space-y-5">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.size ?? "default"}`}
                        className="flex items-start gap-4 border-b border-[#e5e5e5] pb-5"
                      >
                        <div className="relative h-20 w-20 shrink-0 border border-[#e8e8e8] bg-white">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-matter text-lg font-semibold leading-[1.35] text-[#202020]">
                            {item.name}
                          </p>
                          <p className="mt-2 font-matter text-sm leading-6 text-[#6f6f6f]">
                            {item.size
                              ? `Size: ${item.size}`
                              : "Standard option"}
                          </p>
                          <p className="font-matter text-sm leading-6 text-[#6f6f6f]">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-matter text-sm font-semibold text-[#202020]">
                          {formatNpr(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-[#202020] pt-6">
                    <div className="flex items-center justify-between font-matter text-sm text-[#6f6f6f]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#202020]">
                        {formatNpr(subtotal)}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between font-matter text-sm text-[#6f6f6f]">
                      <span>Shipping</span>
                      <span className="font-semibold text-[#202020]">Free</span>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#e5e5e5] pt-6">
                      <span className="font-saolDisplay text-[1.7rem] leading-none text-[#202020]">
                        Total
                      </span>
                      <span className="font-matter text-[1.4rem] font-semibold text-[#202020]">
                        {formatNpr(subtotal)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </PageContainer>
    </main>
  );
}
