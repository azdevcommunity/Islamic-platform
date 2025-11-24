/**
 * Home Page - Server Component
 * Main landing page with ISR revalidation
 */

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import IslamicArticles from "@/components/home/IslamicArticles";
import IslamicWelcomeSection from "@/components/home/IslamicWelcomeSection";
import { getHomeArticles } from "@/lib/cache/home";

// Dynamic imports for heavy components (saves ~120KB)
const IslamicVideoSlider = dynamic(() => import("@/components/home/IslamicVideoSlider"), {
  loading: () => <div className="h-[600px] bg-stone-900 animate-pulse" />,
});

const SocialMediaStats = dynamic(() => import("@/components/home/SocialMediaStats"), {
  loading: () => <div className="h-64 bg-white animate-pulse" />,
});

const Feedbacks = dynamic(() => import("@/components/home/Feedbacks"), {
  loading: () => <div className="h-96 bg-stone-50 animate-pulse" />,
});

// No page-level revalidate - each section has its own cache strategy

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  alternateName: "Nizamiyyə Mədrəsəsi",
  url: siteConfig.url,
  logo: `${siteConfig.url}/esm_logo.png`,
  description: siteConfig.description,
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AZ",
    addressLocality: "Bakı",
  },
  sameAs: [
    process.env.NEXT_PUBLIC_YTB_CHANNEL_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_CHANNEL_URL,
    process.env.NEXT_PUBLIC_FACEBOOK_CHANNEL_URL,
    process.env.NEXT_PUBLIC_TIKTOK_CHANNEL_URL,
  ].filter(Boolean),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["az", "tr"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "az-AZ",
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema],
};

export const metadata: Metadata = {
  title: `Ana Səhifə | ${siteConfig.name}`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `Ana Səhifə | ${siteConfig.name}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Ana Səhifə | ${siteConfig.name}`,
    description: siteConfig.description,
  },
};

export default async function HomePage() {
  // Parallel fetch with scope-based caching
  const [articles] = await Promise.all([
    getHomeArticles().catch(() => []),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-hidden bg-stone-50">
        {/* Hero Section - Video Slider */}
        <section id="hero" className="relative bg-stone-900">
          <IslamicVideoSlider />
        </section>

        {/* Welcome Section - Minimal və zərif */}
        <section id="welcome" className="py-20 md:py-28 bg-gradient-to-br from-white via-stone-50 to-white relative">
          {/* İncə İslami naxış */}
          <div className="absolute inset-0 bg-islamic-pattern opacity-30"></div>
          <div className="relative">
            <IslamicWelcomeSection />
          </div>
        </section>

        {/* Articles Section - Təmiz və minimal */}
        <section id="articles" className="py-20 md:py-28 bg-white relative">
          <Suspense fallback={<div className="h-96 animate-pulse bg-gray-50" />}>
            <IslamicArticles articles={articles} />
          </Suspense>
        </section>

        {/* Books Section - Soft background */}
        {/* <section id="books" className="py-20 md:py-28 bg-gradient-to-br from-stone-50 to-white relative"> */}
          {/* <IslamicBooks /> */}
        {/* </section> */}

        {/* Social Media Stats - Koyu fon */}
        <section id="social-stats" className="py-20 md:py-28 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 relative overflow-hidden">
          {/* İslami geometrik naxış */}
          <div className="absolute inset-0 bg-islamic-pattern opacity-5"></div>
          <SocialMediaStats />
        </section>

        {/* Testimonials Section - Paralaks effekt */}
        <section
          id="feedbacks"
          className="py-20 md:py-24 relative"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(28, 25, 23, 0.85), rgba(41, 37, 36, 0.75)), url(/feedbackbg.webp)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
          }}
        >
           <Feedbacks />
        </section>
      </main>
    </>
  );
}
