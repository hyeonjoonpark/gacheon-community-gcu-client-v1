'use client'

import React from 'react';

const CompetitionPage = () => {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 헤더 섹션 */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            코딩 테스트 대회
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
            진행중
          </span>
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            남은 시간: 02:30:00
          </span>
        </div>
      </div>

      {/* 문제 목록 */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <span className="w-16 font-semibold text-gray-900 dark:text-gray-100">1번</span>
          <span className="flex-1 text-gray-900 dark:text-gray-100">두 수의 합</span>
          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
            해결
          </span>
        </div>
        <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <span className="w-16 font-semibold text-gray-900 dark:text-gray-100">2번</span>
          <span className="flex-1 text-gray-900 dark:text-gray-100">배열 정렬하기</span>
          <span className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm">
            시도중
          </span>
        </div>
      </div>

      {/* 통계 섹션 */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            참가자 수
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            1,234명
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            제출
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            5,678
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            정답률
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            45.6%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionPage;
