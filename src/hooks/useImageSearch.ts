import { useState, useEffect } from 'react';
import { searchImages } from "../services/api";

// Define a type for an image object based on your API response
type Image = {
    id: string;
    urls: { small: string };
    alt_description?: string;
};

// Adjust the useImageSearch hook to include proper typing
const useImageSearch = (query: string): [Image[], React.Dispatch<React.SetStateAction<number>>] => {
    const [images, setImages] = useState<Image[]>([]);
    const [page, setPage] = useState(1);

    // Using `Record` to properly type the cache object
    const cache: Record<string, Image[]> = {};

    useEffect(() => {
        if (!query) return;

        const fetchImages = async () => {
            if (cache[query]) {
                setImages(cache[query]);
            } else {
                const fetchedImages = await searchImages(query, page); // Ensure this function is typed correctly in api.ts
                cache[query] = fetchedImages;
                setImages(fetchedImages);
            }
        };

        fetchImages();
    }, [query, page]);

    return [images, setPage];
};
