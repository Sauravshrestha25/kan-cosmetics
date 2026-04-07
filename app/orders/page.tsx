"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomerShell from "@/Components/account/CustomerShell";
import { Button } from "@/Components/ui/button";
import { AUTH_EVENT, getSessionUser, type AuthUser } from "@/lib/auth";
import {
  getOrdersForEmail,
  ORDERS_EVENT,
  type StoredOrder,
} from "@/lib/orders";
import { formatNpr } from "@/lib/products";

export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(() => getSessionUser());
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = () => setUser(getSessionUser());

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

    const syncOrders = () => setOrders(getOrdersForEmail(user.email));

    syncOrders();
    window.addEventListener(ORDERS_EVENT, syncOrders);

    return () => {
      window.removeEventListener(ORDERS_EVENT, syncOrders);
    };
  }, [router, user]);

  if (!user) return null;

  return (
    <CustomerShell>
      {orders.length === 0 ? (
        <div className="flex min-h-80 items-center justify-center border border-[#e8e2d8] bg-[#fffdf9] p-6">
          <Button asChild variant="kanPrimary" size="kan" className="h-11 rounded-none text-sm">
            <Link href="/collection">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <article key={order.id} className="border border-[#e8e2d8] bg-[#fffdf9]">
              <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="grid gap-3 sm:grid-cols-4">
                  <div>
                    <p className="font-matter text-[11px] uppercase tracking-[0.14em] text-[#8b7868]">
                      Order
                    </p>
                    <p className="mt-1 font-matter text-sm font-semibold text-[#141c35]">
                      {order.id}
                    </p>
                  </div>

                  <div>
                    <p className="font-matter text-[11px] uppercase tracking-[0.14em] text-[#8b7868]">
                      Date
                    </p>
                    <p className="mt-1 font-matter text-sm text-[#141c35]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="font-matter text-[11px] uppercase tracking-[0.14em] text-[#8b7868]">
                      Items
                    </p>
                    <p className="mt-1 font-matter text-sm text-[#141c35]">
                      {order.items.length}
                    </p>
                  </div>

                  <div>
                    <p className="font-matter text-[11px] uppercase tracking-[0.14em] text-[#8b7868]">
                      Total
                    </p>
                    <p className="mt-1 font-matter text-sm font-semibold text-[#141c35]">
                      {formatNpr(order.total)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setExpandedOrderId((current) =>
                      current === order.id ? null : order.id,
                    )
                  }
                  className="inline-flex items-center gap-2 justify-self-start font-matter text-sm font-semibold text-[#1d2c63] sm:justify-self-end"
                >
                  Items
                  <ChevronDown
                    className={[
                      "h-4 w-4 transition-transform duration-200",
                      expandedOrderId === order.id ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>
              </div>

              {expandedOrderId === order.id ? (
                <div className="border-t border-[#ece5db] px-4 py-4">
                  <div className="grid gap-3">
                    {order.items.map((item) => (
                      <Link
                        key={`${order.id}-${item.productId}-${item.size ?? "default"}`}
                        href={`/collection/${item.slug}`}
                        className="grid gap-3 border border-[#ece5db] bg-white p-3 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-center"
                      >
                        <div className="relative h-18 w-18 border border-[#ece5db] bg-[#fffdf9]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="4.5rem"
                            className="object-contain p-2"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="font-matter text-sm font-semibold text-[#141c35]">
                            {item.name}
                          </p>
                          <p className="mt-1 font-matter text-xs text-[#7a6f68]">
                            Qty {item.quantity}
                            {item.size ? ` / ${item.size}` : ""}
                          </p>
                        </div>

                        <p className="font-matter text-sm font-semibold text-[#141c35]">
                          {formatNpr(item.price * item.quantity)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </CustomerShell>
  );
}
