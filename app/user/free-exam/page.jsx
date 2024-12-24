'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import styled from "styled-components";

import ExamResult from './ExamResult';
import SignInModal from './SignIn.modal';
import { GetExamScript } from "./axios";
import { USER_COLORS } from "@/src/utils/colors";
import { ICON_ASSETS } from "@/src/utils/assets";
import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components";
import { usePageTitle, useMicrophoneAudioData } from '@/src/hooks';
import { USER_CONTEXT, COMMON_CONTEXT } from '@/src/context';
import { ROUTES } from '@/src/utils/routes';
import { GenerateRandomText } from '@/src/utils/helpers';

const WrapperContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 3rem;
  background-color: ${USER_COLORS.FreeExam.Background.Page};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${USER_COLORS.FreeExam.Background.Container};
`

const ResultMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 6rem);
  border-radius: 1rem;
  padding: 3rem;
  background-color: ${USER_COLORS.FreeExam.Background.Container};

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: calc(100vh - 3rem);
    gap: 1.5rem;
  }
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 2.25rem 2.25rem 0 2.25rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 0.75rem;
    align-items: flex-start;
  }
`

const HeadingText = styled.h1`
  font-size: 1.625rem;
  font-weight: 600;
  margin-bottom: 0.875rem;
  color: ${USER_COLORS.FreeExam.Text.Primary};

  @media (max-width: 768px) {
    font-size: 1.325rem;
  }
`

const SubHeadingText = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  color: ${USER_COLORS.FreeExam.Text.Secondary};

  @media (max-width: 768px) {
    font-size: 0.925rem;
  }
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

  @media (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
  }
`

const LeftContentContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${USER_COLORS.FreeExam.Border};
  padding: 2.25rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const FaceMaskImage = styled.img`
  width: 10rem;
  height: 10rem;
  z-index: 1;

  @media (max-width: 768px) {
    width: 37.5vw;
    height: 37.5vw;
  }
`

const RightContentContainer = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  width: '100%';
  padding: 0 0 2.25rem 2.25rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`

const ContentTextContainer = styled.div`
  border: 1px solid ${USER_COLORS.FreeExam.TextContainer.Border};
  background-color: ${USER_COLORS.FreeExam.TextContainer.Background};
  padding: 2.25rem;
  border-radius: 1rem;
  width: 100%;
  user-select: none;

  @media (max-width: 768px) {
    margin-top: 2.75rem;
    padding: 1.5rem;
  }
`

const ContentText = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${USER_COLORS.FreeExam.TextContainer.PrimaryText};
  filter: none;
  transition: filter 0.3s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 2.25rem;
  border-top: 1px solid ${USER_COLORS.FreeExam.Border};

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 0.75rem;
  }
`

const ExamPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  usePageTitle({ title: translations.FREE_EXAM.TITLE })

  const router = useRouter();
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [showExamInstructions, setShowExamInstructions] = useState(currentUser ? true : false)
  const [isAgreeToTerms, setIsAgreeToTerms] = useState(false);

  const {
    isJoined,
    joinChannel,
    leaveTest,
    error,
  } = useContext(USER_CONTEXT.VoiceContext.AgoraContext);
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
    if (!currentUser) {
      setIsLoadingExamScript(false);
      setExamScript(GenerateRandomText({
        minWords: 90,
        maxWords: 120,
        minWordLength: 5,
        maxWordLength: 10,
      }));
      return;
    }

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
      stopTranscribing();
      setExamResult({ ...result, ...examMeta });
      setIsCalculatingScore(false);
    })
  }, [socket, examMeta]);

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

  const HandleLeaveTest = async ({ calculatingScore = true }) => {
    setIsCalculatingScore(calculatingScore);
    stopTranscribing();
    await leaveTest();
    socket.emit('leaveTest', currentUser?._id);
  }

  const HandleStartTest = () => {
    setIsJoiningChannel(true);
    joinChannel().then(() => {
      startRecording();
    }).finally(() => {
      setIsJoiningChannel(false);
    });
  }

  if (isLoadingExamScript) {
    return <COMMON_COMPONENTS.LoaderFullScreen />
  }

  if (isCalculatingScore) {
    return <COMMON_COMPONENTS.LoaderFullScreen message={translations.FREE_EXAM.CALCULATING_SCORE} />
  }

  if (examResult) {
    return (
      <WrapperContainer>
        <ResultMainContainer>
          <ExamResult data={examResult} />
        </ResultMainContainer>
      </WrapperContainer>
    )
  }

  return (
    <WrapperContainer>
      {
        !currentUser &&
        <SignInModal />
      }

      {
        showExamInstructions && currentUser &&
        <USER_COMPONENTS.Modal.Main
          title={translations.FREE_EXAM.MODAL.TITLE}
          subtitle={translations.FREE_EXAM.MODAL.SUBTITLE}>
          <USER_COMPONENTS.Modal.DotList dots={translations.FREE_EXAM.MODAL.DOTS} />
          <USER_COMPONENTS.Modal.CheckBox
            label={translations.FREE_EXAM.MODAL.CHECKBOX_LABEL}
            onChange={() => setIsAgreeToTerms(!isAgreeToTerms)}
            isChecked={isAgreeToTerms}
            htmlFor={'exam-instructions'}
          />
          <USER_COMPONENTS.Button
            text={translations.FREE_EXAM.MODAL.CONTINUE_BUTTON}
            onClick={() => {
              if (isAgreeToTerms) {
                setShowExamInstructions(false);
              } else {
                COMMON_COMPONENTS.Toast.showInfoToast(translations.FREE_EXAM.MODAL.CHECKBOX_ERROR);
              }
            }}
            style={{
              width: '100%',
              marginTop: '1.5rem'
            }}
          />
        </USER_COMPONENTS.Modal.Main>
      }

      <MainContainer>
        <HeadingContainer>
          <div>
            <HeadingText>{translations.FREE_EXAM.HEADING}</HeadingText>
            <SubHeadingText>{translations.FREE_EXAM.DESCRIPTION}</SubHeadingText>
          </div>
          <IconButton onClick={() => {
            HandleLeaveTest({ calculatingScore: false });
            router.push(ROUTES.USER_HOME.path);
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
                  {translations.FREE_EXAM.TEXT_1}
                  <br />
                  {translations.FREE_EXAM.TEXT_2}
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
                onClick={isJoined ? HandleLeaveTest : HandleStartTest}>
                {
                  isJoiningChannel
                    ? <COMMON_COMPONENTS.Loader color='white' />
                    : isJoined
                      ? translations.FREE_EXAM.END_READING
                      : translations.FREE_EXAM.START_READING
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