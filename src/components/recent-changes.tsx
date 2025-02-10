"use client";

import { useEffect, useState } from 'react';

interface RecentChange {
    title: string;
    timeAgo: string;
}

const RecentChanges = () => {
    const [changes, setChanges] = useState<RecentChange[]>([
        { title: '부마위키 업데이트', timeAgo: '8일 전' },
        { title: '박동현', timeAgo: '12일 전' },
        { title: '김우성', timeAgo: '15일 전' },
        { title: '공덕현', timeAgo: '15일 전' },
        { title: '정태양', timeAgo: '20일 전' }
    ]);

    // 나중에 API 연동 시 사용
    // useEffect(() => {
    //     const fetchRecentChanges = async () => {
    //         const response = await fetch('/api/recent-changes');
    //         const data = await response.json();
    //         setChanges(data);
    //     };
    //     fetchRecentChanges();
    // }, []);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">최근 변경</h2>
            <div className="space-y-2">
                {changes.map((change, index) => (
                    <div key={index} className="flex justify-between items-center whitespace-nowrap">
                        <span className="text-gray-700 dark:text-gray-300 truncate max-w-[60%]">
                            {change.title}
                        </span>
                        <span className="text-gray-500 ml-2 flex-shrink-0">
                            {change.timeAgo}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentChanges; 