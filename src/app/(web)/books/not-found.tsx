/**
 * Book Not Found Page
 * 404 page for missing books
 */

import { NotFoundTemplate } from "@/components/common/NotFoundTemplate";

export default function BookNotFound() {
  return (
    <NotFoundTemplate
      title="Kitab Tapılmadı"
      description="Axtardığınız kitab mövcud deyil və ya silinib. Digər kitablarımızı nəzərdən keçirə bilərsiniz."
      icon={
        <svg className="w-16 h-16 text-purple-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      }
      iconBgColor="bg-purple-100"
      accentColor="bg-purple-100"
      suggestionTitle="Kitabxana"
      suggestionDescription="Geniş kitab kolleksiyamızda İslam dini, fiqh və digər mövzularda dəyərli əsərlər var. Kitabxanamızı ziyarət edin."
      suggestionIcon={
        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      }
      primaryAction={{
        href: "/books",
        label: "Bütün Kitablar",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
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
      footerMessage="Tövsiyə olunan kitabları görmək üçün kitablar bölməsinə baxın"
    />
  );
}
