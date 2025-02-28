// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ClimbingUpMonad {
    uint256 public currentHeight;
    mapping(address => uint256) public contributions;
    address public owner;
    address public feeReceiver;

    event HeightIncreased(address indexed climber, uint256 newHeight);
    event HeightDecreased(address indexed climber, uint256 newHeight);

    constructor(address _feeReceiver) {
        owner = msg.sender;
        feeReceiver = _feeReceiver;
    }

    function increaseHeight() external {
        currentHeight += 1;
        contributions[msg.sender] += 1;
        emit HeightIncreased(msg.sender, currentHeight);
    }

    // New function to increase height by multiple meters at once
    function increaseHeightMultiple(uint256 meters) public {
        currentHeight += meters;
        contributions[msg.sender] += meters;
        
        emit HeightIncreased(msg.sender, currentHeight);
    }


    function decreaseHeight(uint256 meters) external payable {
        require(msg.value >= (0.1 ether * meters / 10), "Insufficient RED");
        require(currentHeight >= meters, "Cannot decrease below zero");
        currentHeight -= meters;
        
        (bool success, ) = feeReceiver.call{value: msg.value}("");
        require(success, "Transfer failed");
        
        emit HeightDecreased(msg.sender, currentHeight);
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