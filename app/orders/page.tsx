"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { PageContainer, SectionHeading } from "@/Components/ui/design-system";
import {
  AUTH_EVENT,
  getSessionUser,
  type AuthUser,
} from "@/lib/auth";
import { formatNpr } from "@/lib/products";
import {
  getOrdersForEmail,
  ORDERS_EVENT,
  type StoredOrder,
} from "@/lib/orders";

export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(() => getSessionUser());
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = () => {
      setUser(getSessionUser());
    };

    syncUser();
    window.addEventListener(AUTH_EVENT, syncUser);

    return () => {
      window.removeEventListener(AUTH_EVENT, syncUser);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    const syncOrders = () => {
      setOrders(getOrdersForEmail(user.email));
    };

    syncOrders();
    window.addEventListener(ORDERS_EVENT, syncOrders);

    return () => {
      window.removeEventListener(ORDERS_EVENT, syncOrders);
    };
  }, [router, user]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <PageContainer>
        <Link
          href="/account"
          className="inline-flex items-center gap-2 font-matter text-sm font-medium text-[#727272] transition-colors hover:text-[#141c35]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to account
        </Link>

        <section className="mt-8">
          <SectionHeading
            eyebrow="My Orders"
            title="Your recent order activity"
            description="A simple place to keep track of your purchases, order status, and what is currently on the way."
            titleClassName="font-matter text-[clamp(2.1rem,4vw,3.5rem)]"
            descriptionClassName="max-w-3xl text-base"
          />

          {orders.length === 0 ? (
            <div className="mt-10 border border-[#dbe2ee] bg-[#fbfcfe] px-6 py-14 text-center">
              <p className="font-matter text-lg font-semibold text-[#141c35]">
                No order requests yet.
              </p>
              <p className="mt-3 font-matter text-sm leading-7 text-[#66758f]">
                Once you submit an order request from checkout, it will appear here.
              </p>
              <Button asChild variant="kanPrimary" size="kan" className="mt-6 rounded-none">
                <Link href="/collection">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-10 grid gap-5">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="border border-[#dbe2ee] bg-white p-5"
                >
                  <div className="grid gap-5 lg:grid-cols-[1.1fr_0.8fr_0.7fr_0.6fr_auto] lg:items-center">
                    <div>
                      <p className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
                        Order Number
                      </p>
                      <h2 className="mt-2 font-matter text-lg font-semibold text-[#141c35]">
                        {order.id}
                      </h2>
                      <p className="mt-2 font-matter text-sm text-[#66758f]">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
                        Items
                      </p>
                      <p className="mt-2 font-matter text-base text-[#141c35]">
                        {order.items.length} item{order.items.length === 1 ? "" : "s"}
                      </p>
                    </div>

                    <div>
                      <p className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
                        Total
                      </p>
                      <p className="mt-2 font-matter text-base font-semibold text-[#141c35]">
                        {formatNpr(order.total)}
                      </p>
                    </div>

                    <div>
                      <p className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
                        Status
                      </p>
                      <p className="mt-2 inline-flex border border-[#dbe2ee] bg-[#f8fafe] px-3 py-2 font-matter text-sm font-semibold text-[#1d2c63]">
                        {order.status}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedOrderId((current) =>
                            current === order.id ? null : order.id,
                          )
                        }
                        className="inline-flex cursor-pointer items-center gap-2 font-matter text-sm font-semibold text-[#1d2c63]"
                      >
                        View Products
                        <ChevronDown
                          className={[
                            "h-4 w-4 transition-transform duration-200",
                            expandedOrderId === order.id ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </button>

                      <Button asChild variant="kanSecondary" size="kan" className="rounded-none">
                        <Link href="/collection">Buy Again</Link>
                      </Button>
                    </div>
                  </div>

                  {expandedOrderId === order.id ? (
                    <div className="mt-6 border-t border-[#e6ebf3] pt-6">
                      <div className="grid gap-4">
                        {order.items.map((item) => (
                          <Link
                            key={`${order.id}-${item.productId}-${item.size ?? "default"}`}
                            href={`/collection/${item.slug}`}
                            className="grid gap-4 border border-[#e6ebf3] bg-[#fbfcfe] p-4 transition-colors hover:bg-white md:grid-cols-[5.5rem_minmax(0,1fr)_auto]"
                          >
                            <div className="relative h-22 w-22 border border-[#e3e8f1] bg-white">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-2"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="font-matter text-base font-semibold text-[#141c35]">
                                {item.name}
                              </p>
                              <p className="mt-1 font-matter text-sm text-[#66758f]">
                                {item.size ? `Size: ${item.size}` : "Standard option"}
                              </p>
                              <p className="mt-1 font-matter text-sm text-[#66758f]">
                                Quantity: {item.quantity}
                              </p>
                            </div>

                            <div className="flex items-start justify-between gap-4 md:flex-col md:items-end">
                              <p className="font-matter text-sm font-semibold text-[#141c35]">
                                {formatNpr(item.price * item.quantity)}
                              </p>
                              <span className="font-matter text-sm font-semibold text-[#1d2c63]">
                                View product
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}

          <section className="mt-12 border border-[#dbe2ee] bg-[#f8fafe] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center bg-[#1d2c63] text-white">
                  <PackageSearch className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-matter text-xl font-semibold text-[#141c35]">
                    Need help with an order?
                  </h2>
                  <p className="mt-2 max-w-2xl font-matter text-sm leading-7 text-[#66758f]">
                    If an order detail looks off, or you need to follow up on delivery,
                    head over to contact and we can continue the support flow from there.
                  </p>
                </div>
              </div>

              <Button asChild variant="kanPrimary" size="kan" className="rounded-none">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </section>
        </section>
      </PageContainer>
    </main>
  );
}
