/**
 * Questions Listing Page - Server Component
 * Displays list of Q&A with filtering
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import IslamicQuestionsPage from "@/components/questions/IslamicQuestionsPage";

export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "Sual və Cavablar",
  description: "Dini məsələlər haqqında suallar və cavablar",
  url: `${siteConfig.url}/questions`,
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
  title: `Sual və Cavablar | ${siteConfig.name}`,
  description:
    "Dini məsələlər haqqında suallarınızın cavablarını tapın. İslam dini, namaz, oruc, zəkat və digər mövzular üzrə ətraflı məlumatlar.",
  keywords:
    "sual cavab, dini məsələlər, islam, namaz, oruc, zəkat, dini suallar, fiqh, əqidə, hədis",
  alternates: {
    canonical: `${siteConfig.url}/questions`,
  },
  openGraph: {
    title: `Sual və Cavablar | ${siteConfig.name}`,
    description:
      "Dini məsələlər haqqında suallarınızın cavablarını tapın. İslam dini, namaz, oruc, zəkat və digər mövzular üzrə ətraflı məlumatlar.",
    url: `${siteConfig.url}/questions`,
    siteName: siteConfig.name,
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Sual və Cavablar | ${siteConfig.name}`,
    description:
      "Dini məsələlər haqqında suallarınızın cavablarını tapın. İslam dini, namaz, oruc, zəkat və digər mövzular üzrə ətraflı məlumatlar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QuestionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IslamicQuestionsPage />
    </>
  );
}
