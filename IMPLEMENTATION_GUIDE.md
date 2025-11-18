# 🚀 Implementation Guide

## Step-by-Step Migration Plan

This guide will help you gradually migrate your existing codebase to the new refactored structure without breaking your application.

---

## Phase 1: Setup & Configuration (Day 1)

### 1.1 Install TypeScript Dependencies
```bash
npm install --save-dev typescript @types/react @types/node
```

### 1.2 Verify New Files
Ensure these new files are in place:
- ✅ `tsconfig.json`
- ✅ `src/config/api.ts`
- ✅ `src/config/site.ts`
- ✅ `src/types/index.ts`
- ✅ `src/lib/api-client.ts`
- ✅ `src/lib/utils/cn.ts`
- ✅ `src/lib/utils/date.ts`

### 1.3 Update Environment Variables
Ensure your `.env.local` has:
```env
NEXT_PUBLIC_BASE_URL=your_api_url
NEXT_PUBLIC_BASE_URL_YTB=your_youtube_api_url
NEXT_PUBLIC_FACEBOOK_CHANNEL_URL=...
NEXT_PUBLIC_INSTAGRAM_CHANNEL_URL=...
NEXT_PUBLIC_YTB_CHANNEL_URL=...
NEXT_PUBLIC_WP_CHANNEL_URL=...
NEXT_PUBLIC_DOMAIN=https://www.nizamiyyemedresesi.az
```

---

## Phase 2: Gradual Component Migration (Days 2-5)

### 2.1 Start with UI Components
These are already created and ready to use:
- `src/components/ui/container.tsx`
- `src/components/ui/section.tsx`
- `src/components/ui/section-header.tsx`
- `src/components/ui/loading-spinner.tsx`
- `src/components/ui/error-message.tsx`

### 2.2 Update Existing Components One by One

#### Example: Migrate an Article Component

**Before** (`src/components/articles/IslamicArticleCard.jsx`):
```javascript
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/util/DateUtil';

export default function IslamicArticleCard({ article }) {
  // ... component code
}
```

**After** (`src/components/articles/article-card.tsx`):
```typescript
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  // ... component code with types
}
```

### 2.3 Migration Checklist for Each Component

- [ ] Rename `.jsx` to `.tsx`
- [ ] Add type definitions
- [ ] Update imports to use new paths
- [ ] Use `cn()` utility for className merging
- [ ] Use centralized config instead of hardcoded values
- [ ] Export as named export instead of default

---

## Phase 3: Update Pages (Days 6-8)

### 3.1 Home Page Migration

**Current**: `src/layouts/IslamicHomePage.jsx`
**New**: `src/app/(web)/page.tsx`

The new home page is already created. To use it:

1. **Backup your current page**:
   ```bash
   mv src/app/(web)/page.js src/app/(web)/page.js.backup
   ```

2. **The new page is ready** at `src/app/(web)/page.tsx`

3. **Test the new page**:
   ```bash
   npm run dev
   ```

4. **If everything works**, remove the backup:
   ```bash
   rm src/app/(web)/page.js.backup
   rm -rf src/layouts/
   ```

### 3.2 Layout Migration

**Current**: `src/app/(web)/layout.js`
**New**: `src/app/(web)/layout.tsx`

The new layout is already created. Follow the same process as the home page.

---

## Phase 4: API Integration (Days 9-10)

### 4.1 Replace HttpClient Usage

**Before**:
```javascript
import HttpClient from '@/util/HttpClient';

const response = await HttpClient.get('/articles');
const data = await response.json();
```

**After**:
```typescript
import { apiClient } from '@/lib/api-client';
import { apiConfig } from '@/config/api';

const response = await apiClient.get(apiConfig.endpoints.articles.list);
const data = await response.json();
```

### 4.2 Update All API Calls

Search for all instances of:
- `HttpClient.get`
- `HttpClient.post`
- `HttpClient.put`
- `HttpClient.delete`

Replace with `apiClient` methods.

---

## Phase 5: Cleanup (Days 11-12)

### 5.1 Remove Legacy Files

Once everything is migrated and tested:

```bash
# Remove old utility files
rm src/util/Const.js
rm src/util/DateUtil.js
rm src/util/HttpClient.js

# Remove old layouts
rm -rf src/layouts/

# Remove old component versions (after verifying new ones work)
rm src/components/Navbar/IslamicNavbar.jsx
rm src/components/common/IslamicFooter.jsx
rm src/components/home/IslamicArticles.jsx
rm src/components/home/IslamicBooks.jsx
```

### 5.2 Update Imports Across Codebase

Use find and replace to update imports:

**Find**: `@/util/Const`
**Replace**: `@/config/site` or `@/config/api`

**Find**: `@/util/DateUtil`
**Replace**: `@/lib/utils/date`

**Find**: `@/util/HttpClient`
**Replace**: `@/lib/api-client`

---

## Phase 6: Testing & Optimization (Days 13-14)

