import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useContract } from '../hooks/useContract';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
    max-width: 90%;
  }
`;

const Button = styled.button<{ variant: 'climb' | 'descend' }>`
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 600;
  width: 100%;
  background: ${props => props.variant === 'climb'
    ? 'linear-gradient(135deg, #27ae60, #2ecc71)'
    : 'linear-gradient(135deg, #c0392b, #e74c3c)'};
  color: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover:not(:disabled):before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem 2rem;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s ease-in-out infinite;
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
    border-width: 2px;
  }
`;

const StatusMessage = styled.p`
  color: white;
  text-align: center;
  margin: 0.5rem 0;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  animation: ${pulse} 2s infinite;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.7rem;
  }
`;

const ConnectButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 1.1rem;
  }
`;

const Controls: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { increaseHeightMultiple, decreaseHeight, account } = useContract();

  const handleClimb = async () => {
    setIsLoading(true);
    try {
      await increaseHeightMultiple(10); // Climb 10 meters at once
    } catch (error) {
      console.error('Error climbing:', error);
    }
    setIsLoading(false);
  };

  const handleDescend = async () => {
    setIsLoading(true);
    try {
      await decreaseHeight(50); // Descend 50 meters
    } catch (error) {
      console.error('Error descending:', error);
    }
    setIsLoading(false);
  };

  if (!account) {
    // Don't show any content as welcome component has connect button
    return null;
  }

  return (
    <ControlsContainer>
      <Button
        variant="climb"
        onClick={handleClimb}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoadingSpinner /> Processing...
          </>
        ) : (
          'Climb 10m'
        )}
      </Button>
      <Button
        variant="descend"
        onClick={handleDescend}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoadingSpinner /> Processing...
          </>
        ) : (
          'Descend 50m (0.5 $RED)'
        )}
      </Button>
    </ControlsContainer>
  );
};

export default Controls;