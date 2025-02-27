import React, { useMemo } from 'react';
import styled from 'styled-components';

interface BackgroundProps {
    height: number;
}

// Define height ranges and their corresponding background colors
const heightRanges = [
    { max: 1000, colors: ['#1e3c72', '#2a5298'] }, // Sea level to low altitude
    { max: 3000, colors: ['#2a5298', '#4286f4'] }, // Low to medium altitude
    { max: 8000, colors: ['#4286f4', '#76a5f9'] }, // Medium to high altitude
    { max: 15000, colors: ['#76a5f9', '#b9d1fd'] }, // High altitude to stratosphere
    { max: Infinity, colors: ['#b9d1fd', '#000000'] }  // Stratosphere to space
];

// Cloud component
const Cloud = styled.div<{ top: string; left: string; size: string; opacity: number; speed: number }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: calc(${props => props.size} * 0.6);
  background: rgba(255, 255, 255, ${props => props.opacity});
  border-radius: 50%;
  filter: blur(15px);
  animation: float ${props => props.speed}s linear infinite;
  
  @keyframes float {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(100vw + ${props => props.size}));
    }
  }
  
  &:before, &:after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, ${props => props.opacity});
    border-radius: 50%;
  }
  
  &:before {
    width: 60%;
    height: 80%;
    top: -40%;
    left: 15%;
  }
  
  &:after {
    width: 70%;
    height: 90%;
    top: -20%;
    right: 15%;
  }
`;

const BackgroundContainer = styled.div<{ colors: string[] }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, ${props => props.colors[0]}, ${props => props.colors[1]});
  transition: background 2s ease;
  z-index: 1;
`;

const Background: React.FC<BackgroundProps> = ({ height }) => {
    // Determine background colors based on height
    const colors = useMemo(() => {
        const range = heightRanges.find(range => height <= range.max);
        return range ? range.colors : heightRanges[0].colors;
    }, [height]);

    // Generate clouds based on height
    const clouds = useMemo(() => {
        // More clouds at lower altitudes, fewer at higher altitudes
        const cloudCount = Math.max(10 - Math.floor(height / 1000), 2);
        const cloudArray = [];

        for (let i = 0; i < cloudCount; i++) {
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = `${50 + Math.random() * 100}px`;
            const opacity = 0.3 + Math.random() * 0.4;
            const speed = 20 + Math.random() * 40;

            cloudArray.push(
                <Cloud
                    key={i}
                    top={top}
                    left={left}
                    size={size}
                    opacity={opacity}
                    speed={speed}
                />
            );
        }

        return cloudArray;
    }, [height]);

    return (
        <BackgroundContainer colors={colors}>
            {height < 8000 && clouds}
        </BackgroundContainer>
    );
};

export default Background;
