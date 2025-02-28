import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// 添加 NFT 合约地址常量
const NFT_CONTRACT_ADDRESS = '0x643bB080C725917255729E859bCCDF73CB06D76E'; // 部署后替换为实际地址

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const NFTImage = styled.div`
  width: 250px;
  height: 250px;
  margin: 0 auto 20px;
  border-radius: 15px;
  background: url('/nft-template.jpg') center/cover;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(52, 152, 219, 0.7), rgba(155, 89, 182, 0.7));
    border-radius: 15px;
    opacity: 0.6;
  }
`;

const NFTDetails = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #3498db, #9b59b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Detail = styled.p`
  font-size: 1.1rem;
  margin: 8px 0;
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ViewButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
  text-decoration: none;
  padding: 12px 25px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  margin-left: 10px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

interface NFTMintModalProps {
    show: boolean;
    onClose: () => void;
    nftData: {
        tokenId: string;
        height: string;
        isAscent: boolean;
        meters: string;
    } | null;
}

const NFTMintModal: React.FC<NFTMintModalProps> = ({ show, onClose, nftData }) => {
    if (!nftData) return null;

    const explorerUrl = `https://reddio-devnet.l2scan.co/token/${NFT_CONTRACT_ADDRESS}?a=${nftData.tokenId}`;

    return (
        <AnimatePresence>
            {show && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <ModalContent
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", damping: 15 }}
                    >
                        <Title>NFT 铸造成功！</Title>
                        <NFTImage />
                        <NFTDetails>
                            <Detail><strong>Token ID:</strong> #{nftData.tokenId}</Detail>
                            <Detail><strong>高度记录:</strong> {nftData.height} 米</Detail>
                            <Detail><strong>操作类型:</strong> {nftData.isAscent ? '上升' : '下降'}</Detail>
                            <Detail><strong>变化米数:</strong> {nftData.meters} 米</Detail>
                            <Detail><strong>时间:</strong> {new Date().toLocaleString()}</Detail>
                        </NFTDetails>
                        <div>
                            <CloseButton onClick={onClose}>关闭</CloseButton>
                            <ViewButton href={explorerUrl} target="_blank" rel="noopener noreferrer">
                                查看NFT
                            </ViewButton>
                        </div>
                    </ModalContent>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
};

export default NFTMintModal;
