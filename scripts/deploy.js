// 使用 hardhat 运行时
const hre = require("hardhat");

async function main() {
    console.log("开始部署合约...");

    // 确保 ethers 已加载
    if (!hre.ethers) {
        console.error("ethers 未加载，请检查 hardhat.config.js");
        process.exit(1);
    }

    // 设置接收地址
    const feeReceiver = "0x17018cc802bb1ef12c76b99fbd84c4e665647f3a";
    console.log("接收地址:", feeReceiver);

    try {
        // 获取合约工厂
        const ClimbingUpMonad = await hre.ethers.getContractFactory("ClimbingUpMonad");
        console.log("合约工厂创建成功");

        // 部署合约
        console.log("开始部署 ClimbingUpMonad...");
        const contract = await ClimbingUpMonad.deploy(feeReceiver);

        // 等待部署完成 - 兼容两种版本
        console.log("等待交易确认...");
        if (typeof contract.waitForDeployment === 'function') {
            await contract.waitForDeployment();
            const address = await contract.getAddress();
            console.log("ClimbingUpMonad 已部署到:", address);
        } else {
            await contract.deployed();
            console.log("ClimbingUpMonad 已部署到:", contract.address);
        }

        console.log("接收地址设置为:", feeReceiver);
    } catch (error) {
        console.error("部署过程中出错:", error);
        console.error("错误详情:", error.message);
        if (error.stack) console.error("堆栈跟踪:", error.stack);
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