import React, { useEffect } from 'react';
import './Modal.css';
import {Image} from "../types"; // Make sure this path is correct

const Modal = ({ image, onClose }: { image: Image | null; onClose: () => void }) => {
    useEffect(() => {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        return () => {
            // Re-enable scrolling
            document.body.style.overflow = '';
        };
    }, []);

    if (!image) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="close-button">
                    <button onClick={onClose}>Close</button>
                </div>
                <img src={image.urls.full} alt={image.alt_description} />
                <div className="image-details">
                    <p>Downloads: {image.downloads}</p>
                    <p>Views: {image.views}</p>
                    <p>Likes: {image.likes}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
