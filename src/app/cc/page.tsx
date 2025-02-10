"use client"

import { useCCStore } from '@/store/ccStore'
import { useEffect, useRef, useState } from 'react'
import { useChatStore } from '@/store/chatStore'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

// ProfileCard도 dynamic import로 변경
const ProfileCard = dynamic(() => import('@/components/ProfileCard'), {
  ssr: false
})

interface ChatPartner {
  id: string
  department: string
  year: string
  gender: string
  lastMessage?: string
  lastMessageTime?: string
}

const ITEMS_PER_PAGE = 9; // 한 번에 로드할 프로필 수

const departments = [
  '컴퓨터공학과', '소프트웨어학과', '인공지능학과', '전자공학과',
  '기계공학과', '화학공학과', '산업경영공학과', '도시계획학과',
  '간호학과', '의용생체공학과', '치위생학과', '응급구조학과',
  '경영학과', '글로벌경영학과', '금융수학과', '미디어커뮤니케이션학과'
];

export default function CCPage() {
  const router = useRouter()
  const { 
    filter, 
    setFilter, 
    departmentFilter,
    setDepartmentFilter,
    yearFilter,
    setYearFilter,
    filteredProfiles 
  } = useCCStore()
  const { chatRooms } = useChatStore()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef(null)
  const [showChatList, setShowChatList] = useState(false)

  const profiles = filteredProfiles()
  const displayedProfiles = profiles.slice(0, page * ITEMS_PER_PAGE)

  // localStorage에서 채팅 목록을 가져오거나 초기화
  const [chatPartners, setChatPartners] = useState<ChatPartner[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatPartners')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  // 채팅 목록이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('chatPartners', JSON.stringify(chatPartners))
  }, [chatPartners])

  // 새로운 채팅 파트너 추가 함수
  const addChatPartner = (profile: {
    id: string
    department: string
    year: string
    gender: string
  }) => {
    // 이미 존재하는 채팅인지 확인
    const existingPartner = chatPartners.find(partner => partner.id === profile.id)
    
    if (!existingPartner) {
      const newPartner: ChatPartner = {
        ...profile,
        lastMessage: '새로운 채팅이 시작되었습니다.',
        lastMessageTime: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      setChatPartners(prev => [newPartner, ...prev])
    }
    
    // 채팅방으로 이동
    router.push(`/cc/chat?partnerId=${profile.id}&department=${profile.department}&year=${profile.year}&gender=${profile.gender}`)
  }

  const handlePartnerClick = (partner: ChatPartner) => {
    router.push(`/cc/chat?partnerId=${partner.id}&department=${partner.department}&year=${partner.year}&gender=${partner.gender}`)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1)
          if (page * ITEMS_PER_PAGE >= profiles.length) {
            setHasMore(false)
          }
        }
      },
      { threshold: 1.0 }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect()
  }, [hasMore, page, profiles.length])

  // 필터 변경 시 페이지 리셋
  useEffect(() => {
    setPage(1)
    setHasMore(true)
  }, [filter])

  // 열린 채팅방만 필터링 (메시지 유무와 관계없이)
  const openChats = Object.values(chatRooms).filter(room => room.isOpen)

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">가천CC</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            글쓰기
          </button>
        </div>
        {/* 채팅 목록 토글 버튼 */}
        <button
          onClick={() => setShowChatList(!showChatList)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          채팅 목록 {showChatList ? '닫기' : '열기'}
        </button>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* 필터 섹션 */}
          <div className="flex flex-col gap-4 mb-8">
            {/* 성별 필터 */}
            <div className="flex justify-center gap-4">
              {['전체', '남자', '여자'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option as '전체' | '남자' | '여자')}
                  className={`px-4 py-2 rounded-full ${
                    filter === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* 학과 필터 */}
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setDepartmentFilter('전체')}
                className={`px-4 py-2 rounded-full ${
                  departmentFilter === '전체'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                전체 학과
              </button>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setDepartmentFilter(dept)}
                  className={`px-4 py-2 rounded-full ${
                    departmentFilter === dept
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* 학년 필터 */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setYearFilter('전체')}
                className={`px-4 py-2 rounded-full ${
                  yearFilter === '전체'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                전체 학년
              </button>
              {['1학년', '2학년', '3학년', '4학년'].map((year) => (
                <button
                  key={year}
                  onClick={() => setYearFilter(year)}
                  className={`px-4 py-2 rounded-full ${
                    yearFilter === year
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* 프로필 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                {...profile}
                userGender="남자"  // 또는 실제 사용자 성별
                onChatClick={() => addChatPartner(profile)}
              />
            ))}
          </div>

          {/* 로더 */}
          {hasMore && (
            <div ref={loader} className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {/* 채팅 목록 사이드바 */}
        {showChatList && (
          <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg p-4 overflow-y-auto z-40">
            <h2 className="text-xl font-semibold mb-4 mt-12">채팅 목록</h2>
            <div className="space-y-2">
              {chatPartners.map((partner) => (
                <div
                  key={partner.id}
                  onClick={() => handlePartnerClick(partner)}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div className="font-medium">{partner.department}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {partner.year} | {partner.gender}
                  </div>
                  {partner.lastMessage && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex justify-between">
                      <span>{partner.lastMessage}</span>
                      <span>{partner.lastMessageTime}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
