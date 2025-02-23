'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

interface LoginPopupProps {
  isOpen: boolean
  onClose: () => void
  service: string | null
}

export default function LoginPopup({ isOpen, onClose, service }: LoginPopupProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleLoginClick = () => {
    onClose() // 팝업 먼저 닫기
    router.push('/login') // 로그인 페이지로 이동
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 팝업 컨텐츠 */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        {/* 경고 아이콘 */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
          로그인이 필요한 서비스입니다
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          {service} 이용을 위해 로그인이 필요합니다
        </p>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            로그인하기
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6"
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  )
} 