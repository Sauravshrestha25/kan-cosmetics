"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ShopFilters from "@/Components/Shop/ShopFilters";
import ProductGrid from "@/Components/Shop/ProductGrid";
import { PageContainer, SectionHeading } from "@/Components/ui/design-system";
import {
  DEFAULT_COLLECTION_FILTERS,
  filterProducts,
  products,
} from "@/lib/products";

export default function CollectionPage() {
  const [filters, setFilters] = useState(DEFAULT_COLLECTION_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters],
  );

  const activeFilterCount =
    filters.categories.length +
    filters.skinTypes.length +
    filters.promotions.length +
    (filters.rating ? 1 : 0) +
    (filters.availability ? 1 : 0);

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  return (
    <main className="min-h-screen bg-white font-saolDisplay">
      <PageContainer className="py-12 pt-24">
        <SectionHeading
          eyebrow="Curated selection"
          title="Collections"
          description="Explore KAN essentials across skincare, makeup, and everyday beauty staples."
          className="mb-10 max-w-3xl"
        />

        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex h-12 items-center gap-3 border border-[#d9d7d1] bg-white px-4 font-matter text-sm font-semibold text-[#141c35] transition-colors hover:border-[#2b3962] hover:text-[#2b3962]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 ? (
              <span className="inline-flex min-w-6 items-center justify-center bg-[#1d2c63] px-2 py-1 text-xs text-white">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="hidden lg:block lg:self-start">
            <ShopFilters filters={filters} onChange={setFilters} />
          </div>
          <ProductGrid
            products={filteredProducts}
            filters={filters}
            onChangeFilters={setFilters}
            onClearFilters={() => setFilters(DEFAULT_COLLECTION_FILTERS)}
          />
        </div>
      </PageContainer>

      <div
        className={[
          "fixed inset-0 z-[70] bg-[#10172b]/40 transition-opacity duration-300 lg:hidden",
          filtersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setFiltersOpen(false)}
        aria-hidden={!filtersOpen}
      />

      <aside
        className={[
          "fixed inset-y-0 left-0 z-[71] flex w-[min(24rem,calc(100vw-2rem))] flex-col border-r border-[#d9d7d1] bg-white transition-transform duration-300 ease-out lg:hidden",
          filtersOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-hidden={!filtersOpen}
      >
        <div className="flex items-center justify-between border-b border-[#ece8e1] px-5 py-4">
          <div>
            <p className="font-matter text-xs uppercase tracking-[0.18em] text-[#8a93a6]">
              Collections
            </p>
            <h2 className="mt-1 font-matter text-lg font-semibold text-[#141c35]">
              Filter Products
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#d9d7d1] text-[#141c35] transition-colors hover:border-[#2b3962] hover:text-[#2b3962]"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <ShopFilters filters={filters} onChange={setFilters} />
        </div>
      </aside>
    </main>
  );
}
