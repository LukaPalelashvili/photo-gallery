import React, { useState, useEffect, useCallback } from 'react';
import { fetchPopularImages, searchImagesByQuery } from '../services/api';
import Modal from './Modal';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import './ImageGallery.css';
import {Image} from "../types";

function useDebounce(value: any, delay: any) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ImageGallery = () => {
    const { addSearchTerm, cacheImages, imageCache, searchHistory } = useSearch();
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [page, setPage] = useState(1);
    const queryParam = useQuery().get('search') || '';
    const [searchQuery, setSearchQuery] = useState(queryParam);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [isLoading, setIsLoading] = useState(false);

    const loadImages = useCallback(async () => {
        setIsLoading(true);
        let fetchedImages: Image[] = [];

        if (debouncedSearchQuery) {
            if (imageCache[debouncedSearchQuery] && page === 1) {
                fetchedImages = imageCache[debouncedSearchQuery];
            } else {
                fetchedImages = await searchImagesByQuery(debouncedSearchQuery, page);
                cacheImages(debouncedSearchQuery, fetchedImages); // Cache new fetched images
            }
            // Ensure search term is added once per unique search (not on every page load)
            if (page === 1 && !searchHistory.includes(debouncedSearchQuery)) {
                addSearchTerm(debouncedSearchQuery);
            }
        } else {
            fetchedImages = await fetchPopularImages(page);
        }

        setImages(prev => page === 1 ? fetchedImages : [...prev, ...fetchedImages]);
        setIsLoading(false);
    }, [debouncedSearchQuery, page, addSearchTerm, cacheImages, imageCache, searchHistory]);


    useEffect(() => {
        setPage(1);
    }, [debouncedSearchQuery]);

    useEffect(() => {
        loadImages();
    }, [debouncedSearchQuery, page, loadImages]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isLoading) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    useEffect(() => {
        setSearchQuery(queryParam);
    }, [queryParam]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px', margin: '10px 0', fontSize: '16px' }}
            />
            <Link to="/history" style={{ display: 'block', marginTop: '20px', textDecoration: 'none', color: 'blue', textAlign: 'center' }}>View History</Link>

            <div className="image-gallery">
                {images.map((image, index) => (
                    <img key={index} src={image.urls.small} alt={image.alt_description || 'Image'} onClick={() => setSelectedImage(image)} />
                ))}
            </div>
            {selectedImage && <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />}
            {isLoading && <p>Loading more images...</p>}
        </div>
    );
};

export default ImageGallery;
