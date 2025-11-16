import IslamicAboutPage from "@/components/about/IslamicAboutPage";
import Head from "next/head"
import Script from "next/script"

export const metadata = {
  title: "Haqqımızda | Nizamiyyə Mədrəsəsi",
  description: "Nizamiyyə Mədrəsəsi haqqında məlumat. İslami təhsil və mənəvi tərbiyə sahəsində xidmət göstəririk.",
}

const Page = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nizamiyyə Mədrəsəsi",
    url: "https://www.nizamiyyemedresesi.az",
    logo: "https://www.nizamiyyemedresesi.az/esm_logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+994 55 585 03 69",
      contactType: "Customer Service",
    },
  }
  return (
    <>
      <Head>
        <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <IslamicAboutPage />
    </>
  )
}

export default Page

