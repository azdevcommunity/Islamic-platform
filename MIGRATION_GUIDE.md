# Migration Guide: Old Videos System → New Videos System

## What Changed?

### Before (Old System)
- Single `/videos` page with server-side rendering
- Query parameters for video/playlist selection
- Mixed SSR and client-side logic
- No individual pages for videos/playlists
- Limited SEO optimization

### After (New System)
- `/videos` - Client-side grid list page
- `/videos/[videoId]` - Static individual video pages
- `/videos/playlist/[playlistId]` - Static individual playlist pages
- Full SEO optimization with metadata
- Clean separation of concerns

## URL Structure Changes

### Old URLs
```
/videos?videoId=abc123
/videos?playlistId=xyz789
/videos?content=playlists&search=test
```

### New URLs
```
/videos                              # Main grid list
/videos?content=videos&search=test   # With filters
/videos/abc123                       # Individual video
/videos/playlist/xyz789              # Individual playlist
```

## Files Created

### Pages
- `src/app/(web)/videos/page.tsx` - Main videos page (updated)
- `src/app/(web)/videos/[videoId]/page.tsx` - Individual video page (NEW)
- `src/app/(web)/videos/[videoId]/not-found.tsx` - Video not found (NEW)
- `src/app/(web)/videos/playlist/[playlistId]/page.tsx` - Playlist page (NEW)
- `src/app/(web)/videos/playlist/[playlistId]/not-found.tsx` - Playlist not found (NEW)

### Components
- `src/components/videos/VideosClientPage.tsx` - Main page logic (NEW)
- `src/components/videos/VideosGridClient.tsx` - Videos grid (NEW)
- `src/components/videos/PlaylistsGridClient.tsx` - Playlists grid (NEW)
- `src/components/videos/ModernSearchAndToggle.tsx` - Search/toggle (UPDATED)
- `src/components/videos/ModernSearchComponent.tsx` - Search input (UPDATED)
- `src/components/videos/VideoDetailPage.tsx` - Video detail (NEW)
- `src/components/videos/PlaylistDetailPage.tsx` - Playlist detail (NEW)
- `src/components/videos/VideoPlayerPlaylistItemsStatic.tsx` - Sidebar (NEW)

## Files That Can Be Removed (Optional)

These old files are no longer needed but kept for reference:
- `src/layouts/VideosPage.jsx` - Replaced by VideosClientPage
- `src/components/videos/VideosGrid.jsx` - Replaced by VideosGridClient
- `src/components/videos/PlaylistsGrid.jsx` - Replaced by PlaylistsGridClient
- `src/components/videos/VideoPlayer.jsx` - Replaced by VideoDetailPage
- `src/components/videos/ModernSearchAndToggle.jsx` - Replaced by .tsx version
- `src/components/videos/ModernSearchComponent.jsx` - Replaced by .tsx version

## Breaking Changes

### 1. URL Parameters
Old query parameters like `?videoId=` and `?playlistId=` are now routes:
- Update any internal links to use new URL structure
- Old URLs will still work but should be redirected

### 2. Component Props
- `VideosClientPage` no longer accepts URL params as props
- Uses `useSearchParams` hook internally
- State management is now client-side

### 3. API Calls
- Main page: Client-side fetch (useEffect)
- Detail pages: Server-side fetch (SSG)
- Revalidation: 3600 seconds (1 hour)

## Migration Steps

### Step 1: Update Internal Links
Replace old links:
```tsx
// OLD
<Link href="/videos?videoId=abc123">Watch Video</Link>
<Link href="/videos?playlistId=xyz789">View Playlist</Link>

// NEW
<Link href="/videos/abc123">Watch Video</Link>
<Link href="/videos/playlist/xyz789">View Playlist</Link>
```

### Step 2: Update Navigation
If you have navigation components linking to videos:
```tsx
// Update to new URL structure
<Link href="/videos">Videos</Link>
<Link href="/videos?content=playlists">Playlists</Link>
```

### Step 3: Test Build
```bash
npm run build
```

This will:
- Generate static pages for all videos
- Generate static pages for all playlists
- Verify all API endpoints work
- Check for TypeScript errors

### Step 4: Test Locally
```bash
npm run dev
```

Test these scenarios:
1. Visit `/videos` - Should show grid
2. Search for videos - Should filter client-side
3. Toggle to playlists - Should switch view
4. Click a video - Should go to `/videos/[videoId]`
5. Click a playlist - Should go to `/videos/playlist/[playlistId]`
6. Check SEO tags in page source

### Step 5: Deploy
After testing:
1. Commit changes
2. Deploy to production
3. Verify static pages are generated
4. Check SEO in production

## Rollback Plan

If issues occur, you can rollback by:
1. Restore old `src/app/(web)/videos/page.tsx`
2. Remove new route folders
3. Redeploy

Old files are preserved for this purpose.

## Benefits of New System

### SEO Improvements
- Individual pages for each video/playlist
- Proper meta tags and Open Graph
- Structured data (JSON-LD)
- Better social media sharing
- Search engine indexing

### Performance
- Static generation for detail pages
- Faster page loads
- Better caching
- Reduced server load

### User Experience
- Clean URLs
- Direct linking to videos
- Browser back/forward works correctly
- Shareable links

### Developer Experience
- TypeScript throughout
- Clear separation of concerns
- Easier to maintain
- Better code organization

## Support

If you encounter issues:
1. Check console for errors
2. Verify API endpoints are accessible
3. Check environment variables
4. Review build logs
5. Test in development mode first
