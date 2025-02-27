import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import landmarks from '../data/landmarks';

interface HeightDisplayProps {
  currentHeight: number;
}

// Animation for height change
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const HeightDisplayContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
  margin: 0 auto;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    width: 95%;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    width: 100%;
  }
`;

const HeightValue = styled.h1<{ animate: boolean }>`
  font-size: 8rem;
  font-weight: 700;
  margin: 0;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: ${props => props.animate ? pulse : 'none'} 0.5s ease;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const HeightUnit = styled.span`
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const LandmarkInfo = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  color: white;
  
  @media (max-width: 480px) {
    padding: 10px;
    margin-top: 15px;
  }
`;

const LandmarkTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const LandmarkDescription = styled.p`
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const HeightDisplay: React.FC<HeightDisplayProps> = ({ currentHeight }) => {
  const [animate, setAnimate] = useState(false);
  const [prevHeight, setPrevHeight] = useState(currentHeight);

  // Find nearest landmark
  const nearestLandmark = React.useMemo(() => {
    // Sort landmarks by how close they are to current height
    const sorted = [...landmarks].sort((a, b) => {
      return Math.abs(a.height - currentHeight) - Math.abs(b.height - currentHeight);
    });

    return sorted[0];
  }, [currentHeight]);

  // Trigger animation when height changes
  useEffect(() => {
    if (currentHeight !== prevHeight) {
      setAnimate(true);
      setPrevHeight(currentHeight);

      const timer = setTimeout(() => {
        setAnimate(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentHeight, prevHeight]);

  // Calculate distance to landmark
  const distanceToLandmark = nearestLandmark
    ? Math.abs(nearestLandmark.height - currentHeight)
    : 0;

  const isPast = currentHeight > (nearestLandmark?.height || 0);

  return (
    <HeightDisplayContainer>
      <HeightValue animate={animate}>
        {currentHeight}<HeightUnit>m</HeightUnit>
      </HeightValue>

      {nearestLandmark && (
        <LandmarkInfo>
          <LandmarkTitle>
            Nearest landmark: {nearestLandmark.name} ({nearestLandmark.height}m)
          </LandmarkTitle>
          <LandmarkDescription>
            {distanceToLandmark}m {isPast ? 'past' : 'to go'}!
          </LandmarkDescription>
        </LandmarkInfo>
      )}
    </HeightDisplayContainer>
  );
};

export default HeightDisplay;