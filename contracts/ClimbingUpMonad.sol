// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ClimbingNFT.sol";

contract ClimbingUpMonad {
    uint256 public currentHeight;
    mapping(address => uint256) public contributions;
    address public owner;
    address public feeReceiver;
    ClimbingNFT public nftContract;
    bool public nftEnabled = false;

    event HeightIncreased(address indexed climber, uint256 newHeight);
    event HeightDecreased(address indexed climber, uint256 newHeight);
    event NFTMinted(address indexed climber, uint256 tokenId, uint256 height, bool isAscent, uint256 meters);

    constructor(address _feeReceiver) {
        owner = msg.sender;
        feeReceiver = _feeReceiver;
    }
    
    function setNFTContract(address _nftContract) external {
        require(msg.sender == owner, "Only owner can set NFT contract");
        nftContract = ClimbingNFT(_nftContract);
        nftEnabled = true;
    }
    
    function toggleNFT(bool _enabled) external {
        require(msg.sender == owner, "Only owner can toggle NFT");
        nftEnabled = _enabled;
    }

    function increaseHeight() external {
        currentHeight += 1;
        contributions[msg.sender] += 1;
        emit HeightIncreased(msg.sender, currentHeight);
        
        // 如果NFT功能已启用，铸造NFT
        if (nftEnabled) {
            uint256 tokenId = nftContract.mintClimbingNFT(msg.sender, currentHeight, true, 1);
            emit NFTMinted(msg.sender, tokenId, currentHeight, true, 1);
        }
    }

    // New function to increase height by multiple meters at once
    function increaseHeightMultiple(uint256 meters) public {
        currentHeight += meters;
        contributions[msg.sender] += meters;
        
        emit HeightIncreased(msg.sender, currentHeight);
        
        // 如果NFT功能已启用，铸造NFT
        if (nftEnabled) {
            uint256 tokenId = nftContract.mintClimbingNFT(msg.sender, currentHeight, true, meters);
            emit NFTMinted(msg.sender, tokenId, currentHeight, true, meters);
        }
    }

    function decreaseHeight(uint256 meters) external payable {
        require(msg.value >= (0.1 ether * meters / 10), "Insufficient RED");
        require(currentHeight >= meters, "Cannot decrease below zero");
        currentHeight -= meters;
        
        (bool success, ) = feeReceiver.call{value: msg.value}("");
        require(success, "Transfer failed");
        
        emit HeightDecreased(msg.sender, currentHeight);
        
        // 如果NFT功能已启用，铸造NFT
        if (nftEnabled) {
            uint256 tokenId = nftContract.mintClimbingNFT(msg.sender, currentHeight, false, meters);
            emit NFTMinted(msg.sender, tokenId, currentHeight, false, meters);
        }
    }

    function getContributions(address user) external view returns (uint256) {
        return contributions[user];
    }

    function setFeeReceiver(address _newReceiver) external {
        require(msg.sender == owner, "Only owner can change fee receiver");
        feeReceiver = _newReceiver;
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}