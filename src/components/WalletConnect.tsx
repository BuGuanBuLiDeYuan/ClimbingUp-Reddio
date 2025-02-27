import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

const WalletConnectContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
  
  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
  }
  
  @media (max-width: 480px) {
    position: relative;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
`;

const WalletButton = styled.button`
  background-color: rgba(52, 152, 219, 0.8);
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
    background-color: rgba(41, 128, 185, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const WalletAddress = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 10px;
  border-radius: 50px;
  font-family: monospace;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`;

const WalletConnect: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        // Check if already connected
        const checkConnection = async () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                    const accounts = await provider.listAccounts();

                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }

                    // Listen for account changes
                    window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
                        if (newAccounts.length > 0) {
                            setAccount(newAccounts[0]);
                        } else {
                            setAccount(null);
                        }
                    });
                } catch (error) {
                    console.error("Failed to check connection:", error);
                }
            }
        };

        checkConnection();

        // Cleanup function
        return () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, []);

    const connectWallet = async () => {
        if (typeof window === 'undefined' || !window.ethereum) {
            alert("Please install MetaMask or another compatible wallet!");
            return;
        }

        setIsConnecting(true);

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum as any);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);

            // Check and switch to Monad Testnet
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x279F' }], // 10143 in hex
                });
            } catch (switchError: any) {
                // If the network doesn't exist, add it
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x279F', // 10143 in hex
                                chainName: 'Monad Testnet',
                                nativeCurrency: {
                                    name: 'MONAD',
                                    symbol: 'MON',
                                    decimals: 18,
                                },
                                rpcUrls: ['https://testnet-rpc.monad.xyz/'],
                                blockExplorerUrls: ['https://testnet.monadexplorer.com/'],
                            },
                        ],
                    });
                }
            }
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
    };

    return (
        <WalletConnectContainer>
            {account ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <WalletAddress>
                        {account.substring(0, 6)}...{account.substring(account.length - 4)}
                    </WalletAddress>
                    <WalletButton onClick={disconnectWallet}>Disconnect</WalletButton>
                </div>
            ) : (
                <WalletButton onClick={connectWallet} disabled={isConnecting}>
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </WalletButton>
            )}
        </WalletConnectContainer>
    );
};

export default WalletConnect;