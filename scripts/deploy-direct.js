// 直接使用 ethers 而不是通过 hardhat-ethers 插件
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("开始直接部署合约...");

    // 读取私钥
    let privateKey = "";
    try {
        const envPath = path.resolve(__dirname, "../.env");
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, "utf8");
            const privateKeyMatch = envContent.match(/PRIVATE_KEY=([^\r\n]+)/);
            if (privateKeyMatch && privateKeyMatch[1]) {
                privateKey = privateKeyMatch[1].trim();
            }
        }
    } catch (error) {
        console.error("无法读取 .env 文件:", error.message);
        process.exit(1);
    }

    if (!privateKey) {
        console.error("未找到私钥，请确保 .env 文件中包含 PRIVATE_KEY=你的私钥");
        process.exit(1);
    }

    // 添加 0x 前缀（如果没有）
    if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
    }

    // 设置接收地址
    const feeReceiver = "0x17018cc802bb1ef12c76b99fbd84c4e665647f3a";
    console.log("接收地址:", feeReceiver);

    try {
        // 创建 provider
        const provider = new ethers.providers.JsonRpcProvider("https://testnet-rpc.monad.xyz/");
        console.log("已连接到 Monad 测试网");

        // 创建钱包
        const wallet = new ethers.Wallet(privateKey, provider);
        console.log("钱包地址:", wallet.address);

        // 读取合约 ABI 和字节码
        const contractPath = path.resolve(__dirname, "../artifacts/contracts/ClimbingUpMonad.sol/ClimbingUpMonad.json");
        const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));

        // 创建合约工厂
        const factory = new ethers.ContractFactory(
            contractJson.abi,
            contractJson.bytecode,
            wallet
        );
        console.log("合约工厂创建成功");

        // 部署合约
        console.log("开始部署 ClimbingUpMonad...");
        const contract = await factory.deploy(feeReceiver);

        // 等待部署完成
        console.log("等待交易确认...");
        await contract.deployed();

        console.log("ClimbingUpMonad 已部署到:", contract.address);
        console.log("接收地址设置为:", feeReceiver);
    } catch (error) {
        console.error("部署过程中出错:", error);
        console.error("错误详情:", error.message);
        process.exit(1);
    }
}

// 执行主函数
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("部署出错:", error);
        process.exit(1);
    });