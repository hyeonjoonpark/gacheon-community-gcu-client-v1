"use client"
import { useNoticeStore } from '@/store/noticeStore';

export default function NoticeModal() {
  const { showModal, setShowModal } = useNoticeStore();

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">가천위키 오픈 안내</h3>
          <button 
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>안녕하세요! 가천위키가 새롭게 오픈했습니다.</p>
          <p>
            가천위키는 가천대학교 학생들을 위한 지식 공유 플랫폼입니다. 
            학교생활에 필요한 모든 정보를 한곳에서 찾아보고 공유할 수 있습니다.
          </p>
          <p>여러분의 소중한 경험과 지식을 함께 나누어 주세요!</p>
          <div className="pt-4">
            <button
              onClick={() => setShowModal(false)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}