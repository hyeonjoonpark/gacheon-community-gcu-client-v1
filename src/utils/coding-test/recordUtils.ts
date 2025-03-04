import { format, eachDayOfInterval, subDays } from 'date-fns';
import { ProblemRecord } from '@/types/types';

// 임시 데이터 생성 함수
export function generateMockData(): ProblemRecord[] {
  const records: ProblemRecord[] = [];
  const today = new Date();
  
  // 3개월치 데이터 생성 (오늘 포함)
  for (let i = 90; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // 날짜 형식을 YYYY-MM-DD로 포맷팅
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    // 일부 날짜만 문제를 푼 것으로 처리 (70% 확률로 0-5개의 문제)
    const shouldAddProblems = Math.random() < 0.7;
    const count = shouldAddProblems ? Math.floor(Math.random() * 6) : 0;
    
    records.push({
      date: formattedDate,
      count,
    });
  }
  
  return records;
}

// 색상 강도에 따른 Tailwind 클래스 결정 함수
export const getColorClass = (count: number): string => {
  if (count === 0) return 'bg-gray-200';
  if (count === 1) return 'bg-green-200';
  if (count <= 2) return 'bg-green-400';
  if (count <= 4) return 'bg-green-600';
  return 'bg-green-800';
};

// 최대 연속 일수 계산
export const calculateMaxStreak = (records: ProblemRecord[]): number => {
  let maxStreak = 0;
  let currentStreak = 0;
  
  for (const record of records) {
    if (record.count > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  
  return maxStreak;
};

// 현재 연속 일수 계산
export const calculateCurrentStreak = (records: ProblemRecord[]): number => {
  const sortedRecords = [...records].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let currentStreak = 0;
  
  for (const record of sortedRecords) {
    if (record.count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  return currentStreak;
}; 