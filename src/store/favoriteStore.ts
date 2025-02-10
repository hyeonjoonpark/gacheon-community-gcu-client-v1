import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
    favorites: string[];
    toggleFavorite: (collegeTitle: string) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set) => ({
            favorites: [],
            toggleFavorite: (collegeTitle) => 
                set((state) => ({
                    favorites: state.favorites.includes(collegeTitle)
                        ? state.favorites.filter(f => f !== collegeTitle)
                        : [...state.favorites, collegeTitle]
                }))
        }),
        {
            name: 'favorite-storage'
        }
    )
); 