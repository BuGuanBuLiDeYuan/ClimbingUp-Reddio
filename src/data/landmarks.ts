export interface Landmark {
    height: number;
    name: string;
    description: string;
    category: 'Building' | 'Natural' | 'Aviation' | 'Space';
    imageUrl?: string;
}

export const landmarks: Landmark[] = [
    {
        height: 0,
        name: "Sea Level",
        description: "Global average sea level",
        category: "Natural",
    },
    {
        height: 124,
        name: "Statue of Liberty",
        description: "New York, USA",
        category: "Building",
    },
    {
        height: 324,
        name: "Eiffel Tower",
        description: "Paris, France",
        category: "Building",
    },
    {
        height: 452,
        name: "Petronas Towers",
        description: "Kuala Lumpur, Malaysia",
        category: "Building",
    },
    {
        height: 828,
        name: "Burj Khalifa",
        description: "Dubai, UAE",
        category: "Building",
    },
    {
        height: 1000,
        name: "Paragliding Height",
        description: "Typical paragliding altitude",
        category: "Aviation",
    },
    {
        height: 3000,
        name: "Average Cloud Level",
        description: "Typical cumulus cloud base",
        category: "Natural",
    },
    {
        height: 8848,
        name: "Mount Everest",
        description: "Nepal/China border",
        category: "Natural",
    },
    {
        height: 10000,
        name: "Commercial Flight Level",
        description: "Typical cruising altitude",
        category: "Aviation",
    },
    {
        height: 35786,
        name: "Geostationary Orbit",
        description: "Communications satellites",
        category: "Space",
    },
];

export const getLandmarkAtHeight = (height: number): Landmark | undefined => {
    return landmarks.find(landmark => landmark.height === height);
};

export const getNearestLandmark = (height: number): Landmark => {
    return landmarks.reduce((prev, curr) => {
        return Math.abs(curr.height - height) < Math.abs(prev.height - height) ? curr : prev;
    });
};