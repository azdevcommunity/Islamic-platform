import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        // Revalidate the popular articles cache
        revalidateTag('popular-articles')
        
        return NextResponse.json({ 
            revalidated: true, 
            message: 'Popular articles cache revalidated successfully' 
        })
    } catch (error) {
        console.error('Error revalidating popular articles:', error)
        return NextResponse.json(
            { error: 'Failed to revalidate cache' }, 
            { status: 500 }
        )
    }
}