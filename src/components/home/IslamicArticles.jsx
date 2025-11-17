import { BASE_URL } from "@/util/Const"
import IslamicArticleCard from "@/components/articles/IslamicArticleCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function IslamicArticles() {
    let articles;
    try {
        const res = await fetch(`${BASE_URL}/articles/popular`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return null;
        }

        articles = await res.json();
    } catch (e) {
        console.log(e)
        return null;
    }

    if (!articles || articles.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-stone-600 text-lg font-medium">Hələ ki məqalə yoxdur</div>
                <p className="text-stone-500 mt-2">Yaxın zamanda yeni məqalələr əlavə ediləcək</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            {/* Başlıq bölməsi - Minimal və zərif */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 font-medium text-sm mb-4 border border-primary-100">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    Ən Son Məqalələr
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                    İlahi Bilik və Hikmət
                </h2>
                <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
                    İslami elm və hikmətdən doğan məqalələrimizlə ruhunuzu zənginləşdirin
                </p>
                {/* İncə xətt - minimal dekor */}
                <div className="mt-8 w-24 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-12">
                {/* Məqalələr grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {articles.map((article, index) => (
                        <div
                            key={article.id}
                            className="animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <IslamicArticleCard article={article} />
                        </div>
                    ))}
                </div>

                {/* Hamısına bax düyməsi - Minimal */}
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
        </div>
    );
}
