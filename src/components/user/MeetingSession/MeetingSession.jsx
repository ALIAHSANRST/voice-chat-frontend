'use client'

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  CallingState,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  SpeakerLayout,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  CancelCallButton,
  ScreenShareButton,
  ReactionsButton,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { USER_COLORS } from "@/src/utils/colors";
import { useBreakpoints, usePageTitle } from "@/src/hooks";
import { COMMON_CONTEXT } from '@/src/context';
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/utils/routes";
import { CLASS_STATUSES, ROLES, SLOT_DURATION_IN_MINUTES } from "@/src/utils/constants";
import { EndClass, GetSessionInfo, GetStreamChatToken } from "./axios";
import moment from 'moment';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${USER_COLORS.Home.Background};
`

const ContentContainer = styled.div`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  border: 1px solid ${USER_COLORS.Requests.NoRecordsFound.Border};
  border-radius: 1rem;
  background-color: ${USER_COLORS.Requests.NoRecordsFound.Background};
  max-width: 75rem;
  margin: 0 auto;
  width: 100%;

  .something-went-wrong {
    font-size: 1.25rem;
    font-weight: 500;
    color: #DC3545;
    text-align: center;
  }

  .session-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;

    span {
      font-size: 1.25rem;
      font-weight: 500;
      text-align: center;
      color: ${USER_COLORS.Home.Container.Text};
    }
  }
`

const CallWrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .str-video__speaker-layout {
    padding: 1.25rem;
    button.str-video__call-controls__button {
      display: none;
    }
  }
`

const CallActionsBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${USER_COLORS.Home.Container.Background};
  border-top: 1px solid ${USER_COLORS.Home.Container.Border};
  padding: 0 1.25rem;

  .str-video__composite-button__caption {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
  }
