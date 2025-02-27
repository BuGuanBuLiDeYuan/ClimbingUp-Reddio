import React from 'react';
import styled from 'styled-components';
import { getLandmarkAtHeight, getNearestLandmark } from '../data/landmarks';

const DisplayContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  margin: 2rem auto;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Height = styled.h2`
  font-size: 4rem;
  margin: 0;
  color: #2c3e50;
`;

const LandmarkInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
`;

interface Props {
    currentHeight: number;
}

const HeightDisplay: React.FC<Props> = ({ currentHeight }) => {
    const exactLandmark = getLandmarkAtHeight(currentHeight);
    const nearestLandmark = getNearestLandmark(currentHeight);

    return (
        <DisplayContainer>
            <Height>{currentHeight}m</Height>
            <LandmarkInfo>
                {exactLandmark ? (
                    <p>You've reached: {exactLandmark.name}!</p>
                ) : (
                    <p>
                        Nearest landmark: {nearestLandmark.name} ({nearestLandmark.height}m)
                        <br />
                        {currentHeight < nearestLandmark.height ?
                            `${nearestLandmark.height - currentHeight}m to go!` :
                            `${currentHeight - nearestLandmark.height}m past it!`}
                    </p>
                )}
            </LandmarkInfo>
        </DisplayContainer>
    );
};

export default HeightDisplay;