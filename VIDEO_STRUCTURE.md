# Video System Architecture

## Overview
Professional video and playlist system with SEO-optimized static generation and client-side interactivity.

## Folder Structure

```
src/
├── app/(web)/videos/
│   ├── page.tsx                          # Main videos page (client-side grid)
│   ├── [videoId]/
│   │   ├── page.tsx                      # Individual video page (SSG + SEO)
│   │   └── not-found.tsx                 # Video not found page
│   └── playlist/
│       └── [playlistId]/
│           ├── page.tsx                  # Individual playlist page (SSG + SEO)
│           └── not-found.tsx             # Playlist not found page
│
└── components/videos/
    ├── VideosClientPage.tsx              # Client-side main page logic
    ├── VideosGridClient.tsx              # Client-side videos grid
    ├── PlaylistsGridClient.tsx           # Client-side playlists grid
    ├── ModernSearchAndToggle.tsx         # Search and toggle controls
    ├── ModernSearchComponent.tsx         # Search input component
    ├── VideoDetailPage.tsx               # Video detail page component
    ├── PlaylistDetailPage.tsx            # Playlist detail page component
    └── VideoPlayerPlaylistItemsStatic.tsx # Static playlist items sidebar
```

## Page Behaviors

### 1. `/videos` - Main Videos Page
- **Type**: Client-side rendered
- **Features**:
  - Videos & Playlists grid list
  - Client-side pagination
  - Client-side search
  - Toggle between videos/shorts/playlists
  - All interactions happen client-side
- **SEO**: Basic metadata only (no dynamic content)
- **Revalidation**: N/A (client-side)

### 2. `/videos/[videoId]` - Individual Video Page
- **Type**: Static Site Generation (SSG)
- **Features**:
  - `generateStaticParams`: Pre-generates all video pages
  - `generateMetadata`: Dynamic SEO metadata per video
  - Video player with YouTube embed
  - Related playlist videos in sidebar
  - Structured data (JSON-LD) for search engines
- **SEO**: Full SEO optimization with video metadata
- **Revalidation**: 3600 seconds (1 hour)

### 3. `/videos/playlist/[playlistId]` - Individual Playlist Page
- **Type**: Static Site Generation (SSG)
- **Features**:
  - `generateStaticParams`: Pre-generates all playlist pages
  - `generateMetadata`: Dynamic SEO metadata per playlist
  - First video auto-plays
  - All playlist videos in sidebar
  - Structured data (JSON-LD) for search engines
- **SEO**: Full SEO optimization with playlist metadata
- **Revalidation**: 3600 seconds (1 hour)

## Design Consistency
All pages share the same design language:
- Same color scheme (slate/red gradient)
- Same card styles
- Same hover effects
- Same typography
- Consistent spacing and layout

## API Integration
- Base URL: `process.env.NEXT_PUBLIC_BASE_URL`
- Endpoints:
  - `GET /videos` - List videos with pagination
  - `GET /videos/{videoId}` - Get single video
  - `GET /playlists` - List all playlists
  - `GET /playlists/{playlistId}` - Get single playlist
  - `GET /playlists/of-video/{videoId}` - Find playlist for video

## SEO Features
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data (JSON-LD) for rich snippets
- Canonical URLs
- Proper meta descriptions
- Video-specific metadata

## Performance Optimizations
- Static generation for individual pages
- Client-side rendering for list pages
- Image optimization with Next.js Image
- Lazy loading for images
- Infinite scroll for playlist items
- Revalidation strategy (ISR)

## Navigation Flow
1. User visits `/videos` → Sees grid of videos/playlists
2. User clicks video → Goes to `/videos/[videoId]` (static page)
3. User clicks playlist → Goes to `/videos/playlist/[playlistId]` (static page)
4. From detail pages, users can navigate to related videos via sidebar

## Build Process
During `next build`:
1. Fetches all videos from API
2. Generates static pages for each video
3. Fetches all playlists from API
4. Generates static pages for each playlist
5. Creates optimized HTML for each page
6. Includes all SEO metadata in HTML

## Revalidation Strategy
- Static pages revalidate every hour (3600s)
- Ensures fresh content without rebuilding
- Maintains fast page loads
- Balances freshness with performance
