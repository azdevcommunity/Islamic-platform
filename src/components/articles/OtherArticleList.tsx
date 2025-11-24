import OtherArticleCard from "@/components/articles/OtherArticleCard";
import type { Article } from "@/types";

interface Props {
  articles?: Article[];
}

/**
 * Other Articles List Component
 * Displays categorized article lists with type-safe mapping
 */
export default function OtherArticleList({ articles }: Props) {
  // Mock data - bu real API-dən gələcək
  const mockArticles: Article[] = [
    {
      id: "1",
      title: "Efendimiz (s.a.v.) Boykot Döneminde Nasıl Sıkıntılar Çekmiştir?",
      createdDate: "1 Ekim 2024",
      image:
        "https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp",
      category: "İman",
    },
    {
      id: "2",
      title: "Ebû Talip İmanlı mı Öldü? – Hz. Hatice'nin (r.a.) Vefatı",
      createdDate: "1 Ekim 2024",
      image:
        "https://hayalhanem.com/wp-content/uploads/2024/10/Hz.-Hamzar.a.-Nasil-Sehit-Oldu-Muslumanlar-Uhudda-Neden-Galibiyet-Elde-Edemediler.webp",
      category: "İman",
    },
    {
      id: "3",
      title: "Efendimiz (s.a.v.) Taif'te Kimler Taşladı?",
      createdDate: "Ekim 1, 2024",
      image:
        "https://hayalhanem.com/wp-content/uploads/2024/10/Munafiklarin-Ahlaki-Ozellikleri-Hadislerde-Nasil-Gecmektedir.webp",
      category: "İman",
    },
    {
      id: "4",
      title: "Efendimiz (s.a.v.) Hayatı Boyunca Ne Sıkıntılar Yaşamıştır?",
      createdDate: "Ekim 1, 2024",
      image:
        "https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp",
      category: "İman",
    },
  ];

  const fikhArticle: Article = {
    id: "5",
    title:
      "Müslümanın Borcu Olur mu? – Efendimiz (s.a.v.) Borcu Olan Müslümanın Cenaze Namazını Kıldırmamış mıdır?",
    createdDate: "Ekim 1, 2024",
    image:
      "https://hayalhanem.com/wp-content/uploads/2024/10/efendimiz-cenaze-namazi-kildirmismidir-.webp",
    category: "Fıkıh",
  };

  const displayArticles = articles && articles.length > 0 ? articles : mockArticles;

  if (!displayArticles?.length) {
    return null;
  }

  // Kategoriyalara görə ayır
  const imanArticles = displayArticles.filter(
    (article) => article.category?.toLowerCase() === "iman" || !article.category
  );
  const fikhArticles = displayArticles.filter(
    (article) => article.category?.toLowerCase() === "fıkıh" || article.category?.toLowerCase() === "fikih"
  );

  return (
    <section className="mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-x-12">
        {/* İman Column */}
        {imanArticles.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">İMAN</h2>
            {imanArticles.map((article, index) => (
              <div key={String(article.id)}>
                <OtherArticleCard article={article} />
                {index !== imanArticles.length - 1 && (
                  <hr className="border-gray-300 mb-4" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Fıkıh Column */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">FIKIH</h2>
          {fikhArticles.length > 0 ? (
            fikhArticles.map((article, index) => (
              <div key={String(article.id)}>
                <OtherArticleCard article={article} />
                {index !== fikhArticles.length - 1 && (
                  <hr className="border-gray-300 mb-4" />
                )}
              </div>
            ))
          ) : (
            <OtherArticleCard article={fikhArticle} />
          )}
        </div>
      </div>
    </section>
  );
}
