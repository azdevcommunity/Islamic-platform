import IslamicQuestionsPage from "@/components/questions/IslamicQuestionsPage"

export const metadata = {
    title: "Sual və Cavablar | Dini Məsələlər",
    description: "Dini məsələlər haqqında suallarınızın cavablarını tapın. İslam dini, namaz, oruc, zəkat və digər mövzular üzrə ətraflı məlumatlar.",
    keywords: "sual cavab, dini məsələlər, islam, namaz, oruc, zəkat, dini suallar",
}
export const revalidate = 60;

const Page = () => {
    return <IslamicQuestionsPage />
}

export default Page

