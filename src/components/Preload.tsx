import { useEffect } from 'react';

const preloadImages = [
    '/logo192.png',
    '/logo512.png',
];

const Preload: React.FC = () => {
    useEffect(() => {
        preloadImages.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return null;
};

export default Preload; 