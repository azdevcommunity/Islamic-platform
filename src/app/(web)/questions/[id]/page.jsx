import {notFound} from 'next/navigation';
import {BASE_URL} from '@/util/Const';
import Script from 'next/script';
import {formatDate} from "@/util/DateUtil";

// Import Layouts/Components
import QuestionDetailWrapper from '@/layouts/QuestionDetailWrapper'; // Import the new Wrapper
// Client interactions component is imported within the Wrapper

// Skeleton import - Assuming it exists here:
// import QuestionDetailSkeleton from "@/components/skeletons/QuestionDetailSkeleton";

// --- Server-side Data Fetching ---
async function getQuestion(id) {
    try {
        const res = await fetch(`${BASE_URL}/questions/${id}`, {next: {revalidate: 3600}}); // Revalidate hourly
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Failed to fetch question: ${res.status}`);
        }
        const data = await res.json();
        // Basic validation
        if (!data || typeof data !== 'object' || !data.id) {
            throw new Error("Invalid data format received.");
        }
        // Pre-process data slightly for layout if needed
        return {
            ...data,
            categories: Array.isArray(data.categories) ? data.categories : [],
            tags: Array.isArray(data.tags) ? data.tags : [],
            createdDateFormatted: formatDate(data.createdDate),
            readCount: data.viewCount ?? 0,
            initialLikeCount: data.likeCount ?? 0,
            readTimeMinutes: data.readTime ?? Math.max(1, Math.ceil((data.answer?.length || 0) / 1000)),
        };
    } catch (error) {
        console.error("Error fetching question:", error);
        return null;
    }
}

// --- Dynamic Metadata Generation ---
export async function generateMetadata({params}) {
    const {id} = await params;
    const questionData = await getQuestion(id);

    if (!questionData) {
        return {
            title: 'Sual Tapılmadı',
            description: 'Axtardığınız sual mövcud deyil.',
            robots: {index: false},
        };
    }

    const cleanDescription = questionData.answer?.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim().substring(0, 160)
        || `Əhli-Sünnə Mədrəsəsi - ${questionData.question} sualına cavab.`;

    const keywords = [
        questionData.question,
        ...(questionData.categories?.map(c => c.name) || []),
        ...(questionData.tags?.map(t => t.name) || []),
        'Əhli-Sünnə Mədrəsəsi', 'İslam', 'sual', 'cavab', 'din',
    ].filter(Boolean).join(', ');

    const imageUrl = questionData.image || 'https://www.ehlisunnemedresesi.az/images/og-question-default.jpg'; // Default OG

    return {
        title: `${questionData.question} | Əhli-Sünnə Mədrəsəsi`,
        description: cleanDescription,
        keywords: keywords,
        alternates: {
            canonical: `/questions/${questionData.id}`,
        },
        openGraph: {
            title: `${questionData.question} | Əhli-Sünnə Mədrəsəsi`,
            description: cleanDescription,
            url: `https://www.ehlisunnemedresesi.az/questions/${questionData.id}`,
            siteName: 'Əhli-Sünnə Mədrəsəsi',
            images: [{url: imageUrl, width: 1200, height: 630, alt: questionData.question}],
            locale: 'az_AZ',
            type: 'article',
            publishedTime: questionData.createdDate, // Use createdDate if available
            // modifiedTime: questionData.updatedDate || questionData.createdDate,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${questionData.question} | Əhli-Sünnə Mədrəsəsi`,
            description: cleanDescription,
            images: [imageUrl],
        },
        robots: {index: true, follow: true},
    };
}

// --- Page Component (Server Component - Simplified) ---
export default async function QuestionPage({params}) {
    const {id}  = await params
    const question = await getQuestion(id);

    if (!question) {
        notFound();
    }

    // JSON-LD Structured Data for Q&A
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Question',
        name: question.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: question.answer?.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim() || "Cavab mövcuddur.",
        },
        answerCount: 1,
        upvoteCount: question.initialLikeCount,
        dateCreated: question.createdDate,
        // Optional: Add author if available
        // author: { '@type': 'Person', name: 'Asker Name' },
        publisher: {
            '@type': 'Organization',
            name: 'Əhli-Sünnə Mədrəsəsi',
            logo: {'@type': 'ImageObject', url: 'https://www.ehlisunnemedresesi.az/esm_logo.png'},
        },
    };

    // Fetch Related Questions (Server-side)
    const relatedQuestionsResponse = await fetch(`${BASE_URL}/questions/${id}/related`, {next: {revalidate: 3600}});
    const relatedQuestions = await relatedQuestionsResponse.json();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            {/* Render the wrapper component, passing data */}
            <QuestionDetailWrapper question={question} relatedQuestions={relatedQuestions}/>
        </>
    );
}
