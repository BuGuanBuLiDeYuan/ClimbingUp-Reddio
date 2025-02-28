export interface Landmark {
    height: number;
    name: string;
    description: string;
    category: 'Building' | 'Natural' | 'Aviation' | 'Space';
    imageUrl?: string;
}

export const landmarks: Landmark[] = [
    {
        height: -11034,
        name: "Mariana Trench",
        description: "The deepest known point in Earth's oceans",
        category: "Natural",
    },
    {
        height: -431,
        name: "Dead Sea Shore",
        description: "The lowest land elevation on Earth",
        category: "Natural",
    },
    {
        height: 0,
        name: "Sea Level",
        description: "The average surface level of Earth's oceans",
        category: "Natural",
    },
    {
        height: 93,
        name: "Statue of Liberty",
        description: "Height to the torch of the famous statue in New York, USA",
        category: "Building",
    },
    {
        height: 124,
        name: "Great Pyramid of Giza",
        description: "The oldest of the Seven Wonders of the Ancient World, built around 2560 BCE",
        category: "Building",
    },
    {
        height: 169,
        name: "Washington Monument",
        description: "Obelisk on the National Mall in Washington, D.C., USA",
        category: "Building",
    },
    {
        height: 230,
        name: "Capitol Building Dome",
        description: "The dome of the United States Capitol in Washington, D.C.",
        category: "Building",
    },
    {
        height: 301,
        name: "St. Paul's Cathedral",
        description: "Historic Anglican cathedral in London, UK",
        category: "Building",
    },
    {
        height: 324,
        name: "Eiffel Tower",
        description: "The top of the Eiffel Tower in Paris, France",
        category: "Building",
    },
    {
        height: 342,
        name: "St. Louis Gateway Arch",
        description: "Iconic stainless steel arch in Missouri, USA",
        category: "Building",
    },
    {
        height: 381,
        name: "Empire State Building",
        description: "Iconic skyscraper in New York City, USA",
        category: "Building",
    },
    {
        height: 400,
        name: "Stratosphere Tower",
        description: "Observation tower in Las Vegas with thrill rides at the top",
        category: "Building",
    },
    {
        height: 425,
        name: "Kuala Lumpur Tower",
        description: "Telecommunications tower with observation deck in Malaysia",
        category: "Building",
    },
    {
        height: 452,
        name: "Petronas Twin Towers",
        description: "The top of the Petronas Twin Towers in Kuala Lumpur, Malaysia",
        category: "Building",
    },
    {
        height: 470,
        name: "Ostankino Tower",
        description: "Television and radio tower in Moscow, Russia",
        category: "Building",
    },
    {
        height: 492,
        name: "Shanghai World Financial Center",
        description: "Skyscraper with distinctive aperture at the top in Shanghai, China",
        category: "Building",
    },
    {
        height: 509,
        name: "Taipei 101",
        description: "Supertall skyscraper in Taipei, Taiwan",
        category: "Building",
    },
    {
        height: 530,
        name: "CN Tower",
        description: "Communications and observation tower in Toronto, Canada",
        category: "Building",
    },
    {
        height: 553,
        name: "Lotte World Tower",
        description: "Supertall skyscraper in Seoul, South Korea",
        category: "Building",
    },
    {
        height: 580,
        name: "Abraj Al-Bait Clock Tower",
        description: "World's largest clock face on a building in Mecca, Saudi Arabia",
        category: "Building",
    },
    {
        height: 604,
        name: "Canton Tower",
        description: "TV and observation tower in Guangzhou, China",
        category: "Building",
    },
    {
        height: 632,
        name: "Shanghai Tower",
        description: "The second tallest building in the world, located in Shanghai, China",
        category: "Building",
    },
    {
        height: 660,
        name: "Tokyo Skytree",
        description: "Tallest tower in the world, broadcasting and observation tower in Japan",
        category: "Building",
    },
    {
        height: 700,
        name: "Typical Hot Air Balloon Maximum",
        description: "Common maximum altitude for recreational hot air balloon flights",
        category: "Aviation",
    },
    {
        height: 750,
        name: "Ping An Finance Center",
        description: "Supertall skyscraper in Shenzhen, China",
        category: "Building",
    },
    {
        height: 780,
        name: "Tianjin CTF Finance Centre",
        description: "Supertall skyscraper in Tianjin, China",
        category: "Building",
    },
    {
        height: 828,
        name: "Burj Khalifa",
        description: "The tallest building in the world, located in Dubai, UAE",
        category: "Building",
    },
    {
        height: 850,
        name: "Base Jumping Altitude",
        description: "Typical minimum height for base jumping from natural formations",
        category: "Aviation",
    },
    {
        height: 900,
        name: "Jeddah Tower (Planned)",
        description: "Planned skyscraper in Saudi Arabia that would become the world's tallest",
        category: "Building",
    },
    {
        height: 950,
        name: "Hang Gliding Maximum",
        description: "Typical maximum altitude for recreational hang gliding",
        category: "Aviation",
    },
    {
        height: 1000,
        name: "Typical Paragliding Height",
        description: "A common altitude for paragliding activities",
        category: "Aviation",
    },
    {
        height: 1050,
        name: "Tallest TV Tower (Theoretical)",
        description: "Theoretical maximum height for a self-supporting tower with current technology",
        category: "Building",
    },
    {
        height: 1100,
        name: "Cirrus Cloud Base",
        description: "Typical lower boundary of high-altitude cirrus clouds",
        category: "Natural",
    },
    {
        height: 1150,
        name: "Helicopter Maximum Service Ceiling",
        description: "Approximate maximum operational altitude for most helicopters",
        category: "Aviation",
    },
    {
        height: 1200,
        name: "Uluru (Ayers Rock) Visibility",
        description: "Maximum distance from which Australia's famous monolith is visible",
        category: "Natural",
    },
    {
        height: 1250,
        name: "Grand Canyon Depth",
        description: "The maximum depth of the Grand Canyon from rim to river",
        category: "Natural",
    },
    {
        height: 1300,
        name: "Mariana Trench Inverted",
        description: "If the Mariana Trench were a mountain, it would be this tall",
        category: "Natural",
    },
    {
        height: 1345,
        name: "Empire State Building Visibility",
        description: "Maximum distance from which the Empire State Building is visible on a clear day",
        category: "Natural",
    },
    {
        height: 1916,
        name: "Angel Falls",
        description: "The world's highest uninterrupted waterfall, Venezuela",
        category: "Natural",
    },
    {
        height: 2228,
        name: "Burj Khalifa Visibility",
        description: "Maximum distance from which the Burj Khalifa is visible on a clear day",
        category: "Natural",
    },
    {
        height: 2717,
        name: "Cerro Torre",
        description: "One of the most challenging mountains to climb, in Patagonia",
        category: "Natural",
    },
    {
        height: 3000,
        name: "Average Cloud Layer",
        description: "The typical height of cumulus clouds",
        category: "Natural",
    },
    {
        height: 3776,
        name: "Mount Fuji",
        description: "Japan's highest mountain and an active volcano",
        category: "Natural",
    },
    {
        height: 4478,
        name: "Matterhorn",
        description: "Iconic peak in the Alps between Switzerland and Italy",
        category: "Natural",
    },
    {
        height: 4810,
        name: "Mont Blanc",
        description: "The highest mountain in the Alps and Western Europe",
        category: "Natural",
    },
    {
        height: 5199,
        name: "Mount Kenya",
        description: "The highest mountain in Kenya and second-highest in Africa",
        category: "Natural",
    },
    {
        height: 5642,
        name: "Mount Elbrus",
        description: "The highest mountain in Europe, located in Russia",
        category: "Natural",
    },
    {
        height: 5895,
        name: "Mount Kilimanjaro",
        description: "The highest mountain in Africa, located in Tanzania",
        category: "Natural",
    },
    {
        height: 6190,
        name: "Denali (Mount McKinley)",
        description: "The highest mountain peak in North America",
        category: "Natural",
    },
    {
        height: 6962,
        name: "Aconcagua",
        description: "The highest mountain outside of Asia, located in Argentina",
        category: "Natural",
    },
    {
        height: 7500,
        name: "Stratospheric Balloon",
        description: "Typical maximum altitude for weather balloons",
        category: "Aviation",
    },
    {
        height: 8000,
        name: "Death Zone",
        description: "Altitude above which human survival is limited without supplemental oxygen",
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
        height: 11278,
        name: "Concorde Cruising Altitude",
        description: "The typical cruising altitude of the supersonic Concorde aircraft",
        category: "Aviation",
    },
    {
        height: 12000,
        name: "Highest Skydiving Jump",
        description: "Typical altitude for high-altitude skydiving",
        category: "Aviation",
    },
    {
        height: 18000,
        name: "ER-2 Research Aircraft",
        description: "Maximum altitude of NASA's high-altitude research aircraft",
        category: "Aviation",
    },
    {
        height: 20000,
        name: "Top of Stratosphere",
        description: "The boundary between Earth's stratosphere and mesosphere",
        category: "Natural",
    },
    {
        height: 24500,
        name: "Ozone Layer Peak",
        description: "The altitude with the highest concentration of ozone in Earth's atmosphere",
        category: "Natural",
    },
    {
        height: 29029,
        name: "Alan Eustace Jump",
        description: "Highest altitude skydive record set in 2014",
        category: "Aviation",
    },
    {
        height: 38969,
        name: "Felix Baumgartner Jump",
        description: "Red Bull Stratos mission altitude, highest manned balloon flight",
        category: "Aviation",
    },
    {
        height: 50000,
        name: "Top of Mesosphere",
        description: "The boundary between Earth's mesosphere and thermosphere",
        category: "Natural",
    },
    {
        height: 80000,
        name: "Aurora Borealis",
        description: "The typical altitude of the Northern Lights",
        category: "Natural",
    },
    {
        height: 100000,
        name: "Kármán Line",
        description: "The internationally recognized boundary between Earth's atmosphere and outer space",
        category: "Space",
    },
    {
        height: 160000,
        name: "Meteor Burn-up Zone",
        description: "The altitude where most meteors burn up in Earth's atmosphere",
        category: "Space",
    },
    {
        height: 250000,
        name: "Virgin Galactic Flight",
        description: "Approximate maximum altitude of Virgin Galactic's SpaceShipTwo",
        category: "Space",
    },
    {
        height: 330000,
        name: "Blue Origin New Shepard",
        description: "Approximate maximum altitude of Blue Origin's suborbital flights",
        category: "Space",
    },
    {
        height: 408000,
        name: "International Space Station",
        description: "The orbital altitude of the ISS, Earth's largest artificial satellite",
        category: "Space",
    },
    {
        height: 570000,
        name: "Hubble Space Telescope",
        description: "The orbital altitude of the Hubble Space Telescope",
        category: "Space",
    },
    {
        height: 1000000,
        name: "Low Earth Orbit Limit",
        description: "The upper boundary of Low Earth Orbit (LEO)",
        category: "Space",
    },
    {
        height: 35786000,
        name: "Geostationary Orbit",
        description: "The altitude where satellites appear stationary relative to Earth",
        category: "Space",
    },
    {
        height: 384400000,
        name: "Moon Distance",
        description: "The average distance from Earth to the Moon",
        category: "Space",
    },
    {
        height: 150000000000,
        name: "Sun Distance",
        description: "The average distance from Earth to the Sun (1 AU)",
        category: "Space",
    },
    {
        height: 9460730472580800,
        name: "One Light Year",
        description: "The distance light travels in one year",
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