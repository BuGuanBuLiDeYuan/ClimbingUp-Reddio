import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';

// Contract address and ABI
const CONTRACT_ADDRESS = '0xb64aF93aeb87BA9d3642B9117559a6a21c2409c8';
const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "currentHeight",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "increaseHeight",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "meters", "type": "uint256" }],
        "name": "increaseHeightMultiple",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "meters", "type": "uint256" }],
        "name": "decreaseHeight",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
        "name": "getContributions",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "name": "climber", "type": "address" },
            { "indexed": false, "name": "newHeight", "type": "uint256" }
        ],
        "name": "HeightIncreased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "name": "climber", "type": "address" },
            { "indexed": false, "name": "newHeight", "type": "uint256" }
        ],
        "name": "HeightDecreased",
        "type": "event"
    }
];

export const useContract = () => {
    const [currentHeight, setCurrentHeight] = useState<number>(0);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [account, setAccount] = useState<string | null>(null);

    // Initialize contract
    useEffect(() => {
        const initContract = async () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                try {
                    // Get provider and signer
                    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                    const accounts = await provider.listAccounts();

                    if (accounts.length > 0) {
                        const signer = provider.getSigner();
                        const contractInstance = new ethers.Contract(
                            CONTRACT_ADDRESS,
                            CONTRACT_ABI,
                            signer
                        );

                        setContract(contractInstance);
                        setAccount(accounts[0]);

                        // Get current height
                        const height = await contractInstance.currentHeight();
                        setCurrentHeight(height.toNumber());

                        // Listen for account changes
                        window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
                            if (newAccounts.length > 0) {
                                setAccount(newAccounts[0]);
                            } else {
                                setAccount(null);
                            }
                        });
                    }
                } catch (error) {
                    console.error("Failed to initialize contract:", error);
                }
            }
        };

        initContract();

        // Cleanup function
        return () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, []);

    // Refresh height periodically
    useEffect(() => {
        if (!contract) return;

        const fetchHeight = async () => {
            try {
                const height = await contract.currentHeight();
                setCurrentHeight(height.toNumber());
            } catch (error) {
                console.error("Failed to fetch height:", error);
            }
        };

        fetchHeight();
        const interval = setInterval(fetchHeight, 10000); // Refresh every 10 seconds

        return () => clearInterval(interval);
    }, [contract]);

    // Increase height
    const increaseHeight = useCallback(async () => {
        if (!contract) {
            console.error("Contract not initialized");
            return;
        }

        try {
            const tx = await contract.increaseHeight();
            await tx.wait();

            // Update height
            const height = await contract.currentHeight();
            setCurrentHeight(height.toNumber());
        } catch (error) {
            console.error("Failed to increase height:", error);
            throw error;
        }
    }, [contract]);

    // Increase height by multiple meters
    const increaseHeightMultiple = useCallback(async (meters: number) => {
        if (!contract) {
            console.error("Contract not initialized");
            return;
        }

        try {
            const tx = await contract.increaseHeightMultiple(meters);
            await tx.wait();

            // Update height
            const height = await contract.currentHeight();
            setCurrentHeight(height.toNumber());
        } catch (error) {
            console.error("Failed to increase height:", error);
            throw error;
        }
    }, [contract]);

    // Decrease height
    const decreaseHeight = useCallback(async (meters: number) => {
        if (!contract) {
            console.error("Contract not initialized");
            return;
        }

        try {
            const value = ethers.utils.parseEther((0.1 * meters / 10).toString());
            const tx = await contract.decreaseHeight(meters, { value });
            await tx.wait();

            // Update height
            const height = await contract.currentHeight();
            setCurrentHeight(height.toNumber());
        } catch (error) {
            console.error("Failed to decrease height:", error);
            throw error;
        }
    }, [contract]);

    // Connect wallet function
    const connectWallet = useCallback(async () => {
        if (typeof window === 'undefined' || !window.ethereum) {
            alert("请安装MetaMask或其他兼容的钱包！");
            return;
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum as any);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);

            // 检查并切换到Reddio Devnet
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xC4A5' }], // 50341 in hex
                });
            } catch (switchError: any) {
                // 如果网络不存在，添加它
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0xC4A5', // 50341 in hex
                                chainName: 'Reddio Devnet',
                                nativeCurrency: {
                                    name: 'RED',
                                    symbol: 'RED',
                                    decimals: 18,
                                },
                                rpcUrls: ['https://reddio-dev.reddio.com'],
                                blockExplorerUrls: ['https://reddio-devnet.l2scan.co'],
                            },
                        ],
                    });
                }
            }

            // 初始化合约
            const contractWithSigner = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );
            setContract(contractWithSigner);

            // 获取当前高度
            const height = await contractWithSigner.currentHeight();
            setCurrentHeight(height.toNumber());
        } catch (error) {
            console.error("连接钱包失败:", error);
        }
    }, []);

    return {
        currentHeight,
        increaseHeight,
        increaseHeightMultiple,
        decreaseHeight,
        account,
        connectWallet
    };
};