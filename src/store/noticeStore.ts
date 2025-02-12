import { create } from 'zustand';

interface NoticeStore {
  isVisible: boolean;
  showModal: boolean;
  setIsVisible: (value: boolean) => void;
  setShowModal: (value: boolean) => void;
}

export const useNoticeStore = create<NoticeStore>((set) => ({
  isVisible: true,
  showModal: false,
  setIsVisible: (value) => set({ isVisible: value }),
  setShowModal: (value) => set({ showModal: value }),
})); 