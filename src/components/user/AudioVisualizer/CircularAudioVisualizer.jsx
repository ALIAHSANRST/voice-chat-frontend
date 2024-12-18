import styled, { keyframes } from 'styled-components';

import { USER_COLORS } from '@/src/utils/colors';
import { HexToRGBA } from '@/src/utils/helpers';

const rippleEffect = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

const CircleContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RippleCircle = styled.div`
  position: absolute;
  width: ${props => 100 + props.intensity * 100}px;
  height: ${props => 100 + props.intensity * 100}px;
  border-radius: 50%;
  background-color: ${props => HexToRGBA(USER_COLORS.FreeExam.AudioVisualizer.RippleColor, true, 0.5 - props.intensity * 0.2)};
  animation: ${rippleEffect} 2s ease-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const CircularAudioVisualizer = ({
  children,
  audioData = [0, 0, 0, 0, 0],
  delay = 0.4,
  isReceivingAudio = false,
  ...props
}) => {
  return (
    <CircleContainer {...props}>
      {
        isReceivingAudio && audioData.map((intensity, i) => (
          <RippleCircle
            key={i}
            delay={i * delay}
            intensity={intensity * 0.75}
          />
        ))
      }
      {children}
    </CircleContainer>
  );
};

export default CircularAudioVisualizer;