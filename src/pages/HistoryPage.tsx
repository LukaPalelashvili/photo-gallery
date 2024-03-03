import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext'; // Import useSearch hook
import './HistoryPage.css';

const HistoryPage = () => {
    const { searchHistory } = useSearch(); // Use the context

    return (
        <div className="history-container">
            <h2>Search History</h2>
            <ul className="history-list">
                {searchHistory.map((item, index) => (
                    <li key={index} className="history-item">
                        {/* Use Link to initiate a search for this item */}
                        <Link to={`/?search=${item}`} className="history-link">{item}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/" className="back-link">Back to Gallery</Link>
        </div>
    );
};

export default HistoryPage;