/**
 * Contact Page - Server Component
 * Contact information and form
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ContactPage from "@/layouts/ContactPage";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Əlaqə",
  description: "Nizamiyyə Mədrəsəsi ilə əlaqə məlumatları",
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phones[0],
      contactType: "Customer Service",
      availableLanguage: ["az", "tr"],
    },
  },
};

export const metadata: Metadata = {
  title: `Əlaqə | ${siteConfig.name}`,
  description: `${siteConfig.name} ilə əlaqə saxlayın. Telefon, email və sosial media vasitəsilə bizimlə əlaqə qura bilərsiniz.`,
  keywords: "əlaqə, telefon, email, ünvan, Nizamiyyə Mədrəsəsi əlaqə",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Əlaqə | ${siteConfig.name}`,
    description: `${siteConfig.name} ilə əlaqə saxlayın. Telefon, email və sosial media vasitəsilə bizimlə əlaqə qura bilərsiniz.`,
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Əlaqə | ${siteConfig.name}`,
    description: `${siteConfig.name} ilə əlaqə saxlayın. Telefon, email və sosial media vasitəsilə bizimlə əlaqə qura bilərsiniz.`,
  },
};

export default function Contact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPage />
    </>
  );
}
