/**
 * About Page - Server Component
 * Information about Nizamiyyə Mədrəsəsi
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import IslamicAboutPage from "@/components/about/IslamicAboutPage";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/esm_logo.png`,
  description: "İslami təhsil və mənəvi tərbiyə sahəsində xidmət göstərən təhsil müəssisəsi",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phones[0],
    contactType: "Customer Service",
    availableLanguage: ["az", "tr"],
  },
  sameAs: [
    siteConfig.links.facebook,
    siteConfig.links.instagram,
    siteConfig.links.youtube,
  ].filter(Boolean),
};

export const metadata: Metadata = {
  title: `Haqqımızda | ${siteConfig.name}`,
  description: "Nizamiyyə Mədrəsəsi haqqında məlumat. İslami təhsil və mənəvi tərbiyə sahəsində xidmət göstəririk.",
  keywords: "Nizamiyyə Mədrəsəsi, İslami təhsil, Əhli-Sünnə, dini təhsil, İslam mədrəsəsi",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `Haqqımızda | ${siteConfig.name}`,
    description: "Nizamiyyə Mədrəsəsi haqqında məlumat. İslami təhsil və mənəvi tərbiyə sahəsində xidmət göstəririk.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Haqqımızda | ${siteConfig.name}`,
    description: "Nizamiyyə Mədrəsəsi haqqında məlumat. İslami təhsil və mənəvi tərbiyə sahəsində xidmət göstəririk.",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IslamicAboutPage />
    </>
  );
}
