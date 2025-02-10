import { create } from 'zustand'

interface Profile {
  id: string
  department: string
  image: string
  year: string
  interests: string[]
  introduction: string
  gender: '남자' | '여자'
}

interface CCStore {
  profiles: Profile[]
  filter: '전체' | '남자' | '여자'
  departmentFilter: string
  yearFilter: string
  setFilter: (filter: '전체' | '남자' | '여자') => void
  setDepartmentFilter: (department: string) => void
  setYearFilter: (year: string) => void
  filteredProfiles: () => Profile[]
}

const departments = [
  '컴퓨터공학과', '소프트웨어학과', '인공지능학과', '전자공학과',
  '기계공학과', '화학공학과', '산업경영공학과', '도시계획학과',
  '간호학과', '의용생체공학과', '치위생학과', '응급구조학과',
  '경영학과', '글로벌경영학과', '금융수학과', '미디어커뮤니케이션학과'
];

const interests = [
  '코딩', '게임', '음악', '영화', '운동', '여행', '독서',
  '요리', '사진', '그림', '댄스', '노래', '악기', '등산',
  '캠핑', '수영', '테니스', '골프', '스키', '보드'
];

const introductions = [
  '안녕하세요! 취미가 비슷한 친구를 찾고 있어요.',
  '같이 공부하면서 힘이 되어줄 친구를 찾습니다.',
  '취미가 같은 친구와 이야기 나누고 싶어요.',
  '학교생활 함께 즐겁게 할 친구 구해요!',
  '서로의 관심사에 대해 이야기 나눠요.',
  '함께 성장할 수 있는 인연을 찾고 있습니다.',
  '취미 공유하면서 친해질 수 있는 친구 찾아요.',
  '같이 밥 먹고 이야기 나눌 친구 구합니다.'
];

// 더미 데이터 생성 함수
const generateDummyProfiles = (count: number): Profile[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `profile-${i + 1}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    image: `/gachon-building.jpg`,
    year: ['1학년', '2학년', '3학년', '4학년'][Math.floor(Math.random() * 4)],
    interests: [...interests]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 + Math.floor(Math.random() * 3)),
    introduction: introductions[Math.floor(Math.random() * introductions.length)],
    gender: i % 2 === 0 ? '남자' : '여자'
  }))
}

export const useCCStore = create<CCStore>((set, get) => ({
  profiles: generateDummyProfiles(200),
  filter: '전체',
  departmentFilter: '전체',
  yearFilter: '전체',
  
  setFilter: (filter) => set({ filter }),
  setDepartmentFilter: (department) => set({ departmentFilter: department }),
  setYearFilter: (year) => set({ yearFilter: year }),
  
  filteredProfiles: () => {
    const { profiles, filter, departmentFilter, yearFilter } = get()
    return profiles.filter(profile => 
      (filter === '전체' || profile.gender === filter) &&
      (departmentFilter === '전체' || profile.department === departmentFilter) &&
      (yearFilter === '전체' || profile.year === yearFilter)
    )
  }
})) 