"use client"

import { useState, useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

// 더미 데이터 생성 함수
const generateDummyPosts = (page: number) => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: page * 10 + i,
    content: `${page * 10 + i}번째 게시글입니다. ${Math.random().toString(36).substring(7)}`,
    author: '익명',
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
    likes: Math.floor(Math.random() * 200),
    comments: Math.floor(Math.random() * 50)
  }));
};

// 가짜 API 호출 함수
const fetchPosts = async ({ pageParam = 1 }) => {
  // 실제 API 호출로 대체 필요
  await new Promise(resolve => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
  const posts = generateDummyPosts(pageParam);
  return { posts, nextPage: pageParam + 1, hasMore: pageParam < 5 };
};

export default function ForestPage() {
  const [isAnonymous, setIsAnonymous] = useState(true)
  const { ref: intersectionRef, inView } = useInView();
  
  // React Query로 무한 스크롤 구현
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  // 스크롤 위치 저장
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('forestScrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    
    // 저장된 스크롤 위치로 이동
    const savedPosition = sessionStorage.getItem('forestScrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer로 추가 데이터 로드
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            가천대 대나무숲 🎋
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              자유롭게 이야기를 나누는 익명 공간입니다
            </span>
          </h1>
        </div>

        <div className="mb-6">
          <textarea
            placeholder="무슨 이야기를 나누고 싶으신가요?"
            className="w-full p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[150px]"
          />
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 bg-white dark:bg-gray-800 text-blue-600 focus:ring-blue-500 checked:bg-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">익명으로 작성</span>
            </label>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              게시하기
            </button>
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {data?.pages.map((page) =>
            page.posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      🎋
                    </div>
                    <div>
                      <div className="font-medium">{post.author}</div>
                      <div className="text-sm text-gray-500">{post.date}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                    신고
                  </button>
                </div>
                <p className="text-gray-800 dark:text-gray-200 mb-4">
                  {post.content}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-blue-600">
                    <span>❤️ {post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600">
                    <span>💬 {post.comments}</span>
                  </button>
                </div>
              </div>
            ))
          )}
          
          {/* Intersection Observer 타겟 */}
          <div ref={intersectionRef} className="h-10">
            {isFetchingNextPage && <div className="text-center">로딩 중...</div>}
          </div>
        </div>
      </div>
    </div>
  );
} 