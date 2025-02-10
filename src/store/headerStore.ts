import { create } from 'zustand';

interface HeaderStore {
  pathname: string;
  setPathname: (path: string) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  pathname: '/',
  setPathname: (path) => set({ pathname: path }),
})); 