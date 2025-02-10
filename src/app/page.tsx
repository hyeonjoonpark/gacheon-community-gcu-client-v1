"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { colleges } from '@/data/colleges';
import { College } from '@/types/college';
import { printCollege } from '@/utils/print';
import { useFavoriteStore } from '@/store/favoriteStore';
import RecommendationModal from '@/components/RecommendationModal';
import { useRouter } from 'next/navigation';

const stats = {
    worldRank: "23위",
    support: "350억원",
    grade: "A등급"
};

export default function Home() {
    const router = useRouter();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
        layoutEffect: false
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const { favorites, toggleFavorite } = useFavoriteStore();

    const filteredColleges = colleges.filter(college => {
        const matchesSearch = 
            college.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            college.departments.some(dept => 
                dept.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        
        if (showFavorites) {
            return matchesSearch && favorites.includes(college.title);
        }
        return matchesSearch;
    });

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            const hasLoaded = sessionStorage.getItem('hasLoaded');
            if (!hasLoaded) {
                sessionStorage.setItem('hasLoaded', 'true');
                router.refresh();
            }
        }

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePrint = (college: College) => {
        printCollege(college);
    };

    const handleShare = async (college: College) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `가천대학교 ${college.title}`,
                    text: college.description,
                    url: window.location.href
                });
            } else {
                // 클립보드에 복사
                await navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
            }
        } catch (error) {
            // 사용자가 공유를 취소한 경우는 에러로 처리하지 않음
            if ((error as Error).name !== 'AbortError') {
                console.error('공유 실패:', error);
            }
        }
    };

    return (
        <main className="pt-20 min-h-screen bg-white dark:bg-[#18171C]">
            <div className="max-w-[1280px] mx-auto px-6 pb-32">
                {/* 히어로 섹션 */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="py-32"
                >
                    <div className="text-blue-500 dark:text-blue-400 font-semibold mb-4">가천대학교</div>
                    <h1 className="text-[3.5rem] font-bold text-gray-900 dark:text-white leading-tight mb-8">
                        글로벌 경쟁력을 갖춘<br />
                        미래형 창의인재 양성
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-xl">
                        2024년 중앙일보 대학평가 종합 25위<br />
                        발전가능성 가장 높은 대학 1위
                    </p>
                </motion.div>

                {/* 통계 섹션 */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-3 gap-8 py-20"
                >
                    {[
                        {
                            value: stats.worldRank,
                            label: "THE 세계대학평가\n국내 순위"
                        },
                        {
                            value: stats.support,
                            label: "반도체특성화대학\n지원금"
                        },
                        {
                            value: stats.grade,
                            label: "대학혁신지원사업\n2년 연속"
                        }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-blue-500 dark:text-blue-400 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                <div className="mb-3 flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="학과를 검색하세요"
                        className="px-4 py-2 rounded-lg border dark:bg-[#1C1B22] dark:border-gray-700"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => setShowFavorites(!showFavorites)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                            showFavorites 
                                ? 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-100' 
                                : 'bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            즐겨찾기만 보기
                        </span>
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="py-24"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">주요 단과대학</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredColleges.map((dept, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group p-8 rounded-2xl bg-gray-50 dark:bg-[#1C1B22] hover:bg-white dark:hover:bg-[#242427] transition-all shadow-sm hover:shadow-xl relative overflow-hidden"
                            >
                                {/* 배경 그라데이션 효과 */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                {/* 기존 내용을 relative z-10으로 감싸기 */}
                                <div className="relative z-10">
                                    <div className="text-4xl mb-4">{dept.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {dept.title}
                                    </h3>
                                    
                                    {/* 추가 정보 뱃지 */}
                                    <div className="flex gap-2 mb-4">
                                        <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
                                            {dept.departments.length}개 학과
                                        </span>
                                        <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full">
                                            4년제
                                        </span>
                                    </div>
                                    
                                    {/* 기존 description과 나머지 내용 */}
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {dept.description}
                                    </p>
                                    
                                    {/* 학과 목록 추가 */}
                                    {dept.departments && dept.departments.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                                소속학과
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {dept.departments.map((department, idx) => (
                                                    <span 
                                                        key={idx}
                                                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                                                    >
                                                        {department.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {dept.details && (
                                        <div className="mt-4 space-y-4">
                                            {dept.details.map((detail, idx) => (
                                                <div key={idx}>
                                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                                        {detail.title}
                                                    </h4>
                                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                        {detail.items.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handlePrint(dept)}
                                        className="absolute top-4 right-16 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => handleShare(dept)}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => toggleFavorite(dept.title)}
                                        className="absolute top-4 right-28 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                        <svg 
                                            className={`w-5 h-5 ${
                                                favorites.includes(dept.title) 
                                                    ? 'text-yellow-500 fill-current' 
                                                    : 'text-gray-400'
                                            }`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 학과 소개 섹션 끝난 후 추가 */}
                
                {/* 개인정보 처리방침 섹션 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="py-16 border-t border-gray-200 dark:border-gray-800"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        개인정보 처리방침
                      </h2>
                    </div>
                    <div className="md:col-span-3">
                      <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                        <p>
                          가천대학교 커뮤니티 가천대 유니버스는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 <br />개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
                        </p>
                        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">연락처</h3>
                            <p>개인정보 보호책임자: 개발자 박현준</p>
                            <p>이메일: pjjoon1379@gmail.com</p>
                            <p>전화: 010-4886-1379</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">주요 항목</h3>
                            <ul className="list-disc list-inside">
                              <li>개인정보의 처리 목적</li>
                              <li>처리하는 개인정보의 항목</li>
                              <li>개인정보의 처리 및 보유 기간</li>
                              <li>개인정보의 제3자 제공</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
            </div>

            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </motion.button>
            )}

            <RecommendationModal />
        </main>
    );
}
