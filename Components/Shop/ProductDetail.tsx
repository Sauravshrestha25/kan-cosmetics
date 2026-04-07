"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import PremiumButton from "@/Components/ui/ArrowBtn";
import RatingStars from "./RatingStars";
import {
  formatNpr,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { addToCart, CART_EVENT, getProductCartQuantity } from "@/lib/cart";

interface ProductDetailProps {
  slug: string;
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const router = useRouter();
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    () => getProductBySlug(slug)?.sizes[0] ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (!product) return;

    const syncCart = () => {
      setCartQuantity(getProductCartQuantity(product.id));
    };

    syncCart();
    window.addEventListener(CART_EVENT, syncCart);

    return () => {
      window.removeEventListener(CART_EVENT, syncCart);
    };
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-matter text-xl text-[#7a6f68]">Product not found</p>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, product.category);

  return (
    <main className="min-h-screen bg-white font-saolDisplay pt-30">
      {/* Breadcrumb */}
      {/* <div className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto text-center">
          <h1 className="font-theseasons text-5xl md:text-6xl lg:text-7xl font-bold text-[#141c35] mb-4">
            Shop
          </h1>
          <p className="font-matter text-sm text-[#7a6f68]">
            Home / Shop /{" "}
            <span className="text-[#141c35]">Product Details</span>
          </p>
        </div>
      </div> */}

      {/* Product Section */}
      <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white border border-[#d9d7d1]">
              <button
                onClick={() =>
                  setSelectedImage(
                    selectedImage === 0
                      ? product.images.length - 1
                      : selectedImage - 1,
                  )
                }
                aria-label="Show previous product image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#d9d7d1] flex items-center justify-center hover:bg-[#2b3962] hover:text-white transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 42rem, 100vw"
                className="object-contain p-12"
              />
              <button
                onClick={() =>
                  setSelectedImage((selectedImage + 1) % product.images.length)
                }
                aria-label="Show next product image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#d9d7d1] flex items-center justify-center hover:bg-[#2b3962] hover:text-white transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Show product image ${index + 1}`}
                  className={`relative aspect-square border-2 ${
                    selectedImage === index
                      ? "border-[#2b3962]"
                      : "border-[#d9d7d1]"
                  } hover:border-[#2b3962] transition-colors`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 8rem, 22vw"
                    className="object-contain p-4"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="font-theseasons text-4xl md:text-5xl font-bold text-[#141c35]">
                {product.name}
              </h1>
              <button
                onClick={() => setInquiryOpen(true)}
                className="bg-[#d4a574] text-white px-6 py-2.5 font-matter font-semibold hover:bg-[#c49563] transition-colors whitespace-nowrap cursor-pointer"
              >
                Inquiry
              </button>
            </div>

            {/* Rating */}
            <RatingStars
              rating={product.rating}
              reviews={product.reviews}
              className="mb-4"
            />

            {/* Price */}
            <div className="mb-6 flex items-center gap-3">
              <span className="font-matter text-3xl font-bold text-[#2b3962]">
                {formatNpr(product.price)}
              </span>
            </div>

            {/* Description */}
            <p className="font-matter text-[#7a6f68] mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Size/Volume */}
            <div className="mb-6">
              <label className="font-matter font-semibold text-[#141c35] block mb-3">
                Size/Volume:
              </label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 border font-matter font-semibold transition-colors ${
                      selectedSize === size
                        ? "bg-[#2b3962] text-white border-[#2b3962]"
                        : "bg-white text-[#141c35] border-[#d9d7d1] hover:border-[#2b3962]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-[#d9d7d1]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-zinc-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex h-10 w-12 items-center justify-center border-x border-[#d9d7d1] font-matter font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-zinc-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.inStock && (
                  <span className="bg-[#2b3962] text-white px-3 py-2 text-xs font-matter font-semibold h-10 flex items-center">
                    In Stock
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-stretch gap-4">
                <PremiumButton
                  text="Add To Cart"
                  onClick={() => {
                    const size = selectedSize || product.sizes[0];
                    addToCart(product, {
                      quantity,
                      size,
                    });
                    toast.success("Added to cart", {
                      description: `${product.name}${size ? ` (${size})` : ""} added to your cart.`,
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
                        <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-[#1d2c63] transition-colors duration-300 group-hover/premium-btn:bg-[#2b3962] group-hover/premium-btn:text-white">
                          {cartQuantity}
                        </span>
                      ) : null}
                    </span>
                  }
                  className="min-w-50 flex-1 justify-center whitespace-nowrap rounded-none border-[#2b3962] px-8 py-3 text-xs tracking-[0.16em]! [--btn-bg:#2b3962] [--btn-fill:#ffffff] [--btn-text:#ffffff] [--btn-hover-text:#2b3962]"
                />

                <button
                  type="button"
                  onClick={() => {
                    const size = selectedSize || product.sizes[0];
                    addToCart(product, {
                      quantity,
                      size,
                    });
                    toast.success("Added to cart", {
                      description: `${product.name}${size ? ` (${size})` : ""} added to your cart.`,
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
                    router.push("/cart");
                  }}
                  className="min-w-50 flex-1 bg-[#d4a574] px-8 py-3 font-matter font-semibold text-white transition-colors hover:bg-[#c49563]"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Meta Info */}
            <div className="space-y-2 mb-6 pb-6 border-b border-[#d9d7d1]">
              <p className="font-matter text-sm text-[#7a6f68]">
                <span className="font-semibold text-[#141c35]">SKU:</span>{" "}
                {product.sku}
              </p>
              <p className="font-matter text-sm text-[#7a6f68]">
                <span className="font-semibold text-[#141c35]">Tags:</span>{" "}
                {product.tags.join(", ")}
              </p>
            </div>

            {/* Share */}
            <div className="flex items-center gap-3">
              <span className="font-matter font-semibold text-[#141c35]">
                Share:
              </span>
              <button
                aria-label="Share on Facebook"
                className="w-11 h-11 border border-[#d9d7d1] flex items-center justify-center hover:bg-[#2b3962] hover:text-white hover:border-[#2b3962] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                aria-label="Share on Twitter"
                className="w-11 h-11 border border-[#d9d7d1] flex items-center justify-center hover:bg-[#2b3962] hover:text-white hover:border-[#2b3962] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                aria-label="Share on Instagram"
                className="w-11 h-11 border border-[#d9d7d1] flex items-center justify-center hover:bg-[#2b3962] hover:text-white hover:border-[#2b3962] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                aria-label="Share on LinkedIn"
                className="w-11 h-11 border border-[#d9d7d1] flex items-center justify-center hover:bg-[#2b3962] hover:text-white hover:border-[#2b3962] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="flex flex-col gap-0 mb-8">
            {["description", "additional", "review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-matter font-semibold py-4 px-6 capitalize transition-colors text-left border-l-4 ${
                  activeTab === tab
                    ? "text-[#2b3962] border-[#2b3962] bg-[#f8f7f4]"
                    : "text-[#7a6f68] hover:text-[#141c35] border-transparent hover:bg-[#f8f7f4]/50"
                }`}
              >
                {tab === "additional" ? "Additional Information" : tab}
              </button>
            ))}
          </div>

          <div className="font-matter text-[#7a6f68] leading-relaxed">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <p>
                  Experience the perfect blend of quality and performance with
                  our carefully crafted formula. Each product is designed to
                  deliver exceptional results while being gentle on your skin.
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2b3962] mt-1">✓</span>
                    <span>100% natural ingredients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2b3962] mt-1">✓</span>
                    <span>Dermatologically tested</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2b3962] mt-1">✓</span>
                    <span>Cruelty-free and vegan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2b3962] mt-1">✓</span>
                    <span>Suitable for all skin types</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "additional" && (
              <div className="space-y-4">
                {product.additionalInfo ? (
                  <div className="grid gap-4">
                    {product.additionalInfo.weight && (
                      <div className="flex border-b border-[#d9d7d1] pb-3">
                        <span className="font-semibold text-[#141c35] w-40">
                          Weight:
                        </span>
                        <span>{product.additionalInfo.weight}</span>
                      </div>
                    )}
                    {product.additionalInfo.dimensions && (
                      <div className="flex border-b border-[#d9d7d1] pb-3">
                        <span className="font-semibold text-[#141c35] w-40">
                          Dimensions:
                        </span>
                        <span>{product.additionalInfo.dimensions}</span>
                      </div>
                    )}
                    {product.additionalInfo.ingredients && (
                      <div className="flex border-b border-[#d9d7d1] pb-3">
                        <span className="font-semibold text-[#141c35] w-40">
                          Ingredients:
                        </span>
                        <span>{product.additionalInfo.ingredients}</span>
                      </div>
                    )}
                    {product.additionalInfo.shelfLife && (
                      <div className="flex border-b border-[#d9d7d1] pb-3">
                        <span className="font-semibold text-[#141c35] w-40">
                          Shelf Life:
                        </span>
                        <span>{product.additionalInfo.shelfLife}</span>
                      </div>
                    )}
                    {product.additionalInfo.origin && (
                      <div className="flex border-b border-[#d9d7d1] pb-3">
                        <span className="font-semibold text-[#141c35] w-40">
                          Origin:
                        </span>
                        <span>{product.additionalInfo.origin}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>No additional information available.</p>
                )}
              </div>
            )}

            {activeTab === "review" && (
              <div className="space-y-6">
                {product.customerReviews &&
                product.customerReviews.length > 0 ? (
                  <>
                    <div className="flex items-center gap-4 pb-6 border-b border-[#d9d7d1]">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#2b3962]">
                          {product.rating}
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-[#7a6f68] mt-1">
                          Based on {product.reviews} reviews
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {product.customerReviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-[#d9d7d1] pb-6 last:border-0"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-[#141c35]">
                                  {review.name}
                                </span>
                                {review.verified && (
                                  <span className="text-xs bg-[#2b3962] text-white px-2 py-0.5 rounded">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-sm ${
                                      i < review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-[#7a6f68]">
                              {new Date(review.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                          <p className="text-[#7a6f68]">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="mb-8">
            <p className="font-matter text-sm text-[#7a6f68] uppercase tracking-wider mb-2">
              Related Products
            </p>
            <h2 className="font-theseasons text-4xl md:text-5xl font-bold text-[#141c35]">
              Explore <span className="text-[#d4a574]">Related Products</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {inquiryOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10172b]/55 px-4 py-4">
          <div className="w-full max-w-xl max-h-[calc(100vh-2rem)] overflow-y-auto border border-[#dbe2ee] bg-white p-6 shadow-[0_24px_80px_rgba(16,23,43,0.18)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
                  Product Inquiry
                </p>
                <h2 className="mt-2 font-matter text-2xl font-semibold text-[#141c35]">
                  Ask about {product.name}
                </h2>
                <p className="mt-3 font-matter text-sm leading-7 text-[#66758f]">
                  Share what you would like to know and we can follow up with
                  the right product details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInquiryOpen(false)}
                className="font-matter cursor-pointer text-sm font-semibold text-[#66758f] transition-colors hover:text-[#141c35]"
              >
                <X />
              </button>
            </div>

            <form
              className="mt-8 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success("Inquiry sent", {
                  description: `We received your inquiry for ${product.name}.`,
                });
                setInquiryOpen(false);
                setInquiryName("");
                setInquiryEmail("");
                setInquiryMessage("");
              }}
            >
              <div>
                <label className="block font-matter text-sm font-semibold text-[#33415d]">
                  Product
                </label>
                <input
                  value={`${product.name} (${product.sku})`}
                  readOnly
                  className="mt-3 h-13 w-full border border-[#dbe2ee] bg-[#f8fafe] px-4 font-matter text-base text-[#10172b] outline-none"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block font-matter text-sm font-semibold text-[#33415d]">
                    Full Name
                  </label>
                  <input
                    value={inquiryName}
                    onChange={(event) => setInquiryName(event.target.value)}
                    required
                    className="mt-3 h-13 w-full border border-[#dbe2ee] bg-white px-4 font-matter text-base text-[#10172b] outline-none transition-colors focus:border-[#2b3962]"
                  />
                </div>

                <div>
                  <label className="block font-matter text-sm font-semibold text-[#33415d]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={(event) => setInquiryEmail(event.target.value)}
                    required
                    className="mt-3 h-13 w-full border border-[#dbe2ee] bg-white px-4 font-matter text-base text-[#10172b] outline-none transition-colors focus:border-[#2b3962]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-matter text-sm font-semibold text-[#33415d]">
                  Inquiry
                </label>
                <textarea
                  value={inquiryMessage}
                  onChange={(event) => setInquiryMessage(event.target.value)}
                  placeholder="Tell us what you would like to know about this product."
                  required
                  rows={5}
                  className="mt-3 w-full border border-[#dbe2ee] bg-white px-4 py-3 font-matter text-base text-[#10172b] outline-none transition-colors focus:border-[#2b3962]"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-[#2b3962] px-6 py-3 font-matter text-sm font-semibold text-white transition-colors hover:bg-[#1f2d4d]"
                >
                  Send Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryOpen(false)}
                  className="border border-[#dbe2ee] bg-white px-6 py-3 font-matter text-sm font-semibold text-[#2b3962] transition-colors hover:bg-[#f8fafe]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
