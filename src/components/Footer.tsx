import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-top: auto;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  
  @media (max-width: 768px) {
    padding: 15px;
    font-size: 0.8rem;
  }
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <div>© 2025 ClimbingUp@Monad. Created by LongLongLongBTC</div>
                <SocialLinks>
                    <SocialLink href="https://x.com/LongLongLongBTC" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </SocialLink>
                    <SocialLink href="http://t.me/longlonglongbtc" target="_blank" rel="noopener noreferrer">
                        Telegram
                    </SocialLink>
                    <SocialLink href="https://github.com/BuGuanBuLiDeYuan" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </SocialLink>
                </SocialLinks>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer; 