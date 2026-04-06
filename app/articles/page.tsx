"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";
import { useMemo, useState } from "react";
import { PageContainer } from "@/Components/ui/design-system";
import { articles, categories } from "./articles";

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") {
      return articles;
    }

    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="bg-white pt-28 pb-20 font-saolDisplay">
      <PageContainer>
        <div className="mb-8">
          <h1 className="font-theseasons text-[clamp(2.8rem,5.4vw,5rem)] font-bold tracking-[-0.06em] text-[#141c35]">
            Articles
          </h1>
          <p className="mt-4 font-matter text-lg text-[#7a6f68]">
            Discover beauty tips, trends, and insights
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={[
                "border px-6 py-3 font-matter text-sm font-semibold transition-colors",
                activeCategory === category
                  ? "border-[#2b3962] bg-[#2b3962] text-white"
                  : "border-[#d9d7d1] bg-white text-[#141c35] hover:border-[#2b3962] hover:text-[#2b3962]",
              ].join(" ")}
            >
              {category}
            </button>
          ))}
        </div>

        <section className="mt-8 grid gap-6 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="overflow-hidden border border-[#d9d7d1] bg-white shadow-[0_12px_30px_rgba(20,28,53,0.04)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[1.18/1] bg-[#f8f7f4]">
                <Image
                  src={article.image}
                  alt={article.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="border-t border-[#d9d7d1] px-6 py-7">
                <p className="font-matter text-sm text-[#7a6f68]">
                  {article.category}
                </p>

                <h2 className="mt-3 font-matter text-[2rem] font-bold leading-[1.15] tracking-[-0.05em] text-[#141c35]">
                  {article.title}
                </h2>

                <p className="mt-4 font-matter text-base leading-7 text-[#7a6f68]">
                  {article.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-5 font-matter text-sm text-[#7a6f68]">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {filteredArticles.length === 0 ? (
          <div className="mt-8 border border-[#d9d7d1] bg-[#fbfcfe] px-6 py-12 text-center">
            <p className="font-matter text-lg font-semibold text-[#141c35]">
              No articles found in this category.
            </p>
            <p className="mt-3 font-matter text-sm text-[#7a6f68]">
              Try another filter to explore more beauty stories and tips.
            </p>
          </div>
        ) : null}
      </PageContainer>
    </main>
  );
}
