import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CommunityStore {
  currentTab: string;
  currentPage: number;
  searchQuery: string;
  setCurrentTab: (tab: string) => void;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
}

export const useCommunityStore = create<CommunityStore>()(
  persist(
    (set) => ({
      currentTab: 'free',
      currentPage: 1,
      searchQuery: '',
      setCurrentTab: (tab) => set({ currentTab: tab }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setSearchQuery: (query) => set({ searchQuery: query })
    }),
    {
      name: 'community-store'
    }
  )
);
