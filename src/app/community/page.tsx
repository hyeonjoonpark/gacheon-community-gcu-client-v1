"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCommunityStore } from '@/store/communityStore';
import { useThemeStore } from '@/store/themeStore';
import { useFindAllByTabQuery, CommunityType, Community } from '@/generated/graphql';

const CommunityPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL의 tab 파라미터 가져오기 (대문자로 변환)
  const tabParam = (searchParams.get('tab')?.toUpperCase() || 'FREE') as CommunityType;
  
  const { currentTab, setCurrentTab, currentPage, searchQuery, setCurrentPage, setSearchQuery } = useCommunityStore();

  // URL 파라미터가 변경될 때마다 currentTab 업데이트
  React.useEffect(() => {
    setCurrentTab(tabParam);
  }, [tabParam, setCurrentTab]);

  const { data, loading, error } = useFindAllByTabQuery({
    variables: {
      tab: tabParam,
      page: currentPage,
      size: 10
    }
  });

  console.log('Query variables:', {
    tab: tabParam
  }); // 디버깅용

  const tabs = [
    { id: 'FREE', name: '자유게시판' },
    { id: 'DEPARTMENT', name: '학과게시판' },
    { id: 'STUDENT', name: '학생게시판' },
  ];

  const handleTabChange = (tabId: string) => {
    // URL 파라미터도 대문자로 유지
    router.push(`/community?tab=${tabId}`, { scroll: false });
  };

  const handleCreatePost = () => {
    router.push('/community/new');
  };

  // 검색어 변경 핸들러 추가
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/community?tab=${currentTab}&page=${newPage}`, { scroll: false });
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">게시판</h1>
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

        <div className="mb-8 pt-10">
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">로딩 중...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-red-500">에러 발생: {error.message}</td>
                </tr>
              ) : data?.findAllByTab?.communities?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">게시글이 없습니다.</td>
                </tr>
              ) : (
                data?.findAllByTab?.communities?.map((post: Community, index) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 text-gray-900 dark:text-gray-100">{index + 1}</td>
                    <td className="py-4 text-gray-900 dark:text-gray-100">{post.title}</td>
                    <td className="py-4 text-gray-900 dark:text-gray-100">{post.createdBy}</td>
                    <td className="py-4 text-gray-500 dark:text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-gray-500 dark:text-gray-400">{post.likeCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!data?.findAllByTab?.pageInfo.hasPrevious}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            이전
          </button>
          
          {/* 페이지 번호 */}
          {Array.from({length: data?.findAllByTab?.pageInfo.totalPages || 0}, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === data?.findAllByTab?.pageInfo.currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {pageNum}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!data?.findAllByTab?.pageInfo.hasNext}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
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
