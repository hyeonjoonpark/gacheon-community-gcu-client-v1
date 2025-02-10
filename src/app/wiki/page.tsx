"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import RecentChanges from '@/components/recent-changes';
import PopularArticles from '@/components/popular-articles';

export default function WikiPage() {
    const router = useRouter();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showInquiryModal, setShowInquiryModal] = useState(false);

    const handleUpdateClick = () => {
        window.history.pushState(null, '', '/wiki/update-list');
        setShowUpdateModal(true);
    };

    const handleInquiryClick = () => {
        window.history.pushState(null, '', '/wiki/inquiry');
        setShowInquiryModal(true);
    };

    const handleCloseModal = () => {
        window.history.pushState(null, '', '/wiki');
        setShowUpdateModal(false);
        setShowInquiryModal(false);
    };

    useEffect(() => {
        const handlePopState = () => {
            setShowUpdateModal(false);
            setShowInquiryModal(false);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <div className="pt-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">가천위키</h1>
                    <button onClick={() => router.push('/wiki/new-docs')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        문서 작성
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* 메인 컨텐츠 */}
                    <main className="flex-1">
                        <div className="mb-8">
                            <div className="text-sm text-gray-500 dark:text-gray-400">분류 : 대문</div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                            <h2 className="font-bold text-center mb-4 text-gray-900 dark:text-white text-2xl md:text-3xl px-2 md:whitespace-nowrap">
                                대학생활에서 발생한 재미있는 사건들을 한눈에
                            </h2>
                            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                                가천위키에 오신 것을 환영합니다!
                            </p>
                            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                                가천위키는 가천대학교의 모든 것을 담아내는 위키입니다.<br />
                                검증되지 않았거나 잘못된 내용이 있을 수 있습니다.
                            </p>
                            <p className="text-center text-red-500 mb-8">
                                ❗ 타인에 대한 조롱 또는 비방, 반문명적 언행 발생하는 문제에 대한 책임은 본인에게 있습니다. 주의해주세요! ❗
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                                <button 
                                    onClick={handleUpdateClick}
                                    className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                >
                                    업데이트 내역
                                </button>
                                <button 
                                    onClick={handleInquiryClick}
                                    className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                >
                                    문의하기
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* 우측 사이드바 */}
                    <aside className="w-full lg:w-80 space-y-6">
                        <PopularArticles />
                        <RecentChanges />
                    </aside>
                </div>

                {/* 업데이트 내역 모달 */}
                <Dialog 
                    open={showUpdateModal} 
                    onClose={handleCloseModal}
                    className="relative z-50"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <div className="mx-auto w-full max-w-3xl rounded-lg bg-white dark:bg-gray-800 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                업데이트 내역
                            </h2>
                            <div className="text-gray-600 dark:text-gray-300 min-h-[300px]">
                                <p>최근 업데이트 내역이 여기에 표시됩니다.</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </Dialog>

                {/* 문의하기 모달 */}
                <Dialog 
                    open={showInquiryModal} 
                    onClose={handleCloseModal}
                    className="relative z-50"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <div className="mx-auto w-full max-w-3xl rounded-lg bg-white dark:bg-gray-800 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                문의하기
                            </h2>
                            <div className="text-gray-600 dark:text-gray-300">
                                <textarea 
                                    className="w-full h-48 p-4 border rounded dark:bg-gray-700 dark:border-gray-600 mb-6"
                                    placeholder="문의 내용을 입력해주세요..."
                                />
                                <div className="flex justify-end gap-3">
                                    <button 
                                        onClick={handleCloseModal}
                                        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                    >
                                        취소
                                    </button>
                                    <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                        제출하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}