import { Suspense } from "react"
import MostReadArticlesClient from "./MostReadArticlesClient"
import { LoadingSkeleton } from "./MostReadArticlesClient"
import {BASE_URL} from "@/util/Const";

// Server component - fetches data with ISR
async function fetchPopularArticles() {
    try {

        const response = await fetch(`${BASE_URL}/articles/popular`, {
            next: {
                revalidate: 300, // 5 dakika cache
                tags: ['popular-articles'] // Cache tag for on-demand revalidation
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error fetching popular articles:', error)
        return []
    }
}

const MostReadArticles = async ({ article: currentArticle }) => {
    const allArticles = await fetchPopularArticles()

    // Filter out current article and limit to 5
    const filteredArticles = (allArticles || [])
        .filter(a => a.id?.toString() !== currentArticle?.id?.toString())
        .slice(0, 5)

    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <MostReadArticlesClient
                articles={filteredArticles}
                currentArticle={currentArticle}
            />
        </Suspense>
    )
}

export default MostReadArticles
