"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCommunityStore } from '@/store/communityStore';
import { useThemeStore } from '@/store/themeStore';
import { useQuery } from '@tanstack/react-query';

const CommunityPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { currentTab, currentPage, searchQuery, setCurrentTab, setCurrentPage, setSearchQuery } = useCommunityStore();
  const { theme } = useThemeStore();

  const tabs = [
    { id: 'free', name: '자유게시판' },
    { id: 'department', name: '학과게시판' },
    { id: 'student', name: '학생게시판' },
  ];

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setCurrentPage(1); // 탭 변경시 1페이지로 초기화
    router.push(`/community?tab=${tabId}`, { scroll: false });
  };

  const handleCreatePost = () => {
    router.push('/community/new');
  };

  // 검색어 변경 핸들러 추가
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 게시글 데이터 fetch 함수
  const { data, isLoading } = useQuery({
    queryKey: ['posts', currentTab, currentPage, searchQuery],
    queryFn: async () => {
      const response = await fetch(
        `/api/posts?page=${currentPage}&tab=${currentTab}&search=${searchQuery}`
      );
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    placeholderData: (previousData) => previousData  // keepPreviousData 대신 사용
  });

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">커뮤니티</h1>
          <button onClick={handleCreatePost} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
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

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 text-left text-gray-500 dark:text-gray-400">번호</th>
                <th className="py-3 text-left text-gray-500 dark:text-gray-400">제목</th>
                <th className="py-3 text-left text-gray-500 dark:text-gray-400">작성자</th>
                <th className="py-3 text-left text-gray-500 dark:text-gray-400">작성일</th>
                <th className="py-3 text-left text-gray-500 dark:text-gray-400">조회</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data?.posts.map((post: any) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-4 text-gray-900 dark:text-gray-100">{post.id}</td>
                  <td className="py-4 text-gray-900 dark:text-gray-100">{post.title}</td>
                  <td className="py-4 text-gray-900 dark:text-gray-100">{post.author}</td>
                  <td className="py-4 text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 text-gray-500 dark:text-gray-400">{post.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            이전
          </button>
          
          {Array.from({ length: data?.totalPages || 1 }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md transition-colors
                ${currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === (data?.totalPages || 1)}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            다음
          </button>
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
