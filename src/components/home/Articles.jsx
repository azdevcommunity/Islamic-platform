import {BASE_URL} from "@/util/Const"
import HomeArticleCard from "@/components/articles/HomeArticleCard";


export default async function Articles() {
    const res = await fetch(`${BASE_URL}/articles/popular`, {
        next: {revalidate: 60},
    });

    if (!res.ok) {
        return <div className="text-sm text-red-600">Məqalələr yüklənmədi.</div>;
    }

    const articles = await res.json();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {articles.map((article) => (
                <HomeArticleCard key={article.id} article={article}/>
            ))}
        </div>
    );
}