### 6.1 Run Build
```bash
npm run build
```

Fix any TypeScript errors that appear.

### 6.2 Test All Pages
- [ ] Home page
- [ ] Articles page
- [ ] Questions page
- [ ] Books page
- [ ] About page
- [ ] Contact page
- [ ] Video page

### 6.3 Check Performance
```bash
npm run build
npm run start
```

Use Lighthouse to check:
- Performance score
- Accessibility score
- Best practices score
- SEO score

---

## Common Issues & Solutions

### Issue 1: TypeScript Errors

**Problem**: `Property 'X' does not exist on type 'Y'`

**Solution**: Add proper type definitions in `src/types/index.ts`

```typescript
export interface Article {
  id: string | number;
  title: string;
  // Add missing properties
  newProperty?: string; // Use ? for optional properties
}
```

### Issue 2: Import Errors

**Problem**: `Cannot find module '@/config/api'`

**Solution**: Ensure `tsconfig.json` has correct paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue 3: Client Component Errors

**Problem**: `You're importing a component that needs useState. It only works in a Client Component`

**Solution**: Add `"use client"` at the top of the file:
```typescript
"use client";

import { useState } from "react";
// ... rest of component
```

### Issue 4: Image Optimization Errors

**Problem**: `Invalid src prop`

**Solution**: Add domain to `next.config.mjs`:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-domain.com',
    },
  ],
}
```

---

## Verification Checklist

### Before Going Live

- [ ] All pages load without errors
- [ ] All images display correctly
- [ ] All links work
- [ ] Forms submit successfully
- [ ] API calls work
- [ ] Mobile responsive
- [ ] Dark mode works (if applicable)
- [ ] SEO metadata is correct
- [ ] Performance is good (Lighthouse score > 90)
- [ ] No console errors
- [ ] TypeScript builds without errors

### Performance Checks

```bash
# Build the application
npm run build

# Check bundle size
npm run build -- --analyze

# Run production server
npm run start
```

### SEO Checks

- [ ] Meta tags are present
- [ ] Open Graph tags work
- [ ] Sitemap is accessible
- [ ] Robots.txt is correct
- [ ] Structured data is valid

---

## Rollback Plan

If something goes wrong, you can rollback:

### Quick Rollback
```bash
# Restore backup files
mv src/app/(web)/page.js.backup src/app/(web)/page.js
mv src/app/(web)/layout.js.backup src/app/(web)/layout.js

# Restart dev server
npm run dev
```

### Full Rollback
```bash
# Use git to revert changes
git checkout HEAD -- src/

# Or restore from backup
# (Make sure you have a backup before starting!)
```

---

## Best Practices Going Forward

### 1. Always Use TypeScript for New Files
```typescript
// ✅ Good
export function MyComponent({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

// ❌ Avoid
export default function MyComponent({ title }) {
  return <h1>{title}</h1>;
}
```

### 2. Use Centralized Configuration
```typescript
// ✅ Good
import { apiConfig } from '@/config/api';
const url = apiConfig.baseUrl;

// ❌ Avoid
const url = process.env.NEXT_PUBLIC_BASE_URL;
```

### 3. Use Reusable Components
```typescript
// ✅ Good
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/ui/section-header';

// ❌ Avoid
<div className="container mx-auto px-4 max-w-7xl">
  <div className="text-center mb-16">
    <h2>Title</h2>
  </div>
</div>
```

### 4. Proper Error Handling
```typescript
// ✅ Good
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error('Error fetching data:', error);
  return [];
}

// ❌ Avoid
const data = await fetchData();
return data;
```

### 5. Use Semantic HTML
```typescript
// ✅ Good
<article>
  <header>
    <h1>{title}</h1>
  </header>
  <section>
    {content}
  </section>
</article>

// ❌ Avoid
<div>
  <div>
    <div>{title}</div>
  </div>
  <div>
    {content}
  </div>
</div>
```

---

## Support & Resources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

### Tools
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com/)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)

---

## Timeline Summary

| Phase | Duration | Tasks |
|-------|----------|-------|
| Phase 1: Setup | 1 day | Install dependencies, verify files |
| Phase 2: Components | 4 days | Migrate components to TypeScript |
| Phase 3: Pages | 3 days | Update pages and layouts |
| Phase 4: API | 2 days | Replace API client |
| Phase 5: Cleanup | 2 days | Remove legacy code |
| Phase 6: Testing | 2 days | Test and optimize |
| **Total** | **14 days** | **Complete migration** |

---

## Success Metrics

After migration, you should see:

- ✅ **Better DX**: TypeScript autocomplete and error checking
- ✅ **Faster Development**: Reusable components save time
- ✅ **Better Performance**: Optimized images and caching
- ✅ **Easier Maintenance**: Clear structure and patterns
- ✅ **Fewer Bugs**: Type safety catches errors early
- ✅ **Better SEO**: Proper metadata and structure
- ✅ **Scalability**: Easy to add new features

---

Good luck with your migration! 🚀
