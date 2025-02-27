require("@nomicfoundation/hardhat-ethers");

// 手动读取 .env 文件
const fs = require('fs');
const path = require('path');

let privateKey = "";
try {
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const privateKeyMatch = envContent.match(/PRIVATE_KEY=([^\r\n]+)/);
        if (privateKeyMatch && privateKeyMatch[1]) {
            privateKey = privateKeyMatch[1].trim();
        }
    }
} catch (error) {
    console.warn("无法读取 .env 文件:", error.message);
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.20",
    networks: {
        monad_testnet: {
            url: "https://testnet-rpc.monad.xyz/",
            accounts: [privateKey || process.env.PRIVATE_KEY || ""],
            chainId: 10143,
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    }
};
