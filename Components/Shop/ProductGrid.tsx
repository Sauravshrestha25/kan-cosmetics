"use client";

import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  type CollectionFilters,
  type Product,
  type SortOption,
} from "@/lib/products";

interface ProductGridProps {
  products: Product[];
  filters: CollectionFilters;
  onChangeFilters: (filters: CollectionFilters) => void;
  onClearFilters: () => void;
}

export default function ProductGrid({
  products,
  filters,
  onChangeFilters,
  onClearFilters,
}: ProductGridProps) {
  const activeChips = [
    ...filters.categories,
    ...filters.skinTypes,
    ...filters.promotions,
    ...(filters.rating ? [`${filters.rating}+ stars`] : []),
    ...(filters.availability ? [filters.availability] : []),
    ...(filters.priceRange[1] < 100
      ? [`Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}`]
      : []),
  ];

  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <p className="font-matter text-sm text-[#7a6f68]">
          Showing {products.length} result{products.length === 1 ? "" : "s"}
        </p>
        <div className="flex items-center gap-2">
          <label className="font-matter text-sm text-[#7a6f68]">Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(event) =>
              onChangeFilters({
                ...filters,
                sortBy: event.target.value as SortOption,
              })
            }
            className="font-matter text-sm border border-[#d9d7d1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2b3962]"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {activeChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-matter text-sm text-[#7a6f68]">
            Active Filters:
          </span>
          {activeChips.map((chip) => (
            <span
              key={chip}
              className="bg-[#2b3962] text-white px-3 py-1 rounded-full text-xs font-matter"
            >
              {chip}
            </span>
          ))}
          <button
            type="button"
            onClick={onClearFilters}
            className="font-matter flex gap-2 items-center cursor-pointer text-sm text-gray-400 hover:text-gray-800 "
          >
            <p>Clear All</p>
            <X />
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>

      {products.length === 0 ? (
        <div className="border border-[#d9d7d1] bg-[#fbfcfe] px-6 py-12 text-center">
          <p className="font-matter text-lg font-semibold text-[#141c35]">
            No products match these filters.
          </p>
          <p className="mt-3 font-matter text-sm text-[#7a6f68]">
            Try widening the price range or clearing a few selections.
          </p>
        </div>
      ) : null}

      <div className="flex justify-center items-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center border border-[#d9d7d1] rounded hover:bg-[#2b3962] hover:text-white hover:border-[#2b3962] transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-[#2b3962] text-white rounded font-matter font-semibold">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center border border-[#d9d7d1] rounded hover:bg-[#2b3962] hover:text-white hover:border-[#2b3962] transition-colors font-matter">
          2
        </button>
        <button className="w-10 h-10 flex items-center justify-center border border-[#d9d7d1] rounded hover:bg-[#2b3962] hover:text-white hover:border-[#2b3962] transition-colors font-matter">
          3
        </button>
        <span className="px-2 text-[#7a6f68]">...</span>
        <button className="w-10 h-10 flex items-center justify-center border border-[#d9d7d1] rounded hover:bg-[#2b3962] hover:text-white hover:border-[#2b3962] transition-colors font-matter">
          10
        </button>
        <button className="w-10 h-10 flex items-center justify-center border border-[#d9d7d1] rounded hover:bg-[#2b3962] hover:text-white hover:border-[#2b3962] transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
