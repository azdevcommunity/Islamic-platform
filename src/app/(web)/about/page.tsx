/**
 * About Page - Server Component
 * Information about Nizamiyyə Mədrəsəsi
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import IslamicAboutPage from "@/components/about/IslamicAboutPage";

export const metadata: Metadata = {
  title: `Haqqımızda | ${siteConfig.name}`,
  description:
    "Nizamiyyə Mədrəsəsi - İslam dininin hikmətini və mənəvi dəyərlərini geniş auditoriyaya çatdırmaq üçün fəaliyyət göstəririk.",
  keywords:
    "Nizamiyyə Mədrəsəsi, haqqımızda, İslam təhsili, dini təhsil, Əhli Sünnə, məqsədimiz, vizyonumuz",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `Haqqımızda | ${siteConfig.name}`,
    description:
      "Nizamiyyə Mədrəsəsi - İslam dininin hikmətini və mənəvi dəyərlərini geniş auditoriyaya çatdırmaq üçün fəaliyyət göstəririk.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    locale: "az_AZ",
    type: "website",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Haqqımızda",
    description:
      "Nizamiyyə Mədrəsəsi haqqında məlumat - məqsədimiz, dəyərlərimiz və vizyonumuz.",
    url: `${siteConfig.url}/about`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/esm_logo.png`,
      },
    },
  };

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
