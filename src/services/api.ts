import axios from 'axios';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const baseUrl = 'https://api.unsplash.com';

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Client-ID ${accessKey}` },
});

export const fetchPopularImages = async (page: number, perPage: number = 20) => {
    const response = await apiClient.get(`/photos?per_page=${perPage}&page=${page}`);
    return response.data;
};

export const searchImages = async (query: string, page: number, perPage: number = 20) => {
    const response = await apiClient.get(`/search/photos?query=${query}&per_page=${perPage}&page=${page}`);
    return response.data.results;
};

export const searchImagesByQuery = async (query: string, page: number) => {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query, page, per_page: 20 },
        headers: { Authorization: `Client-ID ${accessKey}` },
    });
    return response.data.results;
};