`

const MeetingSession = ({ id }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const [isGettingToken, setIsGettingToken] = useState(true);
  const [token, setToken] = useState(null);
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);

  const [callingState, setCallingState] = useState();
  const [showLeaveMeetingDialogue, setShowLeaveMeetingDialogue] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const { isMobile } = useBreakpoints();

  const HeaderNavBarRef = useRef(null);
  const CallWrapperContainerRef = useRef(null);

  usePageTitle({
    title: !data
      ? translations.MEETING_SESSION.TITLE
      : [data?.title, translations.MEETING_SESSION.TITLE]
  });

  useEffect(() => {
    GetSessionInfo({
      id: id,
      setIsLoading: setIsLoading,
      setData: setData,
    })
  }, [])

  useEffect(() => {
    if (!data) return;

    if (!data?.isReady || data?.isExpired) {
      if (currentUser?.account_type === ROLES.STUDENT)
        router.push(`${ROUTES.USER_COMPLETED_CLASSES.path}/${id}`)
      else if (currentUser?.account_type === ROLES.TEACHER)
        router.push(`${ROUTES.TEACHER_COMPLETED_CLASSES.path}/${id}`)
    }
  }, [data])

  useEffect(() => {
    if (!data?.isReady) return;

    GetStreamChatToken({
      id: id,
      setIsLoading: setIsGettingToken,
      setData: setToken,
    })
  }, [data])

  useEffect(() => {
    if (!token) return;

    const CallSetup = async () => {
      const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
      const user = {
        id: currentUser?._id,
        name: currentUser?.fullname,
        image: COMMON_COMPONENTS.FileLoader(currentUser?.profile_picture),
      };

      const streamClient = StreamVideoClient.getOrCreateInstance({ apiKey, user, token });
      setStreamClient(streamClient);

      const call = streamClient.call('default', data?._id);
      if (!call) return;

      try {
        call.join({
          data: {
            members: [
              { user_id: data?.teacher?._id, role: 'host' },
              { user_id: data?.student?._id, role: 'user' },
            ],
          },
        });
      } catch (error) {
        call.create({
          data: {
            members: [
              { user_id: data?.teacher?._id, role: 'host' },
              { user_id: data?.student?._id, role: 'user' },
            ],
          },
        });
      }

      await call.microphone.disable();

      setCall(call);
    }

    if (!call) CallSetup();
  }, [token])

  useEffect(() => {
    if (!call) return;

    const subscription = call.state.callingState$.subscribe((state) => {
      setCallingState(state);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [call]);

  useEffect(() => {
    if (HeaderNavBarRef.current && CallWrapperContainerRef.current) {
      const headerNavBarHeight = HeaderNavBarRef.current.offsetHeight;
      CallWrapperContainerRef.current.style.height = `calc(100vh - ${headerNavBarHeight}px)`;
    }
  }, [HeaderNavBarRef, CallWrapperContainerRef, call, callingState])

  useEffect(() => {
    if (!data?.scheduledFor?.date || !data?.scheduledFor?.time) return;

    const parsedDate = moment(data?.scheduledFor?.date).format('YYYY-MM-DD')
    const startTime = moment(`${parsedDate} ${data.scheduledFor.time}`, 'YYYY-MM-DD HH:mm');
    const endTime = moment(startTime).add(SLOT_DURATION_IN_MINUTES, 'minutes');

    const timer = setInterval(() => {
      const now = moment();
      const remaining = moment.duration(endTime.diff(now));

      if (remaining.asMilliseconds() <= 0) {
        clearInterval(timer);
        setTimeRemaining(null);

        if (currentUser?.account_type === ROLES.TEACHER && data?.status !== CLASS_STATUSES.COMPLETED) {
          EndClass({ id });
          if (call && callingState !== CallingState.LEFT) {
            call.endCall();
          }
        }
      } else {
        setTimeRemaining(Math.floor(remaining.asSeconds()));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data, call, callingState]);

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar reference={HeaderNavBarRef} />
      {
        (isGettingToken || isLoading || data?.isExpired || !data?.isReady) &&
        <ContentContainer>
          {
            isLoading &&
            <LoadingContainer>
              <COMMON_COMPONENTS.Loader wrapped message={translations.COMMON.LOADING} />
            </LoadingContainer>
          }
        </ContentContainer>
      }

      {
        !isGettingToken &&
        <>
          {
            (callingState !== CallingState.LEFT && callingState !== CallingState.JOINED && callingState !== CallingState.JOINING) &&
            <ContentContainer>
              <LoadingContainer>
                <COMMON_COMPONENTS.Loader wrapped message={translations.MEETING_SESSION.JOINING_SESSION} />
              </LoadingContainer>
            </ContentContainer>
          }

          {
            callingState === CallingState.LEFT &&
            <ContentContainer>
              <LoadingContainer>
                <div className="session-left">
                  <span>{translations.MEETING_SESSION.LEFT}</span>
                  <USER_COMPONENTS.OutlinedButton text={translations.COMMON.GO_BACK} onClick={() => {
                    if (currentUser?.account_type === ROLES.STUDENT) {
                      router.push(ROUTES.USER_HOME.path)
                    } else if (currentUser?.account_type === ROLES.TEACHER) {
                      router.push(ROUTES.TEACHER_HOME.path)
                    }
                  }} />
                </div>
              </LoadingContainer>
            </ContentContainer>
          }

          {
            callingState === CallingState.JOINING &&
            <ContentContainer>
              <LoadingContainer>
                <COMMON_COMPONENTS.Loader wrapped message={translations.MEETING_SESSION.JOINING_SESSION} />
              </LoadingContainer>
            </ContentContainer>
          }

          {
            callingState === CallingState.JOINED && data?.status !== CLASS_STATUSES.COMPLETED &&
            <CallWrapperContainer ref={CallWrapperContainerRef}>
              <StreamVideo client={streamClient}>
                <StreamCall call={call}>
                  <StreamTheme style={{
                    color: 'white',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative',
                  }}>
                    {timeRemaining !== null && (
                      <div style={{
                        position: 'absolute',
                        top: '2rem',
                        right: '2rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.675)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.325rem',
                        fontSize: '0.875rem',
                        zIndex: 1000,
                      }}>
                        {translations.MEETING_SESSION.TIME_LEFT}: {moment.utc(timeRemaining * 1000).format('mm:ss')}
                      </div>
                    )}
                    <SpeakerLayout participantsBarPosition={isMobile ? "bottom" : "left"} />
                    <CallActionsBar>
                      <div className="str-video__call-controls">
                        <SpeakingWhileMutedNotification>
                          <ToggleAudioPublishingButton />
                        </SpeakingWhileMutedNotification>
                        <ToggleVideoPublishingButton />
                        <ScreenShareButton />
                        <ReactionsButton />
                        {
                          currentUser?.account_type === ROLES.TEACHER &&
                          <CancelCallButton onClick={() => setShowLeaveMeetingDialogue(true)} />
                        }
                        {
                          currentUser?.account_type === ROLES.STUDENT &&
                          <CancelCallButton onClick={router.push(ROUTES.USER_HOME.path)} />
                        }
                      </div>
                    </CallActionsBar>
                  </StreamTheme>
                </StreamCall>
              </StreamVideo>
            </CallWrapperContainer>
          }
        </>
      }

      {
        showLeaveMeetingDialogue &&
        <COMMON_COMPONENTS.AlertDialogue
          title={translations.COMMON.WARNING}
          positiveMessage={translations.COMMON.LEAVE}
          negativeMessage={translations.COMMON.CANCEL}
          positiveCallback={async () => {
            await EndClass({ id: id });
            if (call && callingState !== CallingState.LEFT) {
              call.endCall();
            }
            setShowLeaveMeetingDialogue(false);
          }}
          negativeCallback={() => setShowLeaveMeetingDialogue(false)}
          show={showLeaveMeetingDialogue}
          handleClose={() => setShowLeaveMeetingDialogue(false)}>
          <p>
            {translations.MEETING_SESSION.LEAVE_CONFIRMATION}
          </p>
        </COMMON_COMPONENTS.AlertDialogue>
      }
    </MainContainer>
  )
}

export default MeetingSession