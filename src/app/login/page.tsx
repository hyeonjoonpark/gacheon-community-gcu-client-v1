"use client"

import Image from 'next/image'

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google'
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-[480px]">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">로그인</h1>
        
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <Image
            src="/google.svg"
            alt="Google logo"
            width={20}
            height={20}
          />
          Google로 로그인하기
        </button>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          로그인하면 가천대학교 커뮤니티의 모든 기능을 이용할 수 있습니다.
        </p>
      </div>
    </div>
  )
} 