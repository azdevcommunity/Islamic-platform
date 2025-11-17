/**
 * Article Not Found Page
 * 404 page for missing articles
 */

import { NotFoundTemplate } from "@/components/common/NotFoundTemplate";

export default function ArticleNotFound() {
  return (
    <NotFoundTemplate
      title="Məqalə Tapılmadı"
      description="Axtardığınız məqalə mövcud deyil və ya silinib. Digər məqalələrimizi nəzərdən keçirə bilərsiniz."
      icon={
        <svg className="w-16 h-16 text-[#43b365]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      }
      iconBgColor="bg-[#43b365]/10"
      accentColor="bg-[#43b365]/10"
      suggestionTitle="Təklif"
      suggestionDescription="Axtardığınız mövzunu axtarış bölməsində yoxlayın və ya ən son məqalələrimizə baxın. İslami elm və hikmət dolu məqalələrimiz sizləri gözləyir."
      suggestionIcon={
        <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
        </svg>
      }
      primaryAction={{
        href: "/articles",
        label: "Bütün Məqalələr",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        ),
      }}
      secondaryActions={[
        {
          href: "/search",
          label: "Axtarış",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ),
        },
        {
          href: "/questions",
          label: "Suallar",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ]}
      footerMessage="Populyar məqalələrimizi oxumaq üçün məqalələr bölməsinə keçin"
    />
  );
}
