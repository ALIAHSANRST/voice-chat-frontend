'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { USER_COLORS } from "@/src/utils/colors";
import { ICON_ASSETS } from "@/src/utils/assets";
import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components";
import { GetExamScript } from "./axios";
import { usePageTitle, useMicrophoneAudioData } from '@/src/hooks';
import { USER_CONTEXT, COMMON_CONTEXT } from '@/src/context';

const WrapperContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 3rem;
  background-color: ${USER_COLORS.FreeExam.Background.Page};
`

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${USER_COLORS.FreeExam.Background.Container};
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 2.25rem 2.25rem 0 2.25rem;
`

const HeadingText = styled.h1`
  font-size: 1.625rem;
  font-weight: 600;
  margin-bottom: 0.875rem;
  color: ${USER_COLORS.FreeExam.Text.Primary};
`

const SubHeadingText = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  color: ${USER_COLORS.FreeExam.Text.Secondary};
`

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`

const ContentContainer = styled.div`
  padding: 2.25rem 2.25rem 0 2.25rem;
  display: flex;
`

const LeftContentContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${USER_COLORS.FreeExam.Border};
  padding: 2.25rem;
`

const FaceMaskImage = styled.img`
  width: 10rem;
  height: 10rem;
  z-index: 1;
`

const RightContentContainer = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  width: '100%';
  padding: 0 0 2.25rem 2.25rem;
`

const ContentTextContainer = styled.div`
  border: 1px solid ${USER_COLORS.FreeExam.TextContainer.Border};
  background-color: ${USER_COLORS.FreeExam.TextContainer.Background};
  padding: 2.25rem;
  border-radius: 1rem;
  width: 100%;
  user-select: none;
`

const ContentText = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${USER_COLORS.FreeExam.TextContainer.PrimaryText};
  filter: none;
  transition: filter 0.3s ease-in-out;
`

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 2.25rem;
  border-top: 1px solid ${USER_COLORS.FreeExam.Border};
`

