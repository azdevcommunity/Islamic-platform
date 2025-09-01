import NewQuestionsPage from "@/components/questions/NewQuestionsPage"
import {useCallback} from "react";
import HttpClient from "@/util/HttpClient";
import {BASE_URL} from "@/util/Const";

export const metadata = {
    title: "Sual və Cavablar | Dini Məsələlər",
    description: "Dini məsələlər haqqında suallarınızın cavablarını tapın. İslam dini, namaz, oruc, zəkat və digər mövzular üzrə ətraflı məlumatlar.",
    keywords: "sual cavab, dini məsələlər, islam, namaz, oruc, zəkat, dini suallar",
}
export const revalidate = 60;

const Page = async () => {
    let statistics = {
        totalQuestions: 0,
        totalCategories: 0,
        totalTags: 0,
        totalViewCount: 0
    }
    try {
        const response = await fetch(`${BASE_URL}/questions/statistics`, {next: {revalidate: 60}});

        const data = await response.json();

        statistics = {
            totalQuestions: data.totalQuestions || 0,
            totalCategories: data.totalCategories || 0,
            totalTags: data.totalTags || 0,
            totalViewCount: data.totalViewCount || 0
        }
    } catch (err) {
        console.error("Error fetching statistics:", err);
    }
    return <NewQuestionsPage statistics={statistics}/>
}

export default Page

