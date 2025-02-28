import React, { useState, useEffect } from 'react';
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
import ClimbingVisual from './components/ClimbingVisual';
import Celebration from './components/Celebration';
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
  width: 100%;
  position: relative;
`;

const BottomSection = styled.div`
  flex: 0 0 auto;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const App: React.FC = () => {
  const { currentHeight, account, connectWallet } = useContract();
  const [showWelcome, setShowWelcome] = useState(true);
  const [isClimbing, setIsClimbing] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [prevHeight, setPrevHeight] = useState(0);

  console.log("Current account:", account);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  useEffect(() => {
    if (currentHeight > prevHeight) {
      setIsClimbing(true);

      setTimeout(() => {
        setIsClimbing(false);
        setShowCelebration(true);
      }, 500);
    }

    setPrevHeight(currentHeight);
  }, [currentHeight]);

  useEffect(() => {
    console.log("Current height:", currentHeight);
    console.log("Is climbing:", isClimbing);
  }, [currentHeight, isClimbing]);

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
  };

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
          {account || !showWelcome ? (
            <>
              <ClimbingVisual
                currentHeight={currentHeight}
                isClimbing={isClimbing}
              />
              <HeightDisplay currentHeight={currentHeight} />
            </>
          ) : (
            <Welcome
              connectWallet={connectWallet}
              onClose={handleCloseWelcome}
            />
          )}
        </MiddleSection>

        <BottomSection>
          {account && <Controls />}
        </BottomSection>

        <Footer />
      </ContentContainer>

      <Celebration
        show={showCelebration}
        onComplete={handleCelebrationComplete}
      />
    </AppContainer>
  );
};

export default App;