import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1.1rem;
  opacity: 0.8;
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