import React from 'react';
import styled from 'styled-components';
import './App.css';

import Header from './components/Header';
import HeightDisplay from './components/HeightDisplay';
import Controls from './components/Controls';
import WalletConnect from './components/WalletConnect';
import { useContract } from './hooks/useContract';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #2980b9 0%, #3498db 100%);
  position: relative;
`;

const App: React.FC = () => {
    const { currentHeight } = useContract();

    return (
        <AppContainer>
            <Header />
            <WalletConnect />
            <HeightDisplay currentHeight={currentHeight} />
            <Controls />
        </AppContainer>
    );
};

export default App;