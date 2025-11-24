import { BASE_URL } from "@/util/Const";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types";

interface Props {
  limit?: number;
}

/**
 * Popular Articles Component
 * Server Component with SSR support and SEO optimization
 */
export default async function PopularArticles({ limit = 6 }: Props) {
  let articles: Article[] = [];

  try {
    const res = await fetch(`${BASE_URL}/articles/popular`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    articles = Array.isArray(data) ? data.slice(0, limit) : [];
  } catch (err) {
    console.error("PopularArticles fetch error:", err);
    articles = [];
  }

  if (!articles?.length) {
    return null;
  }

  return (
    <aside>
      <h3
        style={{ lineHeight: "1" }}
        className="text-lg mb-6 text-gray-800 border-l-4 pl-4 border-yellow-500"
      >
        En Çok Okunanlar
      </h3>

      <ul className="space-y-6">
        {articles.map((article) => {
          const articleId = String(article.id);
          const imageUrl = article.image || article.thumbnail || "";
          const category = article.category || article.categories?.[0]?.name || "İslami məqalə";

          return (
            <li key={articleId}>
              <Link
                href={`/articles/${articleId}`}
                className="flex items-center space-x-4 group"
              >
                {imageUrl && (
                  <div className="relative w-24 h-14 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`${article.title} - İslami məqalə (${category})`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4
                    style={{ fontSize: "13px" }}
                    className="text-sm transition hover:text-[#fcb900] truncate-multiline font-normal text-gray-700 line-clamp-2"
                  >
                    {article.title}
                  </h4>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
