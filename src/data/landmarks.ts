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
        description: "The average surface level of Earth's oceans",
        category: "Natural",
    },
    {
        height: 124,
        name: "Statue of Liberty",
        description: "The height of the Statue of Liberty in New York, USA",
        category: "Building",
    },
    {
        height: 324,
        name: "Eiffel Tower",
        description: "The top of the Eiffel Tower in Paris, France",
        category: "Building",
    },
    {
        height: 452,
        name: "Petronas Twin Towers",
        description: "The top of the Petronas Twin Towers in Kuala Lumpur, Malaysia",
        category: "Building",
    },
    {
        height: 828,
        name: "Burj Khalifa",
        description: "The tallest building in the world, located in Dubai, UAE",
        category: "Building",
    },
    {
        height: 1000,
        name: "Typical Paragliding Height",
        description: "A common altitude for paragliding activities",
        category: "Aviation",
    },
    {
        height: 3000,
        name: "Average Cloud Layer",
        description: "The typical height of cumulus clouds",
        category: "Natural",
    },
    {
        height: 8848,
        name: "Mount Everest",
        description: "The highest point on Earth, located in Nepal/China",
        category: "Natural",
    },
    {
        height: 10000,
        name: "Commercial Aircraft Cruising Altitude",
        description: "The typical cruising altitude for passenger jets",
        category: "Aviation",
    },
    {
        height: 35786,
        name: "Geostationary Orbit",
        description: "The altitude where satellites appear stationary relative to Earth",
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

export default landmarks;