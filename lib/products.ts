export type ProductCategory = "Makeup" | "Skin Care" | "Beauty Tools";

export type SkinType =
  | "Normal"
  | "Oily"
  | "Dry"
  | "Combination"
  | "Sensitive";

export type Promotion = "New Arrivals" | "Best Sellers" | "On Sale";

export type SortOption =
  | "default"
  | "price-low"
  | "price-high"
  | "newest"
  | "rating";

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: ProductCategory;
  skinTypes: SkinType[];
  rating: number;
  reviews: number;
  discount?: number;
  promotion: Promotion;
  inStock: boolean;
  sku: string;
  tags: string[];
  description: string;
  sizes: string[];
  desc: string;
  launchedAt: string;
  additionalInfo?: {
    weight?: string;
    dimensions?: string;
    ingredients?: string;
    shelfLife?: string;
    origin?: string;
  };
  customerReviews?: Array<{
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified?: boolean;
  }>;
}

export interface CollectionFilters {
  categories: ProductCategory[];
  skinTypes: SkinType[];
  priceRange: [number, number];
  rating: number | null;
  promotions: Promotion[];
  availability: "In Stock" | "Out of Stock" | null;
  sortBy: SortOption;
}

export const COLLECTION_CATEGORIES: ProductCategory[] = [
  "Makeup",
  "Skin Care",
  "Beauty Tools",
];

export const SKIN_TYPES: SkinType[] = [
  "Normal",
  "Oily",
  "Dry",
  "Combination",
  "Sensitive",
];

export const PROMOTION_OPTIONS: Promotion[] = [
  "New Arrivals",
  "Best Sellers",
  "On Sale",
];

export const DEFAULT_COLLECTION_FILTERS: CollectionFilters = {
  categories: [],
  skinTypes: [],
  priceRange: [10, 100],
  rating: null,
  promotions: [],
  availability: null,
  sortBy: "default",
};

const productAsset = (file: string) =>
  `/KANWEBSITE/KAN%20PRODUCTS/${encodeURIComponent(file)}`;

const allSkinTypes: SkinType[] = [
  "Normal",
  "Oily",
  "Dry",
  "Combination",
  "Sensitive",
];

type ProductSeed = {
  id: number;
  slug: string;
  name: string;
  price: number;
  imageFiles: string[];
  category: ProductCategory;
  rating: number;
  reviews: number;
  promotion: Promotion;
  inStock: boolean;
  sku: string;
  tags: string[];
  description: string;
  sizes: string[];
  desc: string;
  launchedAt: string;
  skinTypes?: SkinType[];
};

const createProduct = ({
  imageFiles,
  skinTypes = allSkinTypes,
  ...product
}: ProductSeed): Product => ({
  ...product,
  skinTypes,
  image: productAsset(imageFiles[0]),
  images: imageFiles.map(productAsset),
  originalPrice: Math.round((product.price + 8) * 100) / 100,
  discount: Math.round((((product.price + 8) - product.price) / (product.price + 8)) * 100),
});

