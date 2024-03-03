import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ImageGallery from './components/ImageGallery';
import HistoryPage from './pages/HistoryPage';
import {SearchProvider} from "./context/SearchContext";

const App = () => {
    return (
        <SearchProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ImageGallery />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </BrowserRouter>
        </SearchProvider>
    );
};

export default App;
