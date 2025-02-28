import React, { useEffect } from 'react';

const Preload: React.FC = () => {
    useEffect(() => {
        const preloadImages = () => {
            const images = ['/climber.png', '/mountain.png'];

            images.forEach(src => {
                const img = new Image();
                img.src = src;
                console.log(`Preloading image: ${src}`);
            });
        };

        preloadImages();
    }, []);

    return null;
};

export default Preload; 