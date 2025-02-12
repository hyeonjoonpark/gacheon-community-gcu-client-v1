"use client";

import { useNoticeStore } from '@/store/noticeStore';
import NoticeModal from '@/components/NoticeModal';

export default function NoticeBanner() {
  const { isVisible, setIsVisible, setShowModal } = useNoticeStore();

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed left-4 top-20 z-50">
        <div className="w-[300px]">
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 shadow-lg">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-blue-500 text-xl">📢</span>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  가천위키 오픈 안내
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  가천위키가 새롭게 오픈했습니다. 대학생활의 모든 것을 함께 만들어가요!
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setShowModal(true)}
                  className="text-sm px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full"
                >
                  자세히 보기
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-sm px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-full"
                >
                  다시 보지 않기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NoticeModal />
    </>
  );
}