import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// 撒花动画
const confettiFall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
`;

const CelebrationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  overflow: hidden;
`;

const Confetti = styled.div<{ color: string; left: string; delay: string; size: string }>`
  position: absolute;
  top: -20px;
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: ${props => props.color};
  border-radius: 50%;
  animation: ${confettiFall} 4s ease-out forwards;
  animation-delay: ${props => props.delay};
`;

// 欢呼文字动画
const cheerFade = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const CheerText = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: ${cheerFade} 2s ease-out forwards;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

interface CelebrationProps {
    show: boolean;
    onComplete: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ show, onComplete }) => {
    const [confetti, setConfetti] = useState<React.ReactNode[]>([]);
    const [cheer, setCheer] = useState<string>('');

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const cheers = ['Great Job!', 'Keep Climbing!', 'New Height!', 'Amazing!', 'Higher!', 'Onward!'];

    useEffect(() => {
        if (show) {
            // 生成随机撒花
            const newConfetti = [];
            for (let i = 0; i < 50; i++) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = `${Math.random() * 100}%`;
                const delay = `${Math.random() * 0.5}s`;
                const size = `${Math.random() * 10 + 5}px`;

                newConfetti.push(
                    <Confetti
                        key={i}
                        color={color}
                        left={left}
                        delay={delay}
                        size={size}
                    />
                );
            }
            setConfetti(newConfetti);

            // 随机选择欢呼文字
            setCheer(cheers[Math.floor(Math.random() * cheers.length)]);

            // 动画结束后清理
            const timer = setTimeout(() => {
                setConfetti([]);
                setCheer('');
                onComplete();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!show) return null;

    return (
        <CelebrationContainer>
            {confetti}
            <CheerText>{cheer}</CheerText>
        </CelebrationContainer>
    );
};

export default Celebration;