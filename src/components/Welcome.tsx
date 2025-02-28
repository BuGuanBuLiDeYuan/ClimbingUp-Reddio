import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useContract } from '../hooks/useContract';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const WelcomeContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 90%;
  margin: 0 auto;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 30px;
    width: 95%;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    width: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 18px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: rotate(90deg);
  }
  
  &:focus {
    outline: none;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: white;
  line-height: 1.6;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FeatureList = styled.ul`
  text-align: left;
  margin: 0 auto 30px;
  max-width: 500px;
  color: white;
`;

const Feature = styled.li`
  margin-bottom: 10px;
  font-size: 1.1rem;
  
  @media (max-width: 480px) {
    font-size: 1rem;
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
  animation: ${pulse} 2s infinite;
  
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

interface WelcomeProps {
  connectWallet: () => Promise<void>;
  onClose?: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ connectWallet, onClose }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <WelcomeContainer>
      <CloseButton onClick={handleClose}>×</CloseButton>
      <Title>Join the Climbing Adventure!</Title>
      <Description>
        Welcome to ClimbingUp@Reddio, where the sky is not the limit! This is a
        collaborative experiment on the Reddio Testnet where everyone can
        contribute to reaching new heights together.
      </Description>

      <FeatureList>
        <Feature>🧗‍♀️ Climb 10 meters with each transaction</Feature>
        <Feature>🏔️ Pass famous landmarks as we ascend together</Feature>
        <Feature>🌐 Be part of a global community effort</Feature>
        <Feature>🚀 Explore the capabilities of Reddio's fast blockchain</Feature>
      </FeatureList>

      <Description>
        How high can we go? Connect your wallet and help us find out!
      </Description>

      <ConnectButton onClick={connectWallet}>
        Connect Wallet to Start Climbing
      </ConnectButton>
    </WelcomeContainer>
  );
};

export default Welcome; 