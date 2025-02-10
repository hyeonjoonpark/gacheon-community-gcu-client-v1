"use client";

import { useState } from 'react';

interface PopularArticle {
    rank?: number;
    title: string;
    likes: number;
}

const PopularArticles = () => {
    const [articles, setArticles] = useState<PopularArticle[]>([
        { rank: 1, title: 'IT대학', likes: 31 },
        { rank: 2, title: '학사일정', likes: 28 },
        { rank: 3, title: '기숙사', likes: 25 }
    ]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">인기</h2>
            <ul className="space-y-2">
                {articles.map((article, index) => (
                    <li key={index} className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                            {article.rank ? `${article.rank}. ` : ''}{article.title}
                        </span>
                        <span className="text-gray-500">❤ {article.likes}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularArticles; 