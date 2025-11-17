/**
 * Video Not Found Page
 * 404 page for missing videos
 */

import { NotFoundTemplate } from "@/components/common/NotFoundTemplate";

export default function VideoNotFound() {
  return (
    <NotFoundTemplate
      title="Video Tapılmadı"
      description="Axtardığınız video mövcud deyil və ya silinib. Digər videolarımızı izləyə bilərsiniz."
      icon={
        <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      }
      iconBgColor="bg-red-100"
      accentColor="bg-red-100"
      suggestionTitle="Video Kitabxana"
      suggestionDescription="Dini mövzularda maraqlı və faydalı videolarımızı izləyin. Nizamiyyə Mədrəsəsinin zəngin video arxivindən istifadə edin."
      suggestionIcon={
        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      }
      primaryAction={{
        href: "/videos",
        label: "Bütün Videolar",
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
          href: "/articles",
          label: "Məqalələr",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
            </svg>
          ),
        },
      ]}
      footerMessage="Populyar videoları görmək üçün videolar bölməsinə baxın"
    />
  );
}
