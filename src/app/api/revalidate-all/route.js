import { revalidatePath, revalidateTag } from "next/cache"

const paths = [
    '/',
    '/videos',
    '/videos/**',
    '/search',
    '/search/**',
    '/articles',
    '/articles/**',
    '/books',
    '/books/**',
    '/questions',
    '/questions/**',
    '/contact',
    '/about'
]

const tags = [
    'popular-articles',
    'articles',
    'videos',
    'books',
    'questions'
]

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    // Secret key doğrulaması
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
        return new Response("Unauthorized", { status: 401 })
    }

    try {
        // Path revalidation
        paths.forEach(path => {
            revalidatePath(path)
        })

        // Tag revalidation
        tags.forEach(tag => {
            revalidateTag(tag)
        })

        return new Response(`Revalidated ${paths.length} paths and ${tags.length} tags successfully`, { status: 200 })
    } catch (error) {
        return new Response(`Revalidation error: ${error.message}`, { status: 500 })
    }
}

