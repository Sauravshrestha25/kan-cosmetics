import { getProductBySlug, type Product } from "@/lib/products";

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
};

export const CART_EVENT = "kan-cart-changed";

const CART_KEY = "kan-cart-items";

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

const emitCartChange = () => {
  if (!canUseStorage()) return;
  window.dispatchEvent(new Event(CART_EVENT));
};

const normalizeItemSize = (item: CartItem) => {
  const product = getProductBySlug(item.slug);
  return item.size?.trim() || product?.sizes[0] || undefined;
};

const normalizeCartItems = (items: CartItem[]) => {
  const merged = new Map<string, CartItem>();

  for (const item of items) {
    const normalizedSize = normalizeItemSize(item);
    const key = `${item.productId}::${normalizedSize ?? "default"}`;
    const existing = merged.get(key);

    if (existing) {
      merged.set(key, {
        ...existing,
        quantity: existing.quantity + item.quantity,
      });
      continue;
    }

    merged.set(key, {
      ...item,
      size: normalizedSize,
    });
  }

  return Array.from(merged.values());
};

export const getStoredCartItems = () => {
  const items = normalizeCartItems(readJson<CartItem[]>(CART_KEY, []));

  if (canUseStorage()) {
    writeJson(CART_KEY, items);
  }

  return items;
};

export const getCartCount = () =>
  getStoredCartItems().reduce((sum, item) => sum + item.quantity, 0);

export const getProductCartQuantity = (productId: number) =>
  getStoredCartItems()
    .filter((item) => item.productId === productId)
    .reduce((sum, item) => sum + item.quantity, 0);

export const addToCart = (
  product: Product,
  options?: { quantity?: number; size?: string },
) => {
  const quantity = Math.max(1, options?.quantity ?? 1);
  const size = options?.size?.trim() || product.sizes[0] || undefined;
  const cart = getStoredCartItems();

  const existingIndex = cart.findIndex(
    (item) => item.productId === product.id && item.size === size,
  );

  if (existingIndex >= 0) {
    const nextCart = [...cart];
    nextCart[existingIndex] = {
      ...nextCart[existingIndex],
      quantity: nextCart[existingIndex].quantity + quantity,
    };
    writeJson(CART_KEY, nextCart);
    emitCartChange();
    return nextCart;
  }

  const nextCart = [
    ...cart,
    {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      size,
    },
  ];

  writeJson(CART_KEY, nextCart);
  emitCartChange();
  return nextCart;
};

export const updateCartItemQuantity = (
  productId: number,
  quantity: number,
  size?: string,
) => {
  const nextCart = getStoredCartItems()
    .map((item) =>
      item.productId === productId && item.size === size
        ? { ...item, quantity: Math.max(1, quantity) }
        : item,
    )
    .filter((item) => item.quantity > 0);

  writeJson(CART_KEY, nextCart);
  emitCartChange();
  return nextCart;
};

export const removeFromCart = (productId: number, size?: string) => {
  const nextCart = getStoredCartItems().filter(
    (item) => !(item.productId === productId && item.size === size),
  );

  writeJson(CART_KEY, nextCart);
  emitCartChange();
  return nextCart;
};

export const clearCart = () => {
  writeJson(CART_KEY, []);
  emitCartChange();
};
