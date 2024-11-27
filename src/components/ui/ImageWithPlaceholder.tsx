import React, { useState, useLayoutEffect } from 'react';
import { ImageWithFallback } from '../../types/types';

const ImageWithPlaceholder: React.FC<ImageWithFallback> = ({ src, fallback, alt, width }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setImageLoaded(true);
    }, [src]);

    return (
        <img
            width={width}
            src={imageLoaded ? src : fallback}
            alt={alt}
            onLoad={() => setImageLoaded(true)}
        />
    );
};

export default ImageWithPlaceholder;