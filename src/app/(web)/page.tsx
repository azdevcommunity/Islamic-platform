/**
 * Home Page - Server Component
 * Main landing page with ISR revalidation
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import IslamicHomePage from "@/layouts/IslamicHomePage";

export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "az-AZ",
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/esm_logo.png`,
    },
  },
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IslamicHomePage />
    </>
  );
}
