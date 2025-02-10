'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ClubRecruitment = () => {
  const router = useRouter();
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: '독서 동아리',
      description: '매주 한 권의 책을 읽고 토론하는 모임입니다.',
      capacity: 20,
      currentMembers: 15,
      category: '문화',
      deadline: '2024-04-30'
    },
    // 더 많은 동아리 데이터를 추가할 수 있습니다
  ]);

  const handleCreatePost = () => {
    router.push('/club/new');
  };

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">동아리 모집</h1>
          <button 
            onClick={handleCreatePost}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            모집글 작성하기
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div key={club.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{club.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{club.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>모집인원: {club.capacity}명</span>
                  <span>현재인원: {club.currentMembers}명</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>카테고리: {club.category}</span>
                  <span>마감일: {club.deadline}</span>
                </div>
              </div>
              <button 
                className={`w-full mt-4 py-2 px-4 rounded-md transition-colors ${
                  club.currentMembers >= club.capacity
                    ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                disabled={club.currentMembers >= club.capacity}
              >
                {club.currentMembers >= club.capacity ? '모집 완료' : '신청하기'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubRecruitment;
