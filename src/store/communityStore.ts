import { create } from 'zustand';

interface CommunityStore {
  currentTab: string;
  searchQuery: string;
  setCurrentTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useCommunityStore = create<CommunityStore>((set) => ({
  currentTab: 'free',
  searchQuery: '',
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