export const products: Product[] = [
  createProduct({
    id: 1,
    slug: "kan-mascara",
    name: "Mascara",
    price: 18,
    imageFiles: ["MASCARA.png"],
    category: "Makeup",
    rating: 4.8,
    reviews: 198,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-MAS-001",
    tags: ["Mascara", "Lashes", "Definition"],
    description:
      "A defining mascara that lifts, lengthens, and keeps lashes soft while delivering clean, everyday drama.",
    sizes: ["9ml"],
    desc: "Eye Makeup",
    launchedAt: "2026-03-05",
    additionalInfo: {
      weight: "45g",
      dimensions: "15cm x 2cm x 2cm",
      ingredients: "Water, Beeswax, Carnauba Wax, Glycerin, Iron Oxides, Vitamin E",
      shelfLife: "12 months after opening",
      origin: "Made in Nepal",
    },
    customerReviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        date: "2026-03-15",
        comment: "Amazing mascara! Gives great length and volume without clumping. Stays on all day.",
        verified: true,
      },
      {
        id: 2,
        name: "Priya Sharma",
        rating: 5,
        date: "2026-03-20",
        comment: "Love this mascara! It's gentle on my sensitive eyes and doesn't flake.",
        verified: true,
      },
      {
        id: 3,
        name: "Emily Chen",
        rating: 4,
        date: "2026-03-28",
        comment: "Great product, very natural looking. Would prefer a slightly bigger brush though.",
        verified: false,
      },
    ],
  }),
  createProduct({
    id: 2,
    slug: "mirror-primer",
    name: "Mirror Primer",
    price: 22,
    imageFiles: ["Mirror Primer-01.png"],
    category: "Skin Care",
    rating: 4.7,
    reviews: 136,
    promotion: "New Arrivals",
    inStock: true,
    sku: "KAN-PRI-002",
    tags: ["Primer", "Smoothing", "Prep"],
    description:
      "A smoothing face primer that creates a soft-focus base and helps makeup sit evenly with a polished finish.",
    sizes: ["30ml"],
    desc: "Primer",
    launchedAt: "2026-03-22",
    skinTypes: ["Normal", "Oily", "Combination", "Sensitive"],
    additionalInfo: {
      weight: "65g",
      dimensions: "12cm x 4cm x 4cm",
      ingredients: "Cyclopentasiloxane, Dimethicone, Silica, Vitamin C, Hyaluronic Acid",
      shelfLife: "24 months after opening",
      origin: "Made in Nepal",
    },
    customerReviews: [
      {
        id: 1,
        name: "Maya Thapa",
        rating: 5,
        date: "2026-03-25",
        comment: "Best primer I've ever used! Makes my skin so smooth and makeup lasts all day.",
        verified: true,
      },
      {
        id: 2,
        name: "Jessica Lee",
        rating: 4,
        date: "2026-03-30",
        comment: "Really good primer, minimizes pores nicely. A little goes a long way.",
        verified: true,
      },
    ],
  }),
  createProduct({
    id: 3,
    slug: "wet-wipe-professional",
    name: "Wet-Wipe Professional",
    price: 12,
    imageFiles: ["Wet-wipe Professional.png"],
    category: "Beauty Tools",
    rating: 4.5,
    reviews: 84,
    promotion: "On Sale",
    inStock: true,
    sku: "KAN-TOOL-003",
    tags: ["Wipes", "Prep", "Cleanup"],
    description:
      "A professional-use cleansing wipe pack for quick makeup cleanup, prep, and on-the-go touch-ups.",
    sizes: ["40 wipes"],
    desc: "Beauty Tools",
    launchedAt: "2026-01-12",
  }),
  createProduct({
    id: 4,
    slug: "beauty-blender",
    name: "Beauty Blender",
    price: 10,
    imageFiles: ["beauty bleander.png"],
    category: "Beauty Tools",
    rating: 4.6,
    reviews: 112,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-TOOL-004",
    tags: ["Sponge", "Applicator", "Blending"],
    description:
      "A soft blending sponge designed for seamless complexion application with a natural, skin-like finish.",
    sizes: ["1 piece"],
    desc: "Beauty Tools",
    launchedAt: "2025-12-19",
  }),
  createProduct({
    id: 5,
    slug: "big-eyeshadow-palette",
    name: "Big Eyeshadow Palette",
    price: 28,
    imageFiles: ["big eyeshadow new.png", "big eyeshadow packaging.png"],
    category: "Makeup",
    rating: 4.8,
    reviews: 165,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-EYE-005",
    tags: ["Eyeshadow", "Palette", "Pigment"],
    description:
      "A versatile eyeshadow palette with wearable neutrals and richer statement tones for day-to-night artistry.",
    sizes: ["12 shades"],
    desc: "Eye Makeup",
    launchedAt: "2026-02-10",
  }),
  createProduct({
    id: 6,
    slug: "blush",
    name: "Blush",
    price: 19,
    imageFiles: ["blush.jpeg"],
    category: "Makeup",
    rating: 4.6,
    reviews: 122,
    promotion: "On Sale",
    inStock: true,
    sku: "KAN-FACE-006",
    tags: ["Blush", "Cheeks", "Soft Color"],
    description:
      "A smooth blush that brings soft color and warmth to the face with an easy-to-build natural finish.",
    sizes: ["6g"],
    desc: "Face Makeup",
    launchedAt: "2025-11-30",
  }),
  createProduct({
    id: 7,
    slug: "cc-air-cushion",
    name: "CC Air Cushion",
    price: 26,
    imageFiles: ["cc air cushion-02.png", "cc air cushion.PNG"],
    category: "Makeup",
    rating: 4.9,
    reviews: 244,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-CC-007",
    tags: ["CC Cushion", "Complexion", "Coverage"],
    description:
      "A breathable air cushion compact that evens tone, brightens the complexion, and feels weightless on skin.",
    sizes: ["15g"],
    desc: "Complexion",
    launchedAt: "2026-03-12",
    skinTypes: ["Normal", "Dry", "Combination", "Sensitive"],
  }),
  createProduct({
    id: 8,
    slug: "color-corrector",
    name: "Color Corrector",
    price: 17,
    imageFiles: ["color corrector (1).png"],
    category: "Makeup",
    rating: 4.5,
    reviews: 96,
    promotion: "New Arrivals",
    inStock: true,
    sku: "KAN-COR-008",
    tags: ["Corrector", "Tone Balance", "Prep"],
    description:
      "A targeted color corrector that helps neutralize dullness and uneven tone before concealer or foundation.",
    sizes: ["8ml"],
    desc: "Complexion",
    launchedAt: "2026-03-28",
  }),
  createProduct({
    id: 9,
    slug: "compact-powder",
    name: "Compact Powder",
    price: 21,
    imageFiles: ["compact powder.jpg"],
    category: "Makeup",
    rating: 4.7,
    reviews: 151,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-POW-009",
    tags: ["Powder", "Compact", "Soft Matte"],
    description:
      "A finely milled compact powder that sets makeup, softens shine, and keeps the complexion refined throughout the day.",
    sizes: ["10g"],
    desc: "Complexion",
    launchedAt: "2026-01-05",
  }),
  createProduct({
    id: 10,
    slug: "concealer",
    name: "Concealer",
    price: 18,
    imageFiles: ["concelor.jpg"],
    category: "Makeup",
    rating: 4.8,
    reviews: 188,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-CON-010",
    tags: ["Concealer", "Coverage", "Brightening"],
    description:
      "A creamy concealer that helps brighten under-eyes and blur small imperfections without feeling heavy.",
    sizes: ["7ml"],
    desc: "Complexion",
    launchedAt: "2026-02-18",
  }),
  createProduct({
    id: 11,
    slug: "eyebrow-gel",
    name: "Eyebrow Gel",
    price: 14,
    imageFiles: ["eyebrow gel.PNG"],
    category: "Makeup",
    rating: 4.4,
    reviews: 78,
    promotion: "On Sale",
    inStock: true,
    sku: "KAN-BROW-011",
    tags: ["Brows", "Gel", "Hold"],
    description:
      "A lightweight eyebrow gel that shapes, sets, and keeps brows neatly in place without stiffness.",
    sizes: ["5ml"],
    desc: "Eye Makeup",
    launchedAt: "2025-10-15",
  }),
  createProduct({
    id: 12,
    slug: "eyeliner",
    name: "Eyeliner",
    price: 15,
    imageFiles: ["eyeliner.PNG"],
    category: "Makeup",
    rating: 4.7,
    reviews: 141,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-EYE-012",
    tags: ["Eyeliner", "Precision", "Longwear"],
    description:
      "A precise eyeliner for clean definition, flexible control, and a bold line that stays sharp for hours.",
    sizes: ["1.2ml"],
    desc: "Eye Makeup",
    launchedAt: "2025-12-08",
  }),
  createProduct({
    id: 13,
    slug: "foundation",
    name: "Foundation",
    price: 24,
    imageFiles: ["foundation 1.png"],
    category: "Makeup",
    rating: 4.8,
    reviews: 209,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-FND-013",
    tags: ["Foundation", "Liquid", "Natural Finish"],
    description:
      "A smoothing liquid foundation that balances comfort and coverage for an even, skin-like finish.",
    sizes: ["30ml"],
    desc: "Complexion",
    launchedAt: "2026-02-02",
    skinTypes: ["Normal", "Dry", "Combination", "Sensitive"],
  }),
  createProduct({
    id: 14,
    slug: "highlighter",
    name: "Highlighter",
    price: 17,
    imageFiles: ["highlighter.PNG"],
    category: "Makeup",
    rating: 4.6,
    reviews: 103,
    promotion: "On Sale",
    inStock: true,
    sku: "KAN-HLT-014",
    tags: ["Highlighter", "Glow", "Radiance"],
    description:
      "A luminous highlighter that adds soft radiance to the high points of the face without chunky shimmer.",
    sizes: ["5g"],
    desc: "Face Makeup",
    launchedAt: "2025-11-10",
  }),
  createProduct({
    id: 15,
    slug: "jelly-highlighter",
    name: "Jelly Highlighter",
    price: 18,
    imageFiles: ["jelly highlighter.PNG"],
    category: "Makeup",
    rating: 4.5,
    reviews: 74,
    promotion: "New Arrivals",
    inStock: true,
    sku: "KAN-HLT-015",
    tags: ["Highlighter", "Jelly", "Glow"],
    description:
      "A bouncy jelly-texture highlighter that melts into skin and leaves a fresh, reflective sheen.",
    sizes: ["8g"],
    desc: "Face Makeup",
    launchedAt: "2026-03-16",
  }),
  createProduct({
    id: 16,
    slug: "lipstick",
    name: "Lipstick",
    price: 16,
    imageFiles: ["lipstick.PNG"],
    category: "Makeup",
    rating: 4.9,
    reviews: 286,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-LIP-016",
    tags: ["Lipstick", "Color", "Satin"],
    description:
      "A classic lipstick with rich color payoff, comfortable wear, and a polished finish for everyday statement lips.",
    sizes: ["3.5g"],
    desc: "Lip Makeup",
    launchedAt: "2026-01-22",
  }),
  createProduct({
    id: 17,
    slug: "liquid-lipstick",
    name: "Liquid Lipstick",
    price: 17,
    imageFiles: ["liquid lipstick.png"],
    category: "Makeup",
    rating: 4.8,
    reviews: 214,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-LIP-017",
    tags: ["Liquid Lipstick", "Matte", "Longwear"],
    description:
      "A longwear liquid lipstick that delivers bold pigment and a comfortable matte feel with minimal transfer.",
    sizes: ["4ml"],
    desc: "Lip Makeup",
    launchedAt: "2026-02-26",
  }),
  createProduct({
    id: 18,
    slug: "loose-powder",
    name: "Loose Powder",
    price: 20,
    imageFiles: ["loose powder.PNG"],
    category: "Makeup",
    rating: 4.7,
    reviews: 129,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-POW-018",
    tags: ["Loose Powder", "Set", "Blur"],
    description:
      "A lightweight loose powder that helps set the complexion, soften texture, and keep makeup balanced all day.",
    sizes: ["18g"],
    desc: "Complexion",
    launchedAt: "2026-01-28",
  }),
  createProduct({
    id: 19,
    slug: "matte-primer",
    name: "Matte Primer",
    price: 22,
    imageFiles: ["matte primer-01.png"],
    category: "Skin Care",
    rating: 4.6,
    reviews: 115,
    promotion: "New Arrivals",
    inStock: true,
    sku: "KAN-PRI-019",
    tags: ["Primer", "Matte", "Oil Control"],
    description:
      "A matte primer that helps refine texture, reduce excess shine, and keep base makeup looking fresh longer.",
    sizes: ["30ml"],
    desc: "Primer",
    launchedAt: "2026-03-25",
    skinTypes: ["Oily", "Combination", "Normal"],
  }),
  createProduct({
    id: 20,
    slug: "ph-lipstick",
    name: "PH Lipstick",
    price: 15,
    imageFiles: ["ph lipstick.png"],
    category: "Makeup",
    rating: 4.6,
    reviews: 93,
    promotion: "On Sale",
    inStock: true,
    sku: "KAN-LIP-020",
    tags: ["PH Lipstick", "Adaptive Color", "Lip Care"],
    description:
      "A pH-reactive lipstick that shifts into a personalized tone while keeping lips soft and comfortable.",
    sizes: ["3g"],
    desc: "Lip Makeup",
    launchedAt: "2025-10-28",
  }),
  createProduct({
    id: 21,
    slug: "setting-spray",
    name: "Setting Spray",
    price: 21,
    imageFiles: ["setting spray.png"],
    category: "Skin Care",
    rating: 4.7,
    reviews: 166,
    promotion: "Best Sellers",
    inStock: true,
    sku: "KAN-SET-021",
    tags: ["Setting Spray", "Finish", "Refresh"],
    description:
      "A fine-mist setting spray that helps lock in makeup, refresh the skin, and keep the finish balanced through the day.",
    sizes: ["100ml"],
    desc: "Setting Spray",
    launchedAt: "2026-02-12",
    skinTypes: ["Normal", "Oily", "Dry", "Combination"],
  }),
  createProduct({
    id: 22,
    slug: "small-eyeshadow-palette",
    name: "Small Eyeshadow Palette",
    price: 18,
    imageFiles: [
      "small eyeshadow-01.jpeg",
      "small eyeshadow.jpeg",
      "small eyeshadow packaging.png",
    ],
    category: "Makeup",
    rating: 4.5,
    reviews: 89,
    promotion: "New Arrivals",
    inStock: true,
    sku: "KAN-EYE-022",
    tags: ["Eyeshadow", "Palette", "Travel"],
    description:
      "A compact eyeshadow palette built for easy daily looks, touch-ups, and polished color on the go.",
    sizes: ["6 shades"],
    desc: "Eye Makeup",
    launchedAt: "2026-03-30",
  }),
];

export const heroProducts = [
  products.find((product) => product.slug === "lipstick"),
  products.find((product) => product.slug === "liquid-lipstick"),
  products.find((product) => product.slug === "foundation"),
  products.find((product) => product.slug === "cc-air-cushion"),
  products.find((product) => product.slug === "big-eyeshadow-palette"),
].filter(Boolean) as Product[];

export const featuredProducts = [
  products.find((product) => product.slug === "lipstick"),
  products.find((product) => product.slug === "cc-air-cushion"),
  products.find((product) => product.slug === "foundation"),
  products.find((product) => product.slug === "mirror-primer"),
  products.find((product) => product.slug === "setting-spray"),
  products.find((product) => product.slug === "small-eyeshadow-palette"),
].filter(Boolean) as Product[];

export function formatNpr(amount: number): string {
  return `NPR ${new Intl.NumberFormat("en-NP", {
    maximumFractionDigits: 0,
  }).format(amount * 140)}`;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(
  currentProductId: number,
  category: string,
  limit: number = 4,
): Product[] {
  return products
    .filter(
      (product) =>
        product.id !== currentProductId && product.category === category,
    )
    .slice(0, limit);
}

export function filterProducts(
  allProducts: Product[],
  filters: CollectionFilters,
): Product[] {
  const filtered = allProducts.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);

    const matchesSkinType =
      filters.skinTypes.length === 0 ||
      filters.skinTypes.some((type) => product.skinTypes.includes(type));

    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    const matchesRating =
      filters.rating === null || product.rating >= filters.rating;

    const matchesPromotion =
      filters.promotions.length === 0 ||
      filters.promotions.includes(product.promotion);

    const matchesAvailability =
      filters.availability === null ||
      (filters.availability === "In Stock" ? product.inStock : !product.inStock);

    return (
      matchesCategory &&
      matchesSkinType &&
      matchesPrice &&
      matchesRating &&
      matchesPromotion &&
      matchesAvailability
    );
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return (
          new Date(b.launchedAt).getTime() - new Date(a.launchedAt).getTime()
        );
      case "rating":
        return b.rating - a.rating;
      case "default":
      default:
        return a.id - b.id;
    }
  });
}
