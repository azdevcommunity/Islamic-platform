# 📁 Updated Folder Structure

## Complete Project Structure

```
nizamiyye-medresesi/
│
├── public/                           # Static assets
│   ├── esm_logo.png
│   ├── about_us.png
│   ├── feedbackbg.webp
│   ├── og-image.jpg
│   └── favicon.ico
│
├── src/
│   │
│   ├── app/                          # Next.js App Router
│   │   ├── (dashboard)/              # Admin dashboard group
│   │   │   ├── admin/
│   │   │   └── layout.js
│   │   │
│   │   ├── (web)/                    # Public pages group
│   │   │   ├── about/
│   │   │   │   └── page.js
│   │   │   ├── articles/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.js
│   │   │   │   └── page.js
│   │   │   ├── books/
│   │   │   │   └── page.js
│   │   │   ├── contact/
│   │   │   │   └── page.js
│   │   │   ├── questions/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.js
│   │   │   │   └── page.js
│   │   │   ├── search/
│   │   │   │   └── page.js
│   │   │   ├── videos/
│   │   │   │   └── page.js
│   │   │   ├── layout.tsx            # ✨ REFACTORED
│   │   │   ├── page.tsx              # ✨ REFACTORED
│   │   │   └── error.jsx
│   │   │
│   │   ├── api/                      # API routes
│   │   │   ├── revalidate/
│   │   │   ├── revalidate-all/
│   │   │   ├── robots/
│   │   │   └── sitemap/
│   │   │
│   │   ├── layout.js                 # Root layout
│   │   ├── globals.css               # Global styles
│   │   ├── error.jsx
│   │   ├── not-found.jsx
│   │   ├── robots.js
│   │   └── sitemap.js
│   │
│   ├── components/                   # React components
│   │   │
│   │   ├── ui/                       # ✨ NEW: Reusable UI components
│   │   │   ├── accordion.jsx
│   │   │   ├── alert.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── container.tsx         # ✨ NEW
│   │   │   ├── dialog.jsx
│   │   │   ├── error-message.tsx     # ✨ NEW
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   ├── loading-spinner.tsx   # ✨ NEW
│   │   │   ├── section.tsx           # ✨ NEW
│   │   │   ├── section-header.tsx    # ✨ NEW
│   │   │   ├── select.jsx
│   │   │   ├── separator.jsx
│   │   │   ├── table.jsx
│   │   │   ├── tabs.jsx
│   │   │   ├── textarea.jsx
│   │   │   ├── toast.jsx
│   │   │   └── ...
│   │   │
│   │   ├── navbar/                   # Navigation components
│   │   │   ├── islamic-navbar.tsx    # ✨ REFACTORED
│   │   │   ├── navbar-client.tsx     # ✨ REFACTORED
│   │   │   ├── theme-switcher.tsx
│   │   │   └── use-menus.jsx
│   │   │
│   │   ├── footer/                   # Footer components
│   │   │   └── islamic-footer.tsx    # ✨ REFACTORED
│   │   │
│   │   ├── home/                     # Home page sections
│   │   │   ├── articles-section.tsx  # ✨ NEW
│   │   │   ├── books-section.tsx     # ✨ NEW
│   │   │   ├── video-hero-section.tsx
│   │   │   ├── welcome-section.tsx
│   │   │   ├── social-stats-section.tsx
│   │   │   ├── testimonials-section.tsx
│   │   │   └── ...
│   │   │
│   │   ├── articles/                 # Article components
│   │   │   ├── article-card.tsx      # ✨ REFACTORED
│   │   │   ├── article-categories.jsx
│   │   │   ├── popular-articles.jsx
│   │   │   └── ...
│   │   │
│   │   ├── questions/                # Question components
│   │   │   ├── question-card.tsx
│   │   │   ├── questions-page.jsx
│   │   │   └── ...
│   │   │
│   │   ├── about/                    # About page components
│   │   │   └── about-page.jsx
│   │   │
│   │   ├── common/                   # Shared components
│   │   │   ├── Filter/
│   │   │   ├── category-sidebar.jsx
│   │   │   ├── pagination.jsx
│   │   │   ├── support-button.jsx
│   │   │   ├── support-modal.jsx
│   │   │   └── ...
│   │   │
│   │   ├── admin/                    # Admin components
│   │   │   ├── admin-navbar.jsx
│   │   │   ├── sidebar.jsx
│   │   │   └── ...
│   │   │
│   │   ├── videos/                   # Video components
│   │   ├── books/                    # Book components
│   │   ├── contact/                  # Contact components
│   │   ├── search/                   # Search components
│   │   ├── editor/                   # Editor components
│   │   ├── providers/                # Context providers
│   │   └── skeletons/                # Loading skeletons
│   │
│   ├── lib/                          # ✨ NEW: Utility libraries
│   │   ├── api-client.ts             # ✨ NEW: Centralized API client
│   │   ├── utils/
│   │   │   ├── cn.ts                 # ✨ NEW: Class name utility
│   │   │   └── date.ts               # ✨ NEW: Date formatting
│   │   └── utils.js                  # Existing utilities
│   │
│   ├── config/                       # ✨ NEW: Configuration files
│   │   ├── api.ts                    # ✨ NEW: API configuration
│   │   └── site.ts                   # ✨ NEW: Site configuration
│   │
│   ├── types/                        # ✨ NEW: TypeScript types
│   │   └── index.ts                  # ✨ NEW: Type definitions
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-toast.js
│   │   ├── use-auth-redirect.js
│   │   ├── use-auth-token.js
│   │   ├── use-debounce.js
│   │   ├── use-filter-data.js
│   │   └── use-theme.js
│   │
│   ├── store/                        # State management (Zustand)
│   │   └── ...
│   │
│   ├── styles/                       # Additional styles
│   │   └── ...
│   │
│   ├── util/                         # Legacy utilities (to be migrated)
│   │   ├── Const.js                  # ⚠️ TO MIGRATE to config/
│   │   ├── DateUtil.js               # ⚠️ TO MIGRATE to lib/utils/date.ts
│   │   └── HttpClient.js             # ⚠️ TO MIGRATE to lib/api-client.ts
│   │
│   ├── layouts/                      # Legacy layouts (to be migrated)
│   │   └── IslamicHomePage.jsx       # ⚠️ TO MIGRATE to app/(web)/page.tsx
│   │
│   └── middleware.js                 # Next.js middleware
│
├── .next/                            # Next.js build output
├── node_modules/                     # Dependencies
│
├── .env.local                        # Environment variables
├── .gitignore
├── next.config.mjs                   # Next.js configuration
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json                     # ✨ NEW: TypeScript config
├── jsconfig.json
│
├── REFACTORING_SUMMARY.md            # ✨ NEW: Refactoring documentation
└── FOLDER_STRUCTURE.md               # ✨ NEW: This file
```

