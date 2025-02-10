"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoArrowBack } from "react-icons/io5"

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const partnerId = searchParams.get('partnerId')
  const department = searchParams.get('department')
  const year = searchParams.get('year')
  const gender = searchParams.get('gender')
  const [showChatList, setShowChatList] = useState(false)

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="pt-20 flex flex-col h-screen">
      <div className="max-w-4xl mx-auto px-4 w-full">
        {/* 채팅 상대방 정보 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={handleBack}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <IoArrowBack size={20} />
            </button>
            <h2 className="text-xl font-semibold">채팅 상대</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {department} | {year} | {gender}
          </p>
        </div>

        {/* 채팅 메시지 영역 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 h-[500px] overflow-y-auto">
          {/* 여기에 채팅 메시지들이 표시될 예정 */}
        </div>

        {/* 메시지 입력 영역 */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            전송
          </button>
        </div>
      </div>
    </div>
  )
} 