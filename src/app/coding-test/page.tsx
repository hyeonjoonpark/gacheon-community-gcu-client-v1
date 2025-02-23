'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CodingTestPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black">
      {/* 배경에 코드 이미지 오버레이 효과 */}
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('/code-background.jpg')`
        }}
      />

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-start justify-center min-h-screen max-w-2xl">
          {/* 헤더 텍스트 */}
          <h2 className="text-gray-600 dark:text-gray-200 mb-4 text-xl">실시간 코딩 경쟁</h2>
          
          {/* 메인 타이틀 */}
          <h1 className="text-gray-900 dark:text-white text-4xl font-bold mb-6">
            일반적인 문제풀이 뿐만 아니라
            <br />
            아이템을 이용한 스릴 넘치는 코딩 경기
          </h1>

          {/* 서브 텍스트 */}
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            재미있고 다양한 아이템으로 상대방을 방해해서 이겨보자!
          </p>

          {/* 시작하기 버튼 */}
          <Link href="/coding-test/problems">
            <Button 
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-8"
            >
              게임 바로가기
            </Button>
          </Link>
        </div>
      </div>

      {/* 메인 컨텐츠 아래에 통계 섹션 추가 */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl text-gray-900 dark:text-white mb-4">
            인서트 온라인 저지에서 온라인으로 상대방과 코딩 경쟁을 할 수 있습니다
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">00000+</h3>
            <p className="text-gray-600 dark:text-gray-400">전체 문제 수</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">00000</h3>
            <p className="text-gray-600 dark:text-gray-400">풀린 문제 수</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">미공개</h3>
            <p className="text-gray-600 dark:text-gray-400">현재 개인 순위</p>
          </div>
          
          <div className="text-center">
            <h3 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">6</h3>
            <p className="text-gray-600 dark:text-gray-400">채점 가능한 언어</p>
          </div>
        </div>
      </div>
    </div>
  )
} 