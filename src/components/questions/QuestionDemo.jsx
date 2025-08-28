"use client"
import React from "react";
import { CompactQuestionsGrid } from "./CompactQuestionsList";
import CompactQuestionsHeader from "./CompactQuestionsHeader";

// Demo data
const demoQuestions = [
    {
        id: 1,
        question: "Namaz vaxtları haqqında sual",
        answer: "Namaz vaxtları günəşin vəziyyətinə görə müəyyən edilir. Səhər namazı dan vaxtından günəş çıxana qədər, günorta namazı günəş zenit nöqtəsindən keçdikdən sonra başlayır və ikindi vaxtına qədər davam edir. İkindi namazı günəşin qürub vaxtına yaxın başlayır, məğrib namazı günəş batdıqdan dərhal sonra, işa namazı isə şəfəq yox olduqdan sonra başlayır və səhər vaxtına qədər davam edir.",
        categories: [
            { id: 1, name: "İslam eliqadı və hüquq" },
            { id: 2, name: "İbadet" }
        ],
        tags: [
            { id: 1, name: "namaz" },
            { id: 2, name: "vaxt" },
            { id: 3, name: "ibadet" }
        ],
        createdDate: "2025-08-26T10:30:00Z",
        readCount: 45
    },
    {
        id: 2,
        question: "Oruc tutarkən nələrə diqqət etmək lazımdır?",
        answer: "Oruc tutarkən əsas şərt səhər dan vaxtından məğrib vaxtına qədər yemək, içmək və cinsi əlaqədən çəkinməkdir. Bundan əlavə, yalan danışmaq, söyüş söymək, başqalarına pislik etmək kimi günahlardan da uzaq durmaq lazımdır. Oruc yalnız fiziki bir çəkinmə deyil, həm də ruhani təmizlənmə prosesidir.",
        categories: [
            { id: 1, name: "İslam eliqadı və hüquq" },
            { id: 3, name: "Ramazan" }
        ],
        tags: [
            { id: 4, name: "oruc" },
            { id: 5, name: "ramazan" },
            { id: 6, name: "ibadet" }
        ],
        createdDate: "2025-08-25T14:20:00Z",
        readCount: 78
    },
    {
        id: 3,
        question: "Zəkat kimə verilir və necə hesablanır?",
        answer: "Zəkat İslamın beş əsas rüknündən biridir və müəyyən şərtləri olan müsəlmanlar üçün vacibdir. Zəkat mal-dövlətin 2.5%-i qədər olur və il ərzində nisab həddini keçən maldan verilir. Zəkat yoxsullara, kasıblara, zəkat işçilərinə, qəlbi İslama meyl edənlərə, qullara, borcluları, Allah yolunda olanlara və yolda qalanlara verilir.",
        categories: [
            { id: 1, name: "İslam eliqadı və hüquq" },
            { id: 4, name: "Maliyyə" }
        ],
        tags: [
            { id: 7, name: "zəkat" },
            { id: 8, name: "maliyyə" },
            { id: 9, name: "sosial ədalət" }
        ],
        createdDate: "2025-08-24T09:15:00Z",
        readCount: 92
    },
    {
        id: 4,
        question: "Hələl və haram qidalar haqqında",
        answer: "İslamda qida məsələləri çox əhəmiyyətlidir. Hələl qidalar Allah tərəfindən icazə verilən qidalardır. Haram qidalar arasında donuz əti, ölü heyvan əti, qan, spirtli içkilər və Allah adı çəkilmədən kəsilən heyvanların əti var. Həmçinin yırtıcı heyvanlar və qartal kimi quşların əti də haramdır.",
        categories: [
            { id: 5, name: "İslam etikası" },
            { id: 6, name: "Qida" }
        ],
        tags: [
            { id: 10, name: "hələl" },
            { id: 11, name: "haram" },
            { id: 12, name: "qida" }
        ],
        createdDate: "2025-08-23T16:45:00Z",
        readCount: 156
    }
];

export default function QuestionDemo() {
    const [layout, setLayout] = React.useState("grid");
    const [sortBy, setSortBy] = React.useState("date");
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <CompactQuestionsHeader
                    questionsCount={demoQuestions.length}
                    onLayoutChange={setLayout}
                    currentLayout={layout}
                    onSortChange={setSortBy}
                    currentSort={sortBy}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {/* Questions Display */}
                {layout === "grid" ? (
                    <CompactQuestionsGrid questions={demoQuestions} />
                ) : (
                    <CompactQuestionsList questions={demoQuestions} />
                )}
            </div>
        </div>
    );
}