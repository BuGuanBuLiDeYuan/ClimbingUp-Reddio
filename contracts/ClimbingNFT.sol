// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ClimbingNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    
    uint256 private _tokenIdCounter;
    string private _baseTokenURI;
    
    // 记录每个NFT的元数据
    struct ClimbingRecord {
        uint256 height;
        uint256 timestamp;
        bool isAscent; // true为上升，false为下降
        uint256 meters; // 上升或下降的米数
    }
    
    mapping(uint256 => ClimbingRecord) public climbingRecords;
    
    // 在合约中添加事件定义
    event NFTMinted(address indexed to, uint256 indexed tokenId, uint256 height, bool isAscent, uint256 meters);
    
    constructor(address initialOwner) 
        ERC721("ClimbingUp Reddio NFT", "CLIMB") 
        Ownable(initialOwner) 
    {
        _baseTokenURI = "https://your-metadata-server.com/api/token/";
    }
    
    function mintClimbingNFT(
        address to, 
        uint256 height, 
        bool isAscent, 
        uint256 meters
    ) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        
        climbingRecords[tokenId] = ClimbingRecord({
            height: height,
            timestamp: block.timestamp,
            isAscent: isAscent,
            meters: meters
        });
        
        // 触发事件
        emit NFTMinted(to, tokenId, height, isAscent, meters);
        
        return tokenId;
    }
    
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    function getClimbingRecord(uint256 tokenId) external view returns (
        uint256 height,
        uint256 timestamp,
        bool isAscent,
        uint256 meters
    ) {
        require(_exists(tokenId), "Token does not exist");
        ClimbingRecord memory record = climbingRecords[tokenId];
        return (record.height, record.timestamp, record.isAscent, record.meters);
    }
    
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}
