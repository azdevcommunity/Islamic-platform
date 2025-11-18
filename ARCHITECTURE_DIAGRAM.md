# 🏗️ Architecture Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Next.js Application                      │
│                     (Nizamiyyə Mədrəsəsi)                       │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        App Router (src/app)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐         ┌──────────────┐                     │
│  │   (web)      │         │  (dashboard) │                     │
│  │  Public      │         │    Admin     │                     │
│  │  Pages       │         │    Pages     │                     │
│  └──────────────┘         └──────────────┘                     │
│         │                         │                             │
│         ├─ layout.tsx ✨          ├─ layout.js                 │
│         ├─ page.tsx ✨            └─ admin/                    │
│         ├─ about/                                               │
│         ├─ articles/                                            │
│         ├─ questions/                                           │
│         └─ ...                                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Components (src/components)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  UI Components (ui/) ✨ NEW                              │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │  │
│  │  │ Container  │  │  Section   │  │   Button   │        │  │
│  │  └────────────┘  └────────────┘  └────────────┘        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │  │
│  │  │   Header   │  │  Spinner   │  │   Error    │        │  │
│  │  └────────────┘  └────────────┘  └────────────┘        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Feature Components                                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │  │
│  │  │  Navbar ✨ │  │  Footer ✨ │  │  Articles  │        │  │
│  │  └────────────┘  └────────────┘  └────────────┘        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │  │
│  │  │ Questions  │  │   Books    │  │   Videos   │        │  │
│  │  └────────────┘  └────────────┘  └────────────┘        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Configuration & Types                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐            │
│  │  config/ ✨ NEW  │         │  types/ ✨ NEW   │            │
│  │  ┌────────────┐  │         │  ┌────────────┐  │            │
│  │  │  api.ts    │  │         │  │  index.ts  │  │            │
│  │  │  site.ts   │  │         │  │  Article   │  │            │
│  │  └────────────┘  │         │  │  Question  │  │            │
│  │                   │         │  │  Book      │  │            │
│  │  • API endpoints  │         │  │  MenuItem  │  │            │
│  │  • Revalidation   │         │  └────────────┘  │            │
│  │  • Site info      │         │                   │            │
│  │  • Contact info   │         │  Type-safe       │            │
│  │  • Social links   │         │  definitions     │            │
│  └──────────────────┘         └──────────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Utilities (src/lib) ✨ NEW                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐            │
│  │  api-client.ts   │         │  utils/          │            │
│  │                   │         │  ┌────────────┐  │            │
│  │  • get()         │         │  │  cn.ts     │  │            │
│  │  • post()        │         │  │  date.ts   │  │            │
│  │  • put()         │         │  └────────────┘  │            │
│  │  • delete()      │         │                   │            │
│  │                   │         │  Helper          │            │
│  │  Error handling  │         │  functions       │            │
│  │  Type-safe       │         │                   │            │
│  └──────────────────┘         └──────────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                         External APIs                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐         ┌──────────────────┐            │
│  │  Backend API     │         │  YouTube API     │            │
│  │  (Articles,      │         │  (Videos)        │            │
│  │   Questions,     │         │                   │            │
│  │   Categories)    │         │                   │            │
│  └──────────────────┘         └──────────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. Request Page
       ▼
┌─────────────────────────────────────┐
│      Next.js Server (SSR/ISR)       │
├─────────────────────────────────────┤
│                                      │
│  2. Execute Server Component        │
│     ┌─────────────────────┐        │
│     │  ArticlesSection    │        │
│     │  (Server Component) │        │
│     └──────────┬──────────┘        │
│                │                     │
│                │ 3. Fetch Data       │
│                ▼                     │
│     ┌─────────────────────┐        │
│     │   apiClient.get()   │        │
│     │   + apiConfig       │        │
│     └──────────┬──────────┘        │
│                │                     │
└────────────────┼─────────────────────┘
                 │
                 │ 4. HTTP Request
                 ▼
┌─────────────────────────────────────┐
│          Backend API                 │
│  (Articles, Questions, etc.)        │
└──────────┬──────────────────────────┘
           │
           │ 5. JSON Response
           ▼
┌─────────────────────────────────────┐
│      Next.js Server (SSR/ISR)       │
├─────────────────────────────────────┤
│                                      │
│  6. Transform Data                  │
│     ┌─────────────────────┐        │
│     │  Type Checking      │        │
│     │  (TypeScript)       │        │
│     └──────────┬──────────┘        │
│                │                     │
│  7. Render Components               │
│     ┌─────────────────────┐        │
│     │  ArticleCard        │        │
│     │  (Reusable UI)      │        │
│     └──────────┬──────────┘        │
│                │                     │
│  8. Generate HTML                   │
│                │                     │
└────────────────┼─────────────────────┘
                 │
                 │ 9. Send HTML
                 ▼
┌─────────────────────────────────────┐
│           Browser                    │
│  (Hydrated React App)               │
└─────────────────────────────────────┘
```

---

## Component Hierarchy

```
App
│
├── RootLayout (app/layout.js)
│   ├── Global Styles
│   ├── Fonts
│   ├── Metadata
│   └── Analytics
│
└── WebLayout (app/(web)/layout.tsx) ✨
    │
    ├── IslamicNavbar ✨
    │   ├── BrandLogo
    │   └── NavbarClient
    │       ├── DesktopNav
    │       │   └── NavItem (with dropdowns)
    │       └── MobileNav
    │           └── MobileNavItem
    │
    ├── Page Content
    │   │
    │   └── HomePage (app/(web)/page.tsx) ✨
    │       │
    │       ├── Section (Hero)
    │       │   └── VideoHeroSection
    │       │
    │       ├── Section (Welcome)
    │       │   ├── Container
    │       │   └── WelcomeSection
    │       │
    │       ├── Section (Articles) ✨
    │       │   ├── Container
    │       │   ├── SectionHeader ✨
    │       │   └── ArticlesSection ✨
    │       │       └── ArticleCard[] ✨
    │       │
    │       ├── Section (Books) ✨
    │       │   ├── Container
    │       │   ├── SectionHeader ✨
    │       │   └── BooksSection ✨
    │       │       └── BookCard[]
    │       │
    │       ├── Section (Social Stats)
    │       │   └── SocialStatsSection
    │       │
    │       └── Section (Testimonials)
    │           └── TestimonialsSection
    │
    └── IslamicFooter ✨
        ├── Logo & About
        ├── Pages Links
        ├── Contact Info
        ├── Support Section
        └── Copyright
```

---

## File Organization Pattern

```
Feature-Based Organization:

src/components/
│
├── ui/                    # ✨ Generic, reusable UI components
│   ├── button.tsx
│   ├── container.tsx
│   ├── section.tsx
│   └── ...
│
├── Navbar/                # ✨ Navbar feature
│   ├── islamic-navbar.tsx
│   └── NavbarClient.tsx
│
├── Footer/                # ✨ Footer feature
│   └── islamic-footer.tsx
│
├── articles/              # ✨ Articles feature
│   ├── article-card.tsx
│   ├── article-list.tsx
│   └── ...
│
└── home/                  # ✨ Home page sections
    ├── articles-section.tsx
    ├── books-section.tsx
    └── ...
```

---

## Configuration Flow

```
Environment Variables (.env.local)
           │
           ▼
┌─────────────────────────┐
│  config/api.ts ✨       │
│  • baseUrl              │
│  • endpoints            │
│  • revalidate times     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  lib/api-client.ts ✨   │
│  • HTTP methods         │
│  • Error handling       │
│  • Type safety          │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Components             │
│  • Server components    │
│  • Data fetching        │
│  • Type-safe responses  │
└─────────────────────────┘
```

---

## Type Safety Flow

```
Backend API Response
         │
         ▼
┌─────────────────────────┐
│  types/index.ts ✨      │
│  • Article              │
│  • Question             │
│  • Book                 │
│  • MenuItem             │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Components             │
│  • Props typed          │
│  • State typed          │
│  • Functions typed      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  TypeScript Compiler    │
│  • Compile-time checks  │
│  • IDE autocomplete     │
│  • Error prevention     │
└─────────────────────────┘
```

---

## Rendering Strategy

```
┌─────────────────────────────────────────────────────────┐
│                    Page Request                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Server Components (Default)                 │
│  • ArticlesSection                                       │
│  • Data fetching on server                              │
│  • No JavaScript sent to client                         │
│  • ISR with revalidation                                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            Client Components ("use client")              │
│  • BooksSection (Swiper carousel)                       │
│  • NavbarClient (interactive menu)                      │
│  • Interactive features only                            │
│  • Minimal JavaScript                                   │
└─────────────────────────────────────────────────────────┘
```

---

## Performance Optimization

```
┌─────────────────────────────────────────────────────────┐
│                  Image Optimization                      │
│  • Next.js Image component                              │
│  • Automatic WebP conversion                            │
│  • Lazy loading                                         │
│  • Responsive sizes                                     │
│  • Priority for above-the-fold                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Data Caching (ISR)                      │
│  • Revalidate every 60 seconds                          │
│  • Serve stale while revalidating                       │
│  • Reduce API calls                                     │
│  • Faster page loads                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Code Splitting                          │
│  • Automatic route-based splitting                      │
│  • Dynamic imports for heavy components                 │
│  • Smaller initial bundle                               │
│  • Faster Time to Interactive                           │
└─────────────────────────────────────────────────────────┘
```

---

## Development Workflow

```
1. Developer writes code
         │
         ▼
2. TypeScript checks types
         │
         ▼
3. ESLint checks code quality
         │
         ▼
4. Next.js compiles
         │
         ▼
5. Hot Module Replacement (HMR)
         │
         ▼
6. Browser updates instantly
```

---

## Deployment Flow

```
1. Code pushed to Git
         │
         ▼
2. CI/CD pipeline triggered
         │
         ▼
3. npm run build
   • TypeScript compilation
   • Next.js optimization
   • Image optimization
   • Bundle analysis
         │
         ▼
4. Tests run (when added)
         │
         ▼
5. Deploy to Vercel/Server
         │
         ▼
6. CDN distribution
         │
         ▼
7. Live website
```

---

This architecture provides a solid foundation for a scalable, maintainable, and performant Next.js application!
