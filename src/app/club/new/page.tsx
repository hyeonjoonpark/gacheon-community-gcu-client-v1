'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewClubPost = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 마감일 입력 시 년도를 4자리로 제한
    if (name === 'deadline') {
      const datePattern = /^\d{0,4}(-\d{0,2})?(-\d{0,2})?$/;
      if (!datePattern.test(value)) {
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출하여 데이터 저장
    router.push('/club');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">동아리 모집글 작성</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">동아리 이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">설명</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md h-32 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">모집 인원</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">카테고리</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              required
            >
              <option value="">카테고리 선택</option>
              <option value="문화">문화</option>
              <option value="스포츠">스포츠</option>
              <option value="학술">학술</option>
              <option value="봉사">봉사</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">마감일</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            min={new Date().toISOString().split('T')[0]}  // 오늘 날짜 이후만 선택 가능
            max="9999-12-31"  // 최대 년도를 9999년으로 제한
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            작성 완료
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewClubPost;
