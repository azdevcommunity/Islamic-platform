import { BASE_URL } from "@/util/Const"
import HomeArticleCard from "@/components/articles/HomeArticleCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default async function Articles() {
    const res = await fetch(`${BASE_URL}/articles/popular`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return (
            <div className="text-center ">
                {/*<div className="text-red-600 text-lg font-medium">Məqalələr yüklənmədi</div>*/}
                {/*<p className="text-gray-500 mt-2">Zəhmət olmasa bir az sonra yenidən cəhd edin</p>*/}
            </div>
        );
    }

    const articles = await res.json();

    if (!articles || articles.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-600 text-lg font-medium">Hələ ki məqalə yoxdur</div>
                <p className="text-gray-500 mt-2">Yaxın zamanda yeni məqalələr əlavə ediləcək</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#43b365]/10 rounded-full text-[#43b365] font-medium text-sm mb-4">
                    <span className="w-2 h-2 bg-[#43b365] rounded-full"></span>
                    Ən Son Məqalələr
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    İlahi Bilik və Hikmət
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    İslami elm və hikmətdən doğan məqalələrimizlə ruhunuzu zənginləşdirin
                </p>
                <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#43b365] to-[#2d7a47] mx-auto rounded-full"></div>
            </div>
            <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {articles.map((article, index) => (
                        <div
                            key={article.id}
                            className="animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <HomeArticleCard article={article} />
                        </div>
                    ))}
                </div>

                {/* View All Articles Button */}
                <div className="text-center">
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#43b365] to-[#2d7a47] text-white font-semibold rounded-full hover:from-[#2d7a47] hover:to-[#1e5a32] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Bütün məqalələr
                        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>

    );
}
