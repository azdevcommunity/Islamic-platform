/**
 * Question Not Found Page
 * 404 page for missing questions
 */

import { NotFoundTemplate } from "@/components/common/NotFoundTemplate";

export default function QuestionNotFound() {
  return (
    <NotFoundTemplate
      title="Sual Tapılmadı"
      description="Axtardığınız sual mövcud deyil və ya silinib. Digər sualları nəzərdən keçirə və ya yeni sual verə bilərsiniz."
      icon={
        <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      }
      iconBgColor="bg-green-100"
      accentColor="bg-green-100"
      suggestionTitle="Kömək"
      suggestionDescription="Sualınız cavabsız qaldımı? Yeni sual verin və ya mövcud suallar arasında axtarış edin. Dini məsələlər üzrə həkimlik cavabları sizləri gözləyir."
      suggestionIcon={
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
        </svg>
      }
      primaryAction={{
        href: "/questions/ask",
        label: "Yeni Sual Ver",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        ),
      }}
      secondaryActions={[
        {
          href: "/questions",
          label: "Bütün Suallar",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          ),
        },
        {
          href: "/search",
          label: "Axtarış",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ),
        },
      ]}
      footerMessage="Tez-tez verilən sualları görmək üçün suallar bölməsinə baxın"
    />
  );
}
