"use client";

import RecentChanges from '@/components/recent-changes';
import PopularArticles from '@/components/popular-articles';

const StudentWikiPage = () => {
    const students = [
        {
            year: "2024년 학생",
            entries: [
                {
                    name: "공덕현",
                    lastEdit: "2025년 1월 20일 오후 2시 11분",
                    content: "1-1반 대표 몰라마이더 틀 너무 당시 인간우 애가 힘없서 솔직히 빡쳤다. 서현진 애가 제스 1팀 1등인는 기적이 있다. 게임을 성동하 못하는 돈 없다... 게임발제 똑소리캐 귀엽다. 일본애라면다 쓰오 + 그 몰랐는 똑소리캐 아가페캐 소프트노을 소스로 딱딱해 뜬 뒤에를 날았다 <워크 분서<(캔지 ... ...",
                    thumbnail: "/images/student-thumbnail.jpg" // 필요한 경우
                },
                {
                    name: "구원우",
                    lastEdit: "2024년 3월 23일 오후 7시 33분",
                    content: "부소하고 4기 입학이다. 게요 몬스터틀 취우울일 울나딧용 저먹다. 잉요의인 울리는 표정이 흔나 린반는다. 오세 면먹하는 어섯보이 게신다. 하지만 안타캐게도 다른학교 캠핑때 욕소리가 바람다. 똑소리가 화가 나시는데 진짜 화가나진 아니니까 오해하지말자. 솔비타인만 케이크 부럽 아이스박스<게소선 ... ..."
                },
            ]
        },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">부마위키:학생</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">분류 : 학생</div>

            {students.map((yearGroup, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span className="cursor-pointer">▼</span>
                        <span className="ml-2">{yearGroup.year}</span>
                    </h2>
                    
                    <div className="space-y-6">
                        {yearGroup.entries.map((student, studentIndex) => (
                            <div key={studentIndex} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {student.name}
                                    </h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        최근 수정일: {student.lastEdit}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                                    {student.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* 사이드바 - 인기/최근 변경 */}
            <aside className="fixed right-4 top-24 w-64 space-y-6">
                <PopularArticles />
                <RecentChanges />
            </aside>
        </div>
    );
};

export default StudentWikiPage;