"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCommunityStore } from '@/store/communityStore';
import { useThemeStore } from '@/store/themeStore';

const CommunityPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { currentTab, searchQuery, setCurrentTab, setSearchQuery } = useCommunityStore();
  const { theme } = useThemeStore();

  const tabs = [
    { id: 'free', name: '자유게시판' },
    { id: 'department', name: '학과게시판' },
    { id: 'student', name: '학생게시판' },
  ];

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    router.push(`/community?tab=${tabId}`, { scroll: false });
  };

  // 검색어 변경 핸들러 추가
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">커뮤니티</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            글쓰기
          </button>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${currentTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className={`mt-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center flex-1 mr-4 h-10">
              <input
                type="text"
                placeholder="검색어를 입력해주세요"
                value={searchQuery}
                onChange={handleSearchChange}
                className={`h-full px-4 border rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500
                  ${theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
              />
              <button className={`h-full px-4 text-white rounded-r-md flex items-center justify-center
                ${theme === 'dark'
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="currentColor" 
                  className="w-5 h-5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
                  />
                </svg>
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-3 text-left">번호</th>
                <th className="py-3 text-left">제목</th>
                <th className="py-3 text-left">작성자</th>
                <th className="py-3 text-left">작성일</th>
                <th className="py-3 text-left">조회</th>
              </tr>
            </thead>
            <tbody>
              {/* 게시글 데이터는 백엔드에서 받아와서 매핑 */}
              <tr className="border-b dark:border-gray-700">
                <td className="py-4">1</td>
                <td className="py-4">안녕하세요 신입생입니다</td>
                <td className="py-4">홍길동</td>
                <td className="py-4">2024.03.02</td>
                <td className="py-4">0</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-center mt-6 gap-2">
            <button className={`px-3 py-1 rounded-md transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              &lt;
            </button>
            <button className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              1
            </button>
            <button className={`px-3 py-1 rounded-md transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
              }
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 페이지 내보내기
export default function CommunityPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommunityPage />
    </Suspense>
  );
}