const ExamPage = () => {
  usePageTitle({ title: 'Free Exam' })
  const router = useRouter();

  const {
    isJoined,
    joinChannel,
    leaveTest,
    error,
  } = useContext(USER_CONTEXT.VoiceContext.AgoraContext);

  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()
  const socket = USER_CONTEXT.SocketContext.useSocket();

  const [isLoadingExamScript, setIsLoadingExamScript] = useState(false);
  const [examScript, setExamScript] = useState(null);
  const [examMeta, setExamMeta] = useState(null);

  const [isCalculatingScore, setIsCalculatingScore] = useState(false);
  const [examResult, setExamResult] = useState(null);

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioData, isReceivingAudio] = useMicrophoneAudioData(mediaRecorder);

  const [processor, setProcessor] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [audioInput, setAudioInput] = useState(null);
  const [isJoiningChannel, setIsJoiningChannel] = useState(false);

  useEffect(() => {
    GetExamScript({ setIsLoadingExamScript, setExamScript, setExamMeta });
  }, []);

  const stopTranscribing = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setMediaRecorder(null);
    }

    if (audioContext && audioContext.state !== 'closed') {
      audioInput?.disconnect();
      processor?.disconnect();
      audioContext.close();
    }
  }

  useEffect(() => {
    if (socket == null) return;

    socket.on('error', errorMessage => {
      console.error('Server Error: ', errorMessage);
    })

    socket.on('examResult', result => {
      setExamResult(result);
      setIsCalculatingScore(false);
    })
  }, [socket]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();

      const audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(audioContextInstance);

      const source = audioContextInstance.createMediaStreamSource(stream);
      setAudioInput(source);

      const scriptProcessor = audioContextInstance.createScriptProcessor(1024, 1, 1);
      setProcessor(scriptProcessor);

      source.connect(scriptProcessor);
      scriptProcessor.connect(audioContextInstance.destination);

      scriptProcessor.onaudioprocess = async (e) => {
        const float32Array = e.inputBuffer.getChannelData(0);
        const int16Array = new Int16Array(float32Array.length);

        for (let i = 0; i < float32Array.length; i++) {
          int16Array[i] = Math.max(-32768, Math.min(32767, Math.floor(float32Array[i] * 32768)));
        }

        socket.emit('audioData', int16Array.buffer);
      };

      socket.emit('startExamTranscription', {
        examScript: examScript,
        ...examMeta,
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const HandleLeaveTest = async () => {
    setIsCalculatingScore(true);
    stopTranscribing();
    await leaveTest();
    socket.emit('leaveTest', currentUser?._id);
  }

  if (isLoadingExamScript) {
    return <COMMON_COMPONENTS.LoaderFullScreen />
  }

  if (isCalculatingScore) {
    return <COMMON_COMPONENTS.LoaderFullScreen message={'Calculating Your Score...'} />
  }

  if (examResult) {
    return (
      <WrapperContainer>
        <MainContainer>
          <HeadingContainer>
            <div>
              <HeadingText>Assessment Result</HeadingText>
              <SubHeadingText>
                Your score is based on your reading speed and comprehension.
              </SubHeadingText>
            </div>
            <IconButton onClick={() => {
              router.push('/user');
            }}>
              <img src={ICON_ASSETS.CLOSE_BUTTON_ICON} alt="close-button" />
            </IconButton>
          </HeadingContainer>
          <ContentContainer style={{ paddingBottom: '2.25rem' }}>
            <ContentTextContainer>
              <ContentText style={{ fontSize: '1.5rem' }}>
                <small>Your Score:</small>
                <span className='ms-2 badge bg-primary'>
                  {examResult?.finalScore} / {examResult?.totalMarks}
                </span>
              </ContentText>
            </ContentTextContainer>
          </ContentContainer>
        </MainContainer>
      </WrapperContainer>
    )
  }

  return (
    <WrapperContainer>
      <MainContainer>
        <HeadingContainer>
          <div>
            <HeadingText>Reading Assessment</HeadingText>
            <SubHeadingText>
              Read the paragraph carefully and get your score based on comprehension and speed.
            </SubHeadingText>
          </div>
          <IconButton onClick={() => {
            HandleLeaveTest();
            router.push('/user');
          }}>
            <img src={ICON_ASSETS.CLOSE_BUTTON_ICON} alt="close-button" />
          </IconButton>
        </HeadingContainer>

        <ContentContainer>
          <LeftContentContainer>
            {
              mediaRecorder &&
              <USER_COMPONENTS.AudioVisualizer.Circular audioData={audioData} isReceivingAudio={isReceivingAudio}>
                <FaceMaskImage src={ICON_ASSETS.FACE_MASK_ICON} alt="face-mask" />
              </USER_COMPONENTS.AudioVisualizer.Circular>
            }
            {
              !mediaRecorder &&
              <FaceMaskImage src={ICON_ASSETS.FACE_MASK_ICON} alt="face-mask" />
            }
          </LeftContentContainer>
          <RightContentContainer>
            <ContentTextContainer>
              {
                examScript &&
                <ContentText style={{ filter: !isJoined ? 'blur(4px)' : 'none' }}>
                  {examScript}
                </ContentText>
              }
              {
                !examScript &&
                <ContentText>
                  No Exam Script Found!<br />
                  Please Try Again Later or Contact Support.
                </ContentText>
              }
            </ContentTextContainer>
          </RightContentContainer>
        </ContentContainer>

        <FooterContainer>
          {error && <p className="text-danger">Error: {error?.message}</p>}
          {!error && (
            <>
              {mediaRecorder ? <USER_COMPONENTS.AudioVisualizer.Bar audioData={audioData} /> : <span></span>}
              <USER_COMPONENTS.Button
                disabled={!examScript}
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
                onClick={isJoined ? HandleLeaveTest : () => {
                  setIsJoiningChannel(true);
                  joinChannel().then(() => {
                    startRecording();
                  }).finally(() => {
                    setIsJoiningChannel(false);
                  });
                }}>
                {
                  isJoiningChannel
                    ? <COMMON_COMPONENTS.Loader color='white' />
                    : isJoined
                      ? "End"
                      : "Start Reading"
                }
              </USER_COMPONENTS.Button>
            </>
          )}
        </FooterContainer>
      </MainContainer>
    </WrapperContainer>
  )
}

export default ExamPage;