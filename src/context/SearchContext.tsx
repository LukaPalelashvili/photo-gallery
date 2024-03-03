import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Image, ImageCache } from '../types';

interface SearchContextProps {
    children: ReactNode;
}

interface SearchContextType {
    searchHistory: string[];
    imageCache: ImageCache;
    addSearchTerm: (term: string) => void;
    cacheImages: (term: string, images: Image[]) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<SearchContextProps> = ({ children }) => {
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [imageCache, setImageCache] = useState<ImageCache>({});

    const addSearchTerm = (term: string) => {
        if (!searchHistory.includes(term)) {
            setSearchHistory((prevHistory) => [...prevHistory, term]);
        }
    };

    const cacheImages = (term: string, images: Image[]) => {
        setImageCache((prevCache) => ({ ...prevCache, [term]: images }));
    };

    return (
        <SearchContext.Provider value={{ searchHistory, imageCache, addSearchTerm, cacheImages }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
