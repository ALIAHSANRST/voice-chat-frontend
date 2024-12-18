import styled from 'styled-components';

import { USER_COLORS } from '@/src/utils/colors';

const AudioBar = styled.div`
  width: 0.5rem;
  min-height: 0.5rem;
  height: ${props => props.height}rem;
  max-height: 2rem;
  background-color: ${USER_COLORS.FreeExam.AudioVisualizer.BarColor};
  border-radius: 0.25rem;
  transition: height 0.1s ease;
`;

const AudioVisualizerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.5rem;
`;

const BarAudioVisualizer = ({ audioData }) => {
  return (
    <AudioVisualizerContainer>
      {audioData.map((height, index) => (
        <AudioBar key={index} height={height * 2} />
      ))}
    </AudioVisualizerContainer>
  );
};

export default BarAudioVisualizer;