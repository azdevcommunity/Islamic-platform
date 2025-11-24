import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types";

interface Props {
  article: Article;
}

/**
 * Article Card Component
 * Semantic, accessible card with SEO-friendly markup
 */
export default function OtherArticleCard({ article }: Props) {
  const articleId = String(article.id);
  const imageUrl = article.image || article.thumbnail || "";
  const category = article.category || article.categories?.[0]?.name || "İslami məqalə";
  const date = article.createdDate || article.createdAt || "";

  return (
    <article
      itemScope
      itemType="https://schema.org/Article"
      className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6"
    >
      <Link
        href={`/articles/${articleId}`}
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full group"
      >
        {/* Image */}
        {imageUrl && (
          <div className="w-full sm:w-1/4 relative h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={imageUrl}
              alt={`${article.title} - İslami məqalə (${category})`}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover"
              itemProp="image"
            />
          </div>
        )}

        {/* Text */}
        <div className="w-full sm:w-3/4 flex-1">
          <h3
            style={{ fontSize: "15px" }}
            className="text-md hover:text-[#fcb900] transition mb-2 font-normal text-gray-800"
            itemProp="headline"
          >
            {article.title}
          </h3>
          {date && (
            <time
              className="text-gray-500 text-xs mt-1 block"
              dateTime={date}
              itemProp="datePublished"
            >
              {date}
            </time>
          )}
        </div>
      </Link>
    </article>
  );
}
