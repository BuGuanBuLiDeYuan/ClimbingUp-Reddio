//import { ethers } from "hardhat";

const { ethers } = require("hardhat");


async function main() {
  const feeReceiver = "0x17018cc802bb1ef12c76b99fbd84c4e665647f3a";


  const ClimbingUpMonad = await ethers.getContractFactory("ClimbingUpMonad");
  const climbingUpMonad = await ClimbingUpMonad.deploy(feeReceiver);

  await climbingUpMonad.waitForDeployment();

  const address = await climbingUpMonad.getAddress();
  console.log(`ClimbingUpMonad deployed to: ${address}`);
  console.log(`Fee receiver set to: ${feeReceiver}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });