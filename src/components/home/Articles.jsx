import {BASE_URL} from "@/util/Const"
import HomeArticleCard from "@/components/articles/HomeArticleCard";


export default async function Articles() {
    const res = await fetch(`${BASE_URL}/articles/popular`, {
        next: {revalidate: 60},
    });

    if (!res.ok) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 text-lg font-medium">Məqalələr yüklənmədi</div>
                <p className="text-gray-500 mt-2">Zəhmət olmasa bir az sonra yenidən cəhd edin</p>
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
    );
}
