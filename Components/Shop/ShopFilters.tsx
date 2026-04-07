"use client";

import { useRef } from "react";
import RatingStars from "./RatingStars";
import {
  COLLECTION_CATEGORIES,
  formatNpr,
  PROMOTION_OPTIONS,
  SKIN_TYPES,
  type CollectionFilters,
  type ProductCategory,
  type Promotion,
  type SkinType,
} from "@/lib/products";

const MIN_PRICE = 10;
const MAX_PRICE = 100;
const controlClassName =
  "h-4 w-4 cursor-pointer appearance-none border border-[#c9d1e3] bg-white align-middle transition checked:border-[#1d2c63] checked:bg-[#1d2c63] focus:outline-none focus:ring-2 focus:ring-[#1d2c63]/15";

interface ShopFiltersProps {
  filters: CollectionFilters;
  onChange: (filters: CollectionFilters) => void;
}

export default function ShopFilters({ filters, onChange }: ShopFiltersProps) {
  const priceTrackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleFilter = <T extends string>(
    value: string,
    selected: T[],
    key: "categories" | "skinTypes" | "promotions",
  ) => {
    const nextSelected = selected.includes(value as T)
      ? selected.filter((item) => item !== value)
      : [...selected, value as T];

    onChange({ ...filters, [key]: nextSelected });
  };

  const updatePriceOnHover = (clientX: number) => {
    const track = priceTrackRef.current;

    if (!track) return;

    const rect = track.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const nextValue = Math.round(MIN_PRICE + ratio * (MAX_PRICE - MIN_PRICE));

    onChange({ ...filters, priceRange: [MIN_PRICE, nextValue] });
  };

  const handleFilterWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;

    if (!container || container.scrollHeight <= container.clientHeight) return;

    container.scrollTop += event.deltaY;
    event.preventDefault();
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="lg:sticky lg:top-24">
        <div
          ref={scrollContainerRef}
          onWheel={handleFilterWheel}
          className="border border-[#d9d7d1] bg-white p-6 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:overscroll-contain"
        >
          <h2 className="font-matter font-bold text-[#141c35] text-lg mb-6">
            Filter Options
          </h2>

          {/* By Categories */}
          <div className="mb-8 pb-8 border-b border-[#d9d7d1]">
            <h3 className="font-matter font-semibold text-[#141c35] mb-4">
              By Categories
            </h3>
            <div className="space-y-3">
              {COLLECTION_CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() =>
                      toggleFilter<ProductCategory>(
                        category,
                        filters.categories,
                        "categories",
                      )
                    }
                    className={`${controlClassName} rounded-[3px]`}
                  />
                  <span className="font-matter text-sm text-[#7a6f68] group-hover:text-[#141c35] transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* By Skin Type */}
          <div className="mb-8 pb-8 border-b border-[#d9d7d1]">
            <h3 className="font-matter font-semibold text-[#141c35] mb-4">
              By Skin Type
            </h3>
            <div className="space-y-3">
              {SKIN_TYPES.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.skinTypes.includes(type)}
                    onChange={() =>
                      toggleFilter<SkinType>(
                        type,
                        filters.skinTypes,
                        "skinTypes",
                      )
                    }
                    className={`${controlClassName} rounded-[3px]`}
                  />
                  <span className="font-matter text-sm text-[#7a6f68] group-hover:text-[#141c35] transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-8 pb-8 border-b border-[#d9d7d1]">
            <h3 className="font-matter font-semibold text-[#141c35] mb-4">
              Price
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-[#7a6f68]">
                <span>{formatNpr(filters.priceRange[0])}</span>
                <span>-</span>
                <span>{formatNpr(filters.priceRange[1])}</span>
              </div>
              <div
                ref={priceTrackRef}
                onMouseMove={(event) => updatePriceOnHover(event.clientX)}
                onMouseEnter={(event) => updatePriceOnHover(event.clientX)}
                className="group relative h-8 cursor-ew-resize"
                aria-label="Hover to adjust maximum price"
                role="slider"
                aria-valuemin={MIN_PRICE}
                aria-valuemax={MAX_PRICE}
                aria-valuenow={filters.priceRange[1]}
              >
                <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-[#d9d7d1]" />
                <div
                  className="absolute top-1/2 h-1 -translate-y-1/2 bg-[#2b3962]"
                  style={{
                    width: `${((filters.priceRange[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                  }}
                />
                <div
                  className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 border border-[#2b3962] bg-white shadow-[0_6px_18px_rgba(43,57,98,0.16)] transition-transform group-hover:scale-110"
                  style={{
                    left: `${((filters.priceRange[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Review */}
          <div className="mb-8 pb-8 border-b border-[#d9d7d1]">
            <h3 className="font-matter font-semibold text-[#141c35] mb-4">
              Review
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-[#7a6f68]">
                <span>Minimum rating:</span>
                <div className="flex items-center gap-1">
                  <RatingStars rating={filters.rating || 1} size="sm" />
                  <span>
                    {filters.rating || 1} star{filters.rating !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div className="relative h-8 cursor-ew-resize group">
                <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-[#d9d7d1]" />
                <div
                  className="absolute top-1/2 h-1 -translate-y-1/2 bg-[#2b3962]"
                  style={{
                    width: `${(((filters.rating || 1) - 1) / 4) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={filters.rating || 1}
                  onChange={(e) =>
                    onChange({ ...filters, rating: parseInt(e.target.value) })
                  }
                  className="absolute top-1/2 w-full -translate-y-1/2 appearance-none bg-transparent cursor-ew-resize slider-thumb"
                />
              </div>
              <div className="flex justify-between text-xs text-[#7a6f68]">
                <span>1 star</span>
                <span>5 stars</span>
              </div>
            </div>
          </div>

          {/* By Promotions */}
          <div className="mb-8 pb-8 border-b border-[#d9d7d1]">
            <h3 className="font-matter font-semibold text-[#141c35] mb-4">
              By Promotions
            </h3>
            <div className="space-y-3">
              {PROMOTION_OPTIONS.map((promo) => (
                <label
                  key={promo}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.promotions.includes(promo)}
                    onChange={() =>
                      toggleFilter<Promotion>(
                        promo,
                        filters.promotions,
                        "promotions",
                      )
                    }
                    className={`${controlClassName} rounded-[3px]`}
                  />
                  <span className="font-matter text-sm text-[#7a6f68] group-hover:text-[#141c35] transition-colors">
                    {promo}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-matter font-semibold text-[#141c35] mb-4">
              Availability
            </h3>
            <div className="space-y-3">
              {["In Stock", "Out of Stock"].map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="availability"
                    checked={filters.availability === status}
                    onChange={() =>
                      onChange({
                        ...filters,
                        availability: status as "In Stock" | "Out of Stock",
                      })
                    }
                    className={`${controlClassName} rounded-full`}
                  />
                  <span className="font-matter text-sm text-[#7a6f68] group-hover:text-[#141c35] transition-colors">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
