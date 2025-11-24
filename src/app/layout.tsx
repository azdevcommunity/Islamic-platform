import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Toaster } from "sonner";
import { Roboto } from "next/font/google";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const keywords = [
  "ehlisunne",
  "islam",
  "din",
  "quran",
  "allah",
  "iman",
  "oruc",
  "Ehli Sünne",
  "Medrese",
  "İslam Maarifi",
  "Nizamiyyə Mədrəsəsi",
  "Din Maarifi",
  "Dini Təhsil",
  "İslam Mədrəsəsi",
  "Ehli Sünne Mədrəsəsi",
  "Əhli-Sünnə Məzhəbi",
  "Dini Maarifləndirmə",
  "Nizamiyyə Mədrəsəsi Bakı",
  "Nizamiyyə Mədrəsəsi Azərbaycan",
  "İslam Mədrəsəsi Bakı",
  "Bakı Ehli Sünne Mədrəsəsi",
  "Dini təhsil Bakı",
  "Nizamiyyə Mədrəsəsi Gəncə",
  "Nizamiyyə Mədrəsəsi Naxçıvan",
  "Azərbaycan Ehli Sünne Mədrəsəsi",
  "Ehli Sünne Məktəbi",
  "Quran dərsləri Ehli Sünne Mədrəsəsində",
  "Nizamiyyə Mədrəsəsi tarixi",
  "Nizamiyyə Mədrəsəsinin xidmətləri",
  "Ehli Sünne Mədrəsəsi nədir?",
  "Nizamiyyə Mədrəsəsi və Quran dərsləri",
  "Ehli Sünne inancı və prinsipləri",
  "İslam maarifi və Nizamiyyə Mədrəsəsi",
  "Nizamiyyə Mədrəsəsi dərnəkləri",
  "Fiqh dərsləri Mədrəsədə",
  "Hədis elmi və Əhli-Sünnə",
  "Uşaqlar üçün dini təhsil",
  "Ehli Sünne haqqında məqalələr",
  "İslam dini haqqında resurslar",
  "Ehli Sünne Mədrəsəsi xəbərləri",
  "Ehli Sünne Mədrəsəsi xidmətləri",
  "Henefi",
  "Safi",
  "Henbeli",
  "Maliki",
  "Hənəfi",
  "Şafi",
  "Hənbəli",
  "Maliki",
  "Firudin Babaoğlu",
  "Hədis",
  "Quran",
  "Allah",
  "Din",
];

export const metadata: Metadata = {
  title: "Nizamiyyə Mədrəsəsi",
  description:
    "İslam dini haqqında maarifləndirici məlumatlar və resurslar təqdim edən Nizamiyyə Mədrəsəsi.",
  metadataBase: new URL("https://www.nizamiyyemedresesi.az"),
  openGraph: {
    siteName: "Nizamiyyə Mədrəsəsi",
    type: "website",
    locale: "az_AZ",
    url: "https://www.nizamiyyemedresesi.az",
    title: "Nizamiyyə Mədrəsəsi",
    description:
      "İslam dini haqqında maarifləndirici məlumatlar və resurslar təqdim edən Nizamiyyə Mədrəsəsi.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nizamiyyə Mədrəsəsi Banner",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    types: {
      "application/rss+xml": "https://www.nizamiyyemedresesi.az/rss.xml",
    },
  },
  applicationName: "Nizamiyyə Mədrəsəsi",
  appleWebApp: {
    title: "Nizamiyyə Mədrəsəsi",
    statusBarStyle: "default",
    capable: true,
  },
  verification: {
    google: "9F3dA1y_ERv-C13d3qNSRFapLvGfp-fWGR4YAKUHZYw",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.nizamiyyemedresesi.az/makale-detay",
    },
    keywords: keywords,
    headline: "İslam Dininə Aid Dəyərli Məqalələr",
    description:
      "Nizamiyyə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
    image: "https://www.nizamiyyemedresesi.az/images/blog-thumbnail.png",
    dateCreated: "2024-01-11T11:35:00+04:00",
    datePublished: "2024-01-11T11:35:00+04:00",
    dateModified: "2024-01-11T11:35:00+04:00",
    author: {
      "@type": "Person",
      name: "Nizamiyyə Mədrəsəsi",
      url: "https://www.nizamiyyemedresesi.az/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Nizamiyyə Mədrəsəsi",
      logo: {
        "@type": "ImageObject",
        url: "https://www.nizamiyyemedresesi.az/logo.png",
      },
    },
    inLanguage: "az-AZ",
    isFamilyFriendly: "true",
  };

  return (
    <html lang="az-AZ" className={roboto.className} suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>Nizamiyyə Mədrəsəsi</title>
        <link rel="canonical" href={domain} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        />
        <meta
          name="description"
          content="Nizamiyyə Mədrəsəsi haqqında məlumatlar və maarifləndirici məqalələr."
        />
        <meta name="keywords" content={keywords.join(", ")} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.style.backgroundColor = '#ffffff';
                  document.body.style.backgroundColor = '#ffffff';
                  
                  if (!document.documentElement || !document.body) {
                    return;
                  }
                  
                  const storedTheme = localStorage.getItem('color-theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldUseDark = storedTheme === 'dark' || (!storedTheme && systemPrefersDark);
                  
                  if (shouldUseDark) {
                    document.documentElement.classList.add('dark');
                    document.body.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.body.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {
                  console.warn('Theme initialization failed:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
