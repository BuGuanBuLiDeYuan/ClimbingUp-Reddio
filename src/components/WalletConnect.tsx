import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

const WalletConnectContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
`;

const WalletButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const WalletAddress = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
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