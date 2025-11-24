/**
 * Articles Section Component
 * Displays popular articles on the home page
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apiConfig } from "@/config/api";
import ArticleCard from "@/components/articles/ArticleCard";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import type { Article } from "@/types";

async function getPopularArticles(): Promise<Article[]> {
  try {
    const res = await fetch(
      `${apiConfig.baseUrl}${apiConfig.endpoints.articles.popular}`,
      {
        next: { revalidate: apiConfig.revalidate.articles },
      }
    );

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
}

export async function ArticlesSection() {
  const articles = await getPopularArticles();

  if (!articles || articles.length === 0) {
    return (
      <Container>
        <div className="text-center py-12">
          <div className="text-stone-600 text-lg font-medium">
            Hələ ki məqalə yoxdur
          </div>
          <p className="text-stone-500 mt-2">
            Yaxın zamanda yeni məqalələr əlavə ediləcək
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <SectionHeader
        badge="Ən Son Məqalələr"
        title="İlahi Bilik və Hikmət"
        description="İslami elm və hikmətdən doğan məqalələrimizlə ruhunuzu zənginləşdirin"
      />

      <div className="space-y-12">
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <div
              key={article.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Bütün məqalələr
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Container>
  );
}
