"use client";

import RecentChanges from "@/components/recent-changes";
import PopularArticles from "@/components/popular-articles";

const CaseWikiPage = () => {
    const accidents = [
        {
            year: "2024년 사건/사고",
            entries: [
                {
                    title: "나 이희@성인데 이거뭐라",
                    lastEdit: "2024년 4월 16일 오전 10시 4분",
                    content: "나 배우자 좋아하다.그냥 꼭자 좋아하다. 아름다다 박말 내 좋아-대 창고씨 좋 숭강라마-엔 엄청하다.마 나를 좋아서 숭기가 됐들어서 갈 말했다. 오세 성강마라 그런는데 똑시었어다. 응원하다. 막먹져 보자하다. 난 재있다. 사건 2024년 3월 27일, 학부모 총회가 끝난 후 학부 ... ...",
                    thumbnail: "/path/to/image.jpg"
                },
                {
                    title: "낭낭이",
                    lastEdit: "2024년 3월 18일 오후 12시 6분",
                    content: "동영상 테스트용으로 생성된 문서입는게 학제허 점섰",
                },
                {
                    title: "부마위키 욕에티 사건",
                    lastEdit: "2024년 3월 18일 오전 10시 46분",
                    content: "지금 부마위키를 사용하다보면 https://bumawiki.s3.ap-northeast-2.amazonaws.com/file3bcc10ab-5892-4aba-ae1f-a631246e92be 이런 곳에 접근했을 때 이 화면을 볼 수 있다. 삭아보시면 (배우청 처럼) ... ...",
                },
                // ... 더 많은 사건/사고 데이터
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">부마위키:사건/사고</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">분류 : 사건/사고</div>

            {accidents.map((yearGroup, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span className="cursor-pointer">▼</span>
                        <span className="ml-2">{yearGroup.year}</span>
                    </h2>
                    
                    <div className="space-y-6">
                        {yearGroup.entries.map((accident, accidentIndex) => (
                            <div key={accidentIndex} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                        {accident.title}
                                    </h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                                        최근 수정일: {accident.lastEdit}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                    {accident.content}
                                </p>
                                {accident.thumbnail && (
                                    <div className="mt-4">
                                        <img 
                                            src={accident.thumbnail} 
                                            alt={accident.title}
                                            className="max-w-[200px] rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* 사이드바 */}
            <aside className="fixed right-4 top-24 w-64 space-y-6">
                <PopularArticles />
                <RecentChanges />
            </aside>
        </div>
    );
};

export default CaseWikiPage;