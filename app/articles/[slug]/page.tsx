import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { PageContainer } from "@/Components/ui/design-system";
import { articles } from "../articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-white pt-28 pb-20 font-saolDisplay">
      <PageContainer>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 font-matter text-sm font-medium text-[#7a6f68] transition-colors hover:text-[#141c35]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        <div className="mt-8 border border-[#d9d7d1] bg-white">
          <div className="relative aspect-[16/8.4] bg-[#f8f7f4]">
            <Image
              src={article.image}
              alt={article.alt}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="border-t border-[#d9d7d1] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <p className="font-matter text-sm text-[#7a6f68]">
              {article.category}
            </p>

            <h1 className="mt-3 font-matter text-[clamp(2.4rem,4vw,4rem)] font-bold leading-[1.08] tracking-[-0.05em] text-[#141c35]">
              {article.title}
            </h1>

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

            <div className="mt-8 space-y-6 font-matter text-base leading-8 text-[#7a6f68]">
              {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
