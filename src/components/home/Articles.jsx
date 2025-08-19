import Image from "next/image";
import Link from "next/link";
import {FiArrowRight} from "react-icons/fi";
import {BASE_URL} from "@/util/Const"



const ArticleCard = async ({article}) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-shadow duration-300 hover:shadow-lg">
            <div className="relative w-full aspect-video overflow-hidden"> {/* Aspect ratio for image */}
                <Image
                    src={article.image}
                    alt={article.title}
                    fill // Use fill layout
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 mb-2">{article.date}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">{article.title}</h3>
                {/*<p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>*/}
                <Link href={`/articles/${article.id}`} // Adjust link as per your routing structure
                      className="inline-flex items-center text-sm font-medium text-[#43b365] hover:text-[#59a365] group mt-auto">
                    Davamını Oxu
                    <FiArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"/>
                </Link>
            </div>
        </div>
    );
};

const res = await fetch(`${BASE_URL}/articles/popular`, { next: { revalidate: 60 } });

const articles = await res.json()


export default function Articles() {

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article}/>
            ))}
        </div>
    );
}
