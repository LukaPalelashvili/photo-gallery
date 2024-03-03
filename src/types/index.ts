export interface Image {
    id: string;
    urls: { small: string; full: string; };
    alt_description?: string;
    downloads?: number; // Assuming these properties exist
    views?: number;
    likes?: number;
}

export interface ImageCache {
    [key: string]: Image[];
}
