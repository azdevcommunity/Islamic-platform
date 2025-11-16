import IslamicHomePage from "@/layouts/IslamicHomePage"
import Head from "next/head"
import Script from "next/script"

export const revalidate = 60;

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://yourwebsite.com",
    name: "nizamiyyemedresesi.az",
    author: {
      "@type": "Person",
      name: "Yusif Hasanov",
    },
    description: "Əhli-Sünnə mədrəsəsi, 4 məzhəb",
  }
  return (
    <>
      <Head>
        <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>
      <IslamicHomePage />
    </>
  )
}

