import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 20px 0;
  color: white;
  margin-top: 60px;
  
  @media (max-width: 768px) {
    padding: 15px 0;
    margin-top: 50px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 0;
    margin-top: 40px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 10px 0 0;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-top: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-top: 5px;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>ClimbingUp@Monad</Title>
      <Subtitle>Climb to new heights on the Monad Testnet!</Subtitle>
    </HeaderContainer>
  );
};

export default Header;