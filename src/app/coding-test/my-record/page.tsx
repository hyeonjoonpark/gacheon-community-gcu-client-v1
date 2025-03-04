'use client';

import React, { useState, useEffect } from 'react';
import { ProblemRecord } from '@/types/types';
import { 
  generateMockData, 
  getColorClass, 
  calculateMaxStreak, 
  calculateCurrentStreak 
} from '@/utils/coding-test/recordUtils';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MyRecordPage() {
  const [records, setRecords] = useState<ProblemRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<ProblemRecord[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  
  // 연도 목록 생성 (현재 년도부터 3년 전까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 4}, (_, i) => currentYear - i);
  
  // 월 목록
  const months = [
    {value: 0, label: '1월'}, {value: 1, label: '2월'}, {value: 2, label: '3월'}, 
    {value: 3, label: '4월'}, {value: 4, label: '5월'}, {value: 5, label: '6월'},
    {value: 6, label: '7월'}, {value: 7, label: '8월'}, {value: 8, label: '9월'},
    {value: 9, label: '10월'}, {value: 10, label: '11월'}, {value: 11, label: '12월'}
  ];
  
  useEffect(() => {
    // 실제로는 API에서 데이터를 가져올 것입니다
    const mockData = generateMockData();
    setRecords(mockData);
  }, []);
  
  useEffect(() => {
    if (records.length === 0) return;
    
    // 선택된 연도와 월에 따라 필터링
    const filtered = records.filter(record => {
      const date = new Date(record.date);
      return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
    });
    
    setFilteredRecords(filtered);
  }, [records, selectedYear, selectedMonth]);
  
  // 주차별로 데이터 그룹화 (깃허브 잔디처럼 7일씩 세로로 표시)
  const renderContributionGraph = () => {
    if (filteredRecords.length === 0) return null;
    
    // 날짜를 주 단위로 그룹화
    const weeks: ProblemRecord[][] = [];
    let currentWeek: ProblemRecord[] = [];
    
    for (let i = 0; i < filteredRecords.length; i++) {
      const record = filteredRecords[i];
      const date = new Date(record.date);
      
      // 매주 일요일(0) 시작을 기준으로 새 주 시작
      if (date.getDay() === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentWeek.push(record);
      
      // 마지막 날짜 처리
      if (i === filteredRecords.length - 1) {
        weeks.push(currentWeek);
      }
    }
    
    return (
      <div className="flex gap-[3px] mt-4 mb-4 overflow-x-auto">
        {weeks.map((week, weekIdx) => (
          <div key={`week-${weekIdx}`} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div 
                key={day.date} 
                className={`w-[15px] h-[15px] rounded cursor-pointer ${getColorClass(day.count)}`}
                title={`${day.date}: ${day.count}문제 해결`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  // Chart.js 데이터 준비
  const prepareChartData = () => {
    if (filteredRecords.length === 0) return null;
    
    // 날짜 순으로 정렬
    const sortedRecords = [...filteredRecords].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const labels = sortedRecords.map(record => {
      const date = new Date(record.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    const data = {
      labels,
      datasets: [
        {
          label: '해결한 문제 수',
          data: sortedRecords.map(record => record.count),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1,
        },
      ],
    };
    
    return data;
  };
  
  const chartData = prepareChartData();
  
  return (
    <div className="p-8 max-w-7xl mx-auto dark:bg-gray-900 dark:text-white">
      <h1 className="mb-8 text-3xl text-gray-800 dark:text-gray-100 font-bold">나의 코딩 문제 해결 기록</h1>
      
      {/* 필터링 컨트롤 */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="text-gray-700 dark:text-gray-300">연도:</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-3 py-1"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <label htmlFor="month-select" className="text-gray-700 dark:text-gray-300">월:</label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded px-3 py-1"
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex gap-6 mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex-1 text-center shadow">
          <h3 className="text-base mb-2 text-gray-600 dark:text-gray-300">총 해결 문제</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{filteredRecords.reduce((sum, record) => sum + record.count, 0)}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex-1 text-center shadow">
          <h3 className="text-base mb-2 text-gray-600 dark:text-gray-300">최대 연속일</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{calculateMaxStreak(records)}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex-1 text-center shadow">
          <h3 className="text-base mb-2 text-gray-600 dark:text-gray-300">현재 연속일</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{calculateCurrentStreak(records)}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">문제 해결 기록</h2>
        {renderContributionGraph()}
        <div className="flex items-center gap-3 mt-4 text-sm text-gray-600 dark:text-gray-300">
          <span>기여도: </span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700"></div>
            <span>0문제</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-200"></div>
            <span>1문제</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-400"></div>
            <span>2문제</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-600"></div>
            <span>3-4문제</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-800"></div>
            <span>5문제 이상</span>
          </div>
        </div>
      </div>
      
      {/* 차트 추가 */}
      {chartData && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">일별 문제 해결 추이</h2>
          <div className="h-80">
            <Line 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0,
                      color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : undefined
                    },
                    grid: {
                      color: document.documentElement.classList.contains('dark') ? '#374151' : undefined
                    }
                  },
                  x: {
                    ticks: {
                      color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : undefined
                    },
                    grid: {
                      color: document.documentElement.classList.contains('dark') ? '#374151' : undefined
                    }
                  }
                },
                plugins: {
                  legend: {
                    labels: {
                      color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : undefined
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