---

## 📂 Folder Descriptions

### `/src/app`
Next.js App Router directory. Contains all routes and layouts.

- **(dashboard)**: Route group for admin pages
- **(web)**: Route group for public pages
- **api**: API route handlers

### `/src/components`
All React components organized by feature/domain.

- **ui**: Reusable, generic UI components (buttons, inputs, etc.)
- **navbar**: Navigation-related components
- **footer**: Footer components
- **home**: Home page specific sections
- **articles**: Article-related components
- **questions**: Question-related components
- **common**: Shared components used across features

### `/src/lib` ✨ NEW
Utility functions and shared business logic.

- **api-client.ts**: Centralized API client with error handling
- **utils/**: Helper functions (date formatting, class names, etc.)

### `/src/config` ✨ NEW
Configuration files for the application.

- **api.ts**: API endpoints and settings
- **site.ts**: Site-wide configuration (name, links, contact info)

### `/src/types` ✨ NEW
TypeScript type definitions.

- **index.ts**: All type definitions (Article, Question, Book, etc.)

### `/src/hooks`
Custom React hooks for reusable logic.

### `/src/store`
State management (Zustand stores).

### `/src/util` ⚠️ TO BE MIGRATED
Legacy utility files. Should be migrated to `/lib` or `/config`.

### `/src/layouts` ⚠️ TO BE MIGRATED
Legacy layout files. Should be migrated to `/app`.

---

## 🎯 Migration Status

### ✅ Completed
- [x] Created `/config` directory with API and site configuration
- [x] Created `/lib` directory with utilities
- [x] Created `/types` directory with TypeScript definitions
- [x] Created `/components/ui` with reusable components
- [x] Refactored home page to use new structure
- [x] Refactored navbar and footer
- [x] Created centralized API client
- [x] Added TypeScript support

### 🔄 In Progress
- [ ] Migrate remaining components to TypeScript
- [ ] Move utilities from `/util` to `/lib`
- [ ] Remove legacy `/layouts` directory
- [ ] Add comprehensive error boundaries
- [ ] Add loading states for all pages

### 📋 Planned
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Add Storybook for component documentation
- [ ] Implement performance monitoring
- [ ] Add accessibility improvements

---

## 📝 File Naming Conventions

### Components
- **TypeScript**: `component-name.tsx`
- **JavaScript**: `component-name.jsx`
- **PascalCase** for component names: `ArticleCard`, `SectionHeader`

### Utilities
- **TypeScript**: `utility-name.ts`
- **camelCase** for function names: `formatDate`, `apiClient`

### Configuration
- **TypeScript**: `config-name.ts`
- **camelCase** for exports: `apiConfig`, `siteConfig`

### Types
- **TypeScript**: `types-name.ts`
- **PascalCase** for type names: `Article`, `Question`, `MenuItem`

---

## 🚀 Quick Navigation

### Most Important Files

#### Configuration
- `src/config/api.ts` - API endpoints and settings
- `src/config/site.ts` - Site configuration
- `next.config.mjs` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration

#### Core Components
- `src/app/(web)/layout.tsx` - Main layout
- `src/app/(web)/page.tsx` - Home page
- `src/components/navbar/islamic-navbar.tsx` - Navigation
- `src/components/footer/islamic-footer.tsx` - Footer

#### Utilities
- `src/lib/api-client.ts` - API client
- `src/lib/utils/cn.ts` - Class name utility
- `src/lib/utils/date.ts` - Date formatting

#### Types
- `src/types/index.ts` - All type definitions

---

## 💡 Best Practices

### When Adding New Features

1. **Create types first** in `/src/types/index.ts`
2. **Add configuration** in `/src/config/` if needed
3. **Create reusable UI components** in `/src/components/ui/`
4. **Create feature components** in appropriate feature folder
5. **Use centralized utilities** from `/src/lib/`
6. **Follow TypeScript** for new files

### Component Organization

```typescript
// 1. Imports
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { Article } from "@/types";

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  description?: string;
}

// 3. Component
export function Component({ title, description }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

---

This structure provides a solid foundation for scaling your application while maintaining code quality and developer experience.
