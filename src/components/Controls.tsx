import React, { useState } from 'react';
import styled from 'styled-components';
import { useContract } from '../hooks/useContract';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const Button = styled.button<{ variant: 'climb' | 'descend' }>`
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  width: 100%;
  background: ${props => props.variant === 'climb' ? '#27ae60' : '#c0392b'};
  color: white;
  transition: opacity 0.2s;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const StatusMessage = styled.p`
  color: white;
  text-align: center;
  margin: 0.5rem 0;
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
        return (
            <ControlsContainer>
                <StatusMessage>Please connect your wallet to participate</StatusMessage>
            </ControlsContainer>
        );
    }

    return (
        <ControlsContainer>
            <Button
                variant="climb"
                onClick={handleClimb}
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Climb 10m'}
            </Button>
            <Button
                variant="descend"
                onClick={handleDescend}
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Descend 50m (0.5 MON)'}
            </Button>
        </ControlsContainer>
    );
};

export default Controls;