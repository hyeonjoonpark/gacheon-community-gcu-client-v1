'use client';

import { useEffect, useState } from 'react';
import RefreshButton from '@/components/RefreshButton';

interface Notice {
    id: number;
    title: string;
    date: string;
    category: string;
    writer: string;
    views: string;
    link: string;
}

export default function NoticePage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('/api/notices', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-store'
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('서버 응답:', errorData);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.success) {
                    setNotices(result.data);
                } else {
                    console.error('공지사항 로딩 실패:', result.message);
                }
            } catch (error) {
                console.error('공지사항 로딩 중 에러:', error);
                setNotices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    return (
        <div className="pt-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">공지사항</h1>
                    <RefreshButton />
                </div>
                <h3 className="font-bold mb-6 text-gray-900 dark:text-white">최근 10개의 뉴스만 보여집니다</h3>
                
                {loading ? (
                    <div>로딩 중...</div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">분류</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">제목</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">작성일</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                    {notices.map((notice) => (
                                        <tr key={notice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {notice.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                                <a href={notice.link} target="_blank" rel="noopener noreferrer">
                                                    {notice.title}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {notice.date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}