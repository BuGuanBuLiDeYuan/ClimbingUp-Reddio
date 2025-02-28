import React from 'react';
import styled, { keyframes } from 'styled-components';

const climb = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ClimberContainer = styled.div`
  position: absolute;
  bottom: 35%;
  left: 15%;
  transform: translateX(-50%);
  z-index: 15;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    bottom: 40%;
  }
`;

const Climber = styled.div<{ isClimbing: boolean }>`
  width: 100%;
  height: 100%;
  background-image: url('/climber.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${props => props.isClimbing ? climb : 'none'} 0.5s ease-in-out;
`;

const MountainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; // 放到最底层，但在Background组件之上
  pointer-events: none;
`;

// 修改山峰样式，确保完整显示
const Mountain = styled.div<{ height: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/mountain.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  opacity: 0.4; // 降低不透明度，让它与背景融合
  transform: translateY(${props => Math.min(Math.max(0, 100 - props.height / 100), 100)}%);
  transition: transform 1s ease-out;
`;

interface ClimbingVisualProps {
    currentHeight: number;
    isClimbing: boolean;
}

const ClimbingVisual: React.FC<ClimbingVisualProps> = ({ currentHeight, isClimbing }) => {
    return (
        <>
            <MountainContainer>
                <Mountain height={currentHeight} />
            </MountainContainer>
            <ClimberContainer>
                <Climber isClimbing={isClimbing} />
            </ClimberContainer>
        </>
    );
};

export default ClimbingVisual;