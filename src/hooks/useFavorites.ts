import { useState, useEffect } from 'react';
import { College } from '@/types/college';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('favoriteColleges');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    const toggleFavorite = (collegeTitle: string) => {
        const newFavorites = favorites.includes(collegeTitle)
            ? favorites.filter(f => f !== collegeTitle)
            : [...favorites, collegeTitle];
        
        setFavorites(newFavorites);
        localStorage.setItem('favoriteColleges', JSON.stringify(newFavorites));
    };

    return { favorites, toggleFavorite };
}; 