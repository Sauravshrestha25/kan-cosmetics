export const categories = [
  "All",
  "Skincare",
  "Makeup",
  "Haircare",
  "Ingredients",
  "Trends",
  "Tutorials",
] as const;

export const articles = [
  {
    slug: "skin-first-beauty-routine",
    category: "Skincare",
    title: "How to build a skin-first beauty routine that still feels elevated",
    description:
      "A practical guide to choosing products that layer well, support your skin, and create a polished everyday finish.",
    date: "Mar 20, 2026",
    readTime: "5 min read",
    image: "/images/model.jpg",
    alt: "Beauty portrait for skincare article",
    content: [
      "A skin-first routine starts with restraint. Instead of layering products for the sake of complexity, focus on textures that support the skin and sit beautifully together. Lightweight hydration, refined coverage, and a finish that still looks like skin tend to create the most polished result.",
      "The most elevated routines are usually the simplest to repeat. Choose products that feel intuitive in the hand, blend easily, and wear comfortably through the day. When makeup respects the condition of the skin underneath, the final look feels more natural and more premium at the same time.",
      "This is the thinking behind modern beauty essentials: fewer distractions, better formulas, and color that enhances rather than hides. A routine should never feel like a costume. It should feel like clarity.",
    ],
  },
  {
    slug: "premium-formulas-and-finish",
    category: "Ingredients",
    title: "What premium formulas really mean when texture, finish, and wear all matter",
    description:
      "We break down the ingredient and formulation details that shape a product's feel, comfort, and performance.",
    date: "Mar 21, 2026",
    readTime: "6 min read",
    image: "/images/potential image.jpg",
    alt: "Premium beauty flat lay for ingredients article",
    content: [
      "Premium formulas are not defined by buzzwords alone. They are felt in how a product glides, how it settles, and how it wears over time. A refined formula balances payoff with comfort so the finish feels intentional from the first application to the last hour of wear.",
      "Texture is often the first sign of quality. Products with well-considered ingredient balance tend to spread more evenly, need less correction, and create a cleaner visual result. This is especially noticeable in complexion and lip products where weight, slip, and flexibility shape the entire experience.",
      "When finish, wear, and feel all work together, beauty becomes easier. You spend less time fixing and more time enjoying the ritual. That is what premium should mean: not excess, but precision.",
    ],
  },
  {
    slug: "soft-glow-aesthetic",
    category: "Trends",
    title: "The new soft-glow aesthetic and why it continues to define modern beauty",
    description:
      "From sheer complexion to refined color, discover the visual cues behind the current wave of minimal luxury.",
    date: "Mar 22, 2026",
    readTime: "7 min read",
    image: "/images/happyfaces2.png",
    alt: "Community beauty image for trends article",
    content: [
      "The soft-glow aesthetic feels current because it values restraint. Instead of obvious shine or heavy coverage, it focuses on skin that looks healthy, color that appears diffused, and features that feel softly defined rather than sharply drawn.",
      "This visual language fits naturally with contemporary luxury. It signals care, calm, and intention. Products are chosen for the way they catch light gently, blur edges slightly, and keep the face looking alive instead of overly perfected.",
      "What makes the trend last is its relatability. It works in real life, in daylight, and across a range of routines. More than a fleeting look, it reflects a wider shift toward beauty that feels personal, breathable, and quietly confident.",
    ],
  },
] as const;

export type Article = (typeof articles)[number];
