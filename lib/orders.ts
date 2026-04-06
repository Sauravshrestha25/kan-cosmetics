import type { CartItem } from "@/lib/cart";

export type StoredOrder = {
  id: string;
  createdAt: string;
  status: "Processing" | "Delivered";
  total: number;
  items: CartItem[];
  accountEmail?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    notes: string;
  };
};

export const ORDERS_EVENT = "kan-orders-changed";

const ORDERS_KEY = "kan-orders";

const canUseStorage = () => typeof window !== "undefined";

const readJson = <T,>(key: string, fallback: T): T => {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const emitOrdersChange = () => {
  if (!canUseStorage()) return;
  window.dispatchEvent(new Event(ORDERS_EVENT));
};

const normalizeOrder = (order: StoredOrder): StoredOrder => ({
  ...order,
  accountEmail: order.accountEmail?.trim().toLowerCase(),
  customer: {
    ...order.customer,
    email: order.customer.email.trim().toLowerCase(),
  },
});

export const getStoredOrders = () =>
  readJson<StoredOrder[]>(ORDERS_KEY, []).map(normalizeOrder);

export const getOrdersForEmail = (email: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  return getStoredOrders().filter(
    (order) =>
      order.accountEmail === normalizedEmail ||
      order.customer.email === normalizedEmail,
  );
};

export const createOrder = (input: {
  items: CartItem[];
  total: number;
  accountEmail?: string;
  customer: StoredOrder["customer"];
}) => {
  const orders = getStoredOrders();
  const nextOrder: StoredOrder = {
    id: `KAN-${1000 + orders.length + 1}`,
    createdAt: new Date().toISOString(),
    status: "Processing",
    total: input.total,
    items: input.items,
    accountEmail: input.accountEmail?.trim().toLowerCase(),
    customer: {
      ...input.customer,
      email: input.customer.email.trim().toLowerCase(),
    },
  };

  const nextOrders = [nextOrder, ...orders];
  writeJson(ORDERS_KEY, nextOrders);
  emitOrdersChange();
  return nextOrder;
};
