import React from 'react';
import styled from 'styled-components';
import { useContract } from '../hooks/useContract';

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WalletButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

const WalletAddress = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 15px;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-right: 10px;
  backdrop-filter: blur(5px);
`;

const ConnectedContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DisconnectButton = styled.button`
  background-color: rgba(255, 100, 100, 0.2);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.8rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 100, 100, 0.4);
  }
`;

const WalletConnect: React.FC = () => {
    const { account, connectWallet } = useContract();

    const shortenAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <WalletContainer>
            {account ? (
                <ConnectedContainer>
                    <WalletAddress>{shortenAddress(account)}</WalletAddress>
                    <DisconnectButton onClick={() => window.location.reload()}>
                        Disconnect
                    </DisconnectButton>
                </ConnectedContainer>
            ) : (
                <WalletButton onClick={connectWallet}>
                    Connect Wallet
                </WalletButton>
            )}
        </WalletContainer>
    );
};

export default WalletConnect;