"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ProfileCardProps {
  id: string
  department: string
  image?: string
  year: string
  interests: string[]
  introduction: string
  gender: '남자' | '여자'
  onChatClick: () => void
  userGender: '남자' | '여자'
}

const ProfileCard = ({ 
  id, 
  department, 
  image, 
  year, 
  interests, 
  introduction, 
  gender, 
  onChatClick,
  userGender 
}: ProfileCardProps) => {
  const router = useRouter()

  // 채팅 가능 여부 확인
  const canChat = (userGender === '남자' && gender === '여자') || 
                 (userGender === '여자' && gender === '남자')

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <Image
        src={image || '/gachon-building.jpg'}
        alt={department}
        width={100}
        height={100}
        className="w-full h-48 object-cover mb-4"
        style={{ 
          aspectRatio: '1/1',
          objectFit: 'cover'
        }}
      />
      <h3 className="text-xl font-semibold text-center mb-2">{department}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">{year}</p>
      {canChat ? (
        <button
          onClick={onChatClick}
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          채팅하기
        </button>
      ) : (
        <button
          disabled
          className="w-full mt-4 px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
        >
          채팅 불가
        </button>
      )}
    </div>
  )
}

export default ProfileCard 