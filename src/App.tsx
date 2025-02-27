import React from 'react';
import styled from 'styled-components';
import './App.css';

import Header from './components/Header';
import HeightDisplay from './components/HeightDisplay';
import Controls from './components/Controls';
import WalletConnect from './components/WalletConnect';
import Background from './components/Background';
import Welcome from './components/Welcome';
import Preload from './components/Preload';
import Footer from './components/Footer';
import { useContract } from './hooks/useContract';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const TopSection = styled.div`
  flex: 0 0 auto;
`;

const MiddleSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  
  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

const BottomSection = styled.div`
  flex: 0 0 auto;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const App: React.FC = () => {
  const { currentHeight, account } = useContract();

  return (
    <AppContainer>
      <Preload />
      <Background height={currentHeight} />
      <ContentContainer>
        <TopSection>
          <WalletConnect />
          <Header />
        </TopSection>

        <MiddleSection>
          {account ? (
            <HeightDisplay currentHeight={currentHeight} />
          ) : (
            <Welcome />
          )}
        </MiddleSection>

        <BottomSection>
          <Controls />
        </BottomSection>

        <Footer />
      </ContentContainer>
    </AppContainer>
  );
};

export default App;