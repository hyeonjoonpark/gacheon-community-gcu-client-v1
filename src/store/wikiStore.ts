import { create } from 'zustand';

interface WikiStore {
  showUpdateModal: boolean;
  showInquiryModal: boolean;
  searchQuery: string;
  showSearchResults: boolean;
  scrollY: number;
  
  setShowUpdateModal: (value: boolean) => void;
  setShowInquiryModal: (value: boolean) => void;
  setSearchQuery: (value: string) => void;
  setShowSearchResults: (value: boolean) => void;
  setScrollY: (value: number) => void;
}

export const useWikiStore = create<WikiStore>((set) => ({
  showUpdateModal: false,
  showInquiryModal: false,
  searchQuery: '',
  showSearchResults: false,
  scrollY: 0,
  
  setShowUpdateModal: (value) => set({ showUpdateModal: value }),
  setShowInquiryModal: (value) => set({ showInquiryModal: value }),
  setSearchQuery: (value) => set({ searchQuery: value }),
  setShowSearchResults: (value) => set({ showSearchResults: value }),
  setScrollY: (value) => set({ scrollY: value }),
})); 