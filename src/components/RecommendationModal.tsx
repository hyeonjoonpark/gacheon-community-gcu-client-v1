'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPreference, RecommendationResult } from '@/types/recommendation';

export default function RecommendationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
    const [step, setStep] = useState(1);
    const [preferences, setPreferences] = useState<UserPreference>({
        interests: [],
        subjects: {
            math: 0,
            science: 0,
            language: 0,
            social: 0,
            art: 0
        },
        careerGoals: [],
        personality: []
    });

    const handleInputChange = (field: keyof UserPreference, value: string) => {
        if (field === 'interests' || field === 'careerGoals' || field === 'personality') {
            setPreferences(prev => ({
                ...prev,
                [field]: value.split(',').map(item => item.trim())
            }));
        }
    };

    const handleSubjectChange = (subject: keyof typeof preferences.subjects, value: string) => {
        setPreferences(prev => ({
            ...prev,
            subjects: {
                ...prev.subjects,
                [subject]: parseInt(value) || 0
            }
        }));
    };

    const handleSubmit = async () => {
        // 요청 보내고 나서 로딩인디케이터
        setLoading(true);
        try {
            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(preferences)
            });
            const data = await response.json();
            setRecommendations(data.recommendations);
            setStep(4);
        } catch (error) {
            console.error('추천 실패:', error);
            alert('추천 과정에서 오류가 발생했습니다.');
        }
        setLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 flex items-center gap-2"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                AI 학과 추천
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <h2 className="text-2xl font-bold mb-6">AI 학과 추천</h2>

                            {step === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            관심 분야 (쉼표로 구분)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700"
                                            placeholder="예: 컴퓨터, 과학, 예술"
                                            onChange={(e) => handleInputChange('interests', e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full p-2 bg-blue-500 text-white rounded"
                                    >
                                        다음
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            과목별 성적 (0-100)
                                        </label>
                                        {Object.keys(preferences.subjects).map((subject) => (
                                            <div key={subject} className="mb-2">
                                                <label className="block text-sm mb-1">
                                                    {subject}
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    className="w-full p-2 border rounded text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700"
                                                    onChange={(e) => handleSubjectChange(subject as keyof typeof preferences.subjects, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setStep(3)}
                                        className="w-full p-2 bg-blue-500 text-white rounded"
                                    >
                                        다음
                                    </button>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            희망 진로 (쉼표로 구분)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700"
                                            placeholder="예: 개발자, 연구원"
                                            onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            성격 특성 (쉼표로 구분)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700"
                                            placeholder="예: 논리적, 창의적"
                                            onChange={(e) => handleInputChange('personality', e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className={`w-full p-2 rounded text-white flex items-center justify-center gap-2 ${
                                            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                <span>분석 중...</span>
                                            </>
                                        ) : (
                                            '추천받기'
                                        )}
                                    </button>
                                </div>
                            )}

                            {step === 4 && (
                                <>
                                    {loading ? (
                                        <div className="flex items-center justify-center py-12">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                        </div>
                                    ) : recommendations && recommendations.length > 0 ? (
                                        <div className="space-y-6">
                                            {recommendations.map((rec, index) => (
                                                <div
                                                    key={index}
                                                    className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700"
                                                >
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h3 className="text-xl font-bold">
                                                            {rec.collegeName}
                                                        </h3>
                                                        <div className="text-blue-500 font-semibold">
                                                            매칭 점수: {rec.matchScore}%
                                                        </div>
                                                    </div>
                                                    <ul className="list-disc list-inside space-y-2">
                                                        {rec.reasons.map((reason, i) => (
                                                            <li key={i} className="text-gray-600 dark:text-gray-300">
                                                                {reason}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                            
                                            <button
                                                onClick={() => {
                                                    setStep(1);
                                                    setRecommendations([]);
                                                }}
                                                className="w-full px-6 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg mt-4"
                                            >
                                                다시 시작
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            추천 결과가 없습니다.
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 