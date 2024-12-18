import { useState, useRef, useEffect } from 'react';

const useMicrophoneAudioData = (mediaRecorder) => {
  const [audioData, setAudioData] = useState(new Array(5).fill(0));
  const [isReceivingAudio, setIsReceivingAudio] = useState(false);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!mediaRecorder?.stream) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;

    // analyser.fftSize = 32;
    const source = audioContext.createMediaStreamSource(mediaRecorder.stream);
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      const BYTE_MAX_VALUE = 255;
      const sortedFrequencies = [...dataArray].sort((a, b) => b - a).slice(0, 5);

      // Check if we're receiving audio by seeing if any frequencies are above threshold
      const isActive = sortedFrequencies.some(freq => freq > 10);
      setIsReceivingAudio(isActive);

      const processedData = [
        Math.max(0.25, sortedFrequencies[3] / BYTE_MAX_VALUE), // Outer left
        Math.max(0.25, sortedFrequencies[1] / BYTE_MAX_VALUE * 1.5), // Inner left
        Math.max(0.25, sortedFrequencies[0] / BYTE_MAX_VALUE * 2), // Center (amplified)
        Math.max(0.25, sortedFrequencies[2] / BYTE_MAX_VALUE * 1.5), // Inner right
        Math.max(0.25, sortedFrequencies[4] / BYTE_MAX_VALUE)  // Outer right
      ];

      setAudioData(processedData);
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContext.state !== 'closed') {
        source.disconnect();
        audioContext.close();
      }
      setIsReceivingAudio(false);
    };
  }, [mediaRecorder]);

  return [audioData, isReceivingAudio];
};

export default useMicrophoneAudioData;