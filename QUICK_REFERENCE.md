# 📚 Quick Reference Guide

## Common Patterns & Code Snippets

---

## 🎨 Component Patterns

### Basic Component Structure
```typescript
import { cn } from "@/lib/utils/cn";
import type { ComponentType } from "@/types";

interface ComponentProps {
  title: string;
  description?: string;
  className?: string;
}

export function Component({ title, description, className }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

### Client Component
```typescript
"use client";

import { useState } from "react";

export function ClientComponent() {
  const [state, setState] = useState("");
  
  return (
    <div>
      {/* Interactive content */}
    </div>
  );
}
```

### Server Component with Data Fetching
```typescript
import { apiConfig } from "@/config/api";
import type { Article } from "@/types";

async function getData(): Promise<Article[]> {
  const res = await fetch(
    `${apiConfig.baseUrl}${apiConfig.endpoints.articles.list}`,
    { next: { revalidate: apiConfig.revalidate.articles } }
  );
  
  if (!res.ok) return [];
  return res.json();
}

export async function ServerComponent() {
  const data = await getData();
  
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

---

## 🎯 Common Imports

### UI Components
```typescript
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
```

### Configuration
```typescript
import { apiConfig } from "@/config/api";
import { siteConfig } from "@/config/site";
```

### Utilities
```typescript
import { cn } from "@/lib/utils/cn";
import { formatDate, formatRelativeTime } from "@/lib/utils/date";
import { apiClient } from "@/lib/api-client";
```

### Types
```typescript
import type { Article, Question, Book, MenuItem } from "@/types";
```

---

## 🔧 Utility Functions

### Class Name Merging
```typescript
import { cn } from "@/lib/utils/cn";

// Merge classes with conditional logic
className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class",
  className // Allow override
)}
```

### Date Formatting
```typescript
import { formatDate, formatRelativeTime } from "@/lib/utils/date";

const formatted = formatDate("2024-01-15"); // "15/01/2024"
const relative = formatRelativeTime("2024-01-15"); // "2 gün əvvəl"
```

### API Calls
```typescript
import { apiClient } from "@/lib/api-client";
import { apiConfig } from "@/config/api";

// GET request
const response = await apiClient.get(apiConfig.endpoints.articles.list);
const data = await response.json();

// POST request
const response = await apiClient.post(
  apiConfig.endpoints.articles.list,
  { title: "New Article" }
);
```

---

## 📦 Layout Patterns

### Page with Sections
```typescript
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export default function Page() {
  return (
    <main>
      <Section id="hero" variant="gradient">
        <Container>
          <SectionHeader
            badge="Badge Text"
            title="Section Title"
            description="Section description"
          />
          {/* Content */}
        </Container>
      </Section>
      
      <Section id="content" variant="default">
        <Container>
          {/* Content */}
        </Container>
      </Section>
    </main>
  );
}
```

### Grid Layout
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map((item) => (
    <Card key={item.id} item={item} />
  ))}
</div>
```

### Responsive Container
```typescript
<Container className="max-w-4xl"> {/* Override max-width */}
  {/* Content */}
</Container>
```

---

## 🎨 Tailwind Patterns

### Button Styles
```typescript
// Primary Button
className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"

// Secondary Button
className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30"

// Outline Button
className="px-6 py-2 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
```

### Card Styles
```typescript
// Basic Card
className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6"

// Glass Card
className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"

// Elevated Card
className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8"
```

### Text Styles
```typescript
// Heading
className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight"

// Subheading
className="text-xl md:text-2xl text-stone-600 leading-relaxed"

// Body Text
className="text-base text-stone-600 leading-relaxed"

// Small Text
className="text-sm text-stone-500"
```

### Spacing
```typescript
// Section Spacing
className="py-20 md:py-28"

// Container Spacing
className="px-4 sm:px-6 lg:px-8"

// Element Spacing
className="space-y-6" // Vertical spacing
className="space-x-4" // Horizontal spacing
className="gap-6"     // Grid/Flex gap
```

---

## 🔄 State Management

### Local State
```typescript
"use client";

import { useState } from "react";

export function Component() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      Toggle
    </button>
  );
}
```

### Form State
```typescript
"use client";

import { useState } from "react";

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {/* More fields */}
    </form>
  );
}
```

---

## 🖼️ Image Optimization

### Basic Image
```typescript
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### Fill Container
```typescript
<div className="relative aspect-[16/9]">
  <Image
    src="/image.jpg"
    alt="Description"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
</div>
```

### Priority Image (Above Fold)
```typescript
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  priority
  className="object-cover"
/>
```

---

## 🔗 Link Patterns

### Internal Link
```typescript
import Link from "next/link";

<Link
  href="/articles"
  className="text-primary-600 hover:text-primary-700 transition-colors"
>
  View Articles
</Link>
```

### External Link
```typescript
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-primary-600 hover:text-primary-700"
>
  External Link
</a>
```

### Button Link
```typescript
<Link
  href="/articles"
  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
>
  View Articles
  <ArrowRight size={20} />
</Link>
```

---

## 📱 Responsive Design

### Breakpoints
```typescript
// Mobile First Approach
className="text-sm md:text-base lg:text-lg xl:text-xl"

// Grid Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"

// Hide/Show
className="hidden md:block"  // Hide on mobile, show on desktop
className="block md:hidden"  // Show on mobile, hide on desktop
```

### Container Queries
```typescript
// Responsive padding
className="px-4 sm:px-6 lg:px-8"

// Responsive margin
className="my-8 md:my-12 lg:my-16"

// Responsive flex direction
className="flex flex-col md:flex-row gap-4"
```

---

## ⚡ Performance Tips

### Code Splitting
```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Disable SSR if needed
});
```

### Memoization
```typescript
import { useMemo, useCallback } from "react";

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Lazy Loading Images
```typescript
<Image
  src="/image.jpg"
  alt="Description"
  loading="lazy"
  width={800}
  height={600}
/>
```

---

## 🎯 SEO Patterns

### Page Metadata
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | Site Name",
  description: "Page description",
  openGraph: {
    title: "Page Title",
    description: "Page description",
    images: ["/og-image.jpg"],
  },
};
```

### Dynamic Metadata
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.id);
  
  return {
    title: article.title,
    description: article.description,
  };
}
```

---

## 🐛 Error Handling

### Try-Catch Pattern
```typescript
async function getData() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
```

### Error Boundary
```typescript
// app/error.tsx
"use client";

import { ErrorMessage } from "@/components/ui/error-message";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorMessage
      message={error.message}
      onRetry={reset}
    />
  );
}
```

---

## 🔍 Search & Filter

### Search Input
```typescript
"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function SearchInput() {
  const [query, setQuery] = useState("");
  
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
      <input
        type="text"
        placeholder="Axtar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>
  );
}
```

---

## 📊 Loading States

### Skeleton Loader
```typescript
export function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-stone-200 rounded mb-2" />
      <div className="h-4 bg-stone-200 rounded mb-2 w-3/4" />
      <div className="h-4 bg-stone-200 rounded w-1/2" />
    </div>
  );
}
```

### Loading Page
```typescript
// app/loading.tsx
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>
  );
}
```

---

## 🎨 Animation Patterns

### Fade In
```typescript
className="animate-fadeInUp"
style={{ animationDelay: `${index * 0.1}s` }}
```

### Hover Effects
```typescript
className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
```

### Smooth Transitions
```typescript
className="transition-colors duration-200"
className="transition-transform duration-300"
className="transition-all duration-300"
```

---

This quick reference should help you quickly find common patterns and code snippets while working on the project!
