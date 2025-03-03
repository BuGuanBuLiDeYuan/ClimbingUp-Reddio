import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';

// Contract address and ABI
const CONTRACT_ADDRESS = '0xF4f42791697FDf6cCB2510D806D10fa55811F375';
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

// 添加NFT合约ABI和地址
const NFT_CONTRACT_ADDRESS = '0x643bB080C725917255729E859bCCDF73CB06D76E'; // 部署后替换为实际地址
const NFT_CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "initialOwner",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ERC721EnumerableForbiddenBatchMint",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721IncorrectOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721InsufficientApproval",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidOperator",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721NonexistentToken",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "ERC721OutOfBoundsIndex",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "climbingRecords",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "height",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isAscent",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "meters",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getClimbingRecord",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "height",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isAscent",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "meters",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "mintClimbingNFT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "baseURI",
                "type": "string"
            }
        ],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export const useContract = () => {
    const [currentHeight, setCurrentHeight] = useState<number>(0);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [nftContract, setNftContract] = useState<ethers.Contract | null>(null);
    const [userNFTs, setUserNFTs] = useState<any[]>([]);
    const [showMintModal, setShowMintModal] = useState(false);
    const [pendingNFTData, setPendingNFTData] = useState<any>(null);

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

            // 初始化NFT合约
            const nftContractWithSigner = new ethers.Contract(
                NFT_CONTRACT_ADDRESS,
                NFT_CONTRACT_ABI,
                signer
            );
            setNftContract(nftContractWithSigner);

            // 获取用户的NFT
            await fetchUserNFTs(address);
        } catch (error) {
            console.error("连接钱包失败:", error);
        }
    }, []);

    // 获取用户拥有的NFT
    const fetchUserNFTs = useCallback(async (address: string) => {
        if (!nftContract) return;

        try {
            const balance = await nftContract.balanceOf(address);
            const nfts = [];

            for (let i = 0; i < balance; i++) {
                const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
                const record = await nftContract.getClimbingRecord(tokenId);

                nfts.push({
                    tokenId: tokenId.toString(),
                    height: record.height.toString(),
                    timestamp: new Date(record.timestamp.toNumber() * 1000),
                    isAscent: record.isAscent,
                    meters: record.meters.toString()
                });
            }

            setUserNFTs(nfts);
        } catch (error) {
            console.error("获取NFT失败:", error);
        }
    }, [nftContract]);

    // 监听NFT铸造事件
    useEffect(() => {
        if (!nftContract || !account) return;

        // 临时禁用事件监听，直到我们解决问题
        // const filter = nftContract.filters.NFTMinted(account);
        // ...

        console.log("NFT合约已连接，但事件监听暂时禁用");

        return () => {
            // 清理代码也需要注释掉
        };
    }, [nftContract, account]);

    return {
        currentHeight,
        increaseHeight,
        increaseHeightMultiple,
        decreaseHeight,
        account,
        connectWallet,
        userNFTs,
        showMintModal,
        setShowMintModal,
        pendingNFTData,
        fetchUserNFTs
    };
};