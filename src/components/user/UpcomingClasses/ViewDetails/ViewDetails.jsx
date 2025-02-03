"use client";

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import styled from "styled-components"

import { COMMON_CONTEXT } from "@/src/context"
import { CLASS_STATUSES, ROLES } from "@/src/utils/constants"
import { USER_COLORS } from "@/src/utils/colors";
import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components";
import { ICON_ASSETS } from "@/src/utils/assets";
import { ROUTES } from "@/src/utils/routes";
import { usePageTitle } from "@/src/hooks";
import { GetUpcomingClass } from "./axios";

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
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const SessionInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid ${USER_COLORS.Home.Container.Border};
  border-radius: 1rem;
  padding: 1.25rem;
  background-color: ${USER_COLORS.Home.Container.Background};
  width: 100%;
  max-width: 47.5rem;
`

const SessionHeaderContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${USER_COLORS.Home.Container.Border};

  h1 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${USER_COLORS.Home.Container.PrimaryText};
    font-family: 'Montserrat', sans-serif;
    margin: 0;
  }

  .status-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.325rem 0.8rem;
  border-radius: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  user-select: none;
  
  ${props => {
    if (props.isExpired) return `background-color: #fde7e7; color: #c62828;`
    switch (props.status) {
      case CLASS_STATUSES.ON_GOING:
        return `background-color: #e8f5e9; color: #2e7d32;`;
      case CLASS_STATUSES.SCHEDULED:
        return `background-color: #e3f2fd; color: #1976d2;`;
      case CLASS_STATUSES.COMPLETED:
        return `background-color: #eeeeee; color: #616161;`;
      default:
        return
    }
  }}

  .pulse {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: currentColor;
    animation: ${props => props.status === CLASS_STATUSES.ON_GOING ? 'pulse 1.5s infinite' : 'none'};
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.1);
      opacity: 1;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.8;
    }
  }
`

const SessionDetailsContainer = styled.div`
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  background-color: ${USER_COLORS.Home.Background};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ParticipantDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;

  h2 {
    color: #2C3A4B;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
  }

  div {
    display: flex;
    gap: 0.75rem;

    div {
      display: flex;
      flex-direction: column;
      gap: 0;

      p {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
      }

      p:first-child {
        font-weight: 600;
        color: #394452;
        font-size: 0.875rem;
      }

      p:last-child {
        color: #6D7580;
        font-size: 0.75rem;
        font-weight: 500;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const ParticipantImage = styled(COMMON_COMPONENTS.ImageLoader)`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  object-fit: cover;
`

const ClassDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  
  h2 {
    color: #2C3A4B;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
  }

  h3 {
    color: #2C3A4B;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    margin: 0;

    span {
      color: #394452;
      font-weight: 500;
    }
  }

  div {
    display: flex;
    gap: 0.5rem;
    font-family: 'Montserrat', sans-serif;

    img {
      width: 1.25rem;
      height: 1.25rem;
    }

    span {
      color: #394452;
      font-size: 0.875rem;
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    border-top: 1px solid ${USER_COLORS.Home.Container.Border};
    padding-top: 1rem;
  }
`

const SessionActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ViewDetails = ({ id }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  usePageTitle({
    title: !data?.title
      ? translations.CLASS_DETAILS.SESSION_INFO
      : [data?.title, translations.CLASS_DETAILS.SESSION_INFO]
  });

  const router = useRouter()

  useEffect(() => {
    GetUpcomingClass({
      id: id,
      setData: setData,
      setIsLoading: setIsLoading,
    })
  }, [])

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar />
      <ContentContainer>
        {
          (isLoading || !data) &&
          <SessionInfoContainer>
            <COMMON_COMPONENTS.Loader wrapped message={translations.COMMON.LOADING} />
          </SessionInfoContainer>
        }
        {
          !isLoading && data &&
          <SessionInfoContainer>
            <SessionHeaderContainer>
              <h1>{translations.CLASS_DETAILS.SESSION_INFO}</h1>
              <StatusIndicator
                status={data?.status}
                isExpired={data?.isExpired}
                title={
                  data?.status === CLASS_STATUSES.ON_GOING
                    ? translations.CLASS_DETAILS.SESSION_ONGOING
                    : data?.status === CLASS_STATUSES.SCHEDULED
                      ? translations.CLASS_DETAILS.SESSION_SCHEDULED
                      : data?.isExpired
                        ? translations.CLASS_DETAILS.SESSION_EXPIRED
                        : translations.CLASS_DETAILS.SESSION_COMPLETED
                }>
                <div className="pulse"></div>
                {
                  data?.isExpired &&
                  translations.CLASS_DETAILS.SESSION_EXPIRED
                }
                {
                  !data?.isExpired &&
                  <>
                    {data?.status === CLASS_STATUSES.ON_GOING && translations.CLASS_DETAILS.SESSION_ONGOING}
                    {data?.status === CLASS_STATUSES.SCHEDULED && translations.CLASS_DETAILS.SESSION_SCHEDULED}
                    {data?.status === CLASS_STATUSES.COMPLETED && translations.CLASS_DETAILS.SESSION_COMPLETED}
                  </>
                }
              </StatusIndicator>
            </SessionHeaderContainer>
            <SessionDetailsContainer>
              <ParticipantDetailsContainer>
                {
                  currentUser.account_type === ROLES.STUDENT &&
                  <>
                    <h2>{translations.COMMON.TUTOR}</h2>
                    <div>
                      <ParticipantImage source={data?.teacher?.profile_picture} />
                      <div>
                        <p>{data?.teacher?.fullname}</p>
                        <p>{data?.teacher?.email}&nbsp;</p>
                      </div>
                    </div>
                  </>
                }
                {
                  currentUser.account_type === ROLES.TEACHER &&
                  <>
                    <h2>{translations.COMMON.STUDENT}</h2>
                    <div>
                      <ParticipantImage source={data?.student?.profile_picture} />
                      <div>
                        <p>{data?.student?.fullname}</p>
                        <p>{data?.student?.email}&nbsp;</p>
                      </div>
                    </div>
                  </>
                }
              </ParticipantDetailsContainer>
              <ClassDetailsContainer>
                <h2>{translations.CLASS_DETAILS.CLASS_DETAILS}</h2>
                <h3>
                  {translations.COMMON.TOPIC}:&nbsp;
                  <span title={data?.title}>{data?.title}</span>
                </h3>
                <div>
                  <img src={ICON_ASSETS.CALENDAR_ICON} title={translations.COMMON.DATE} alt={translations.COMMON.DATE} />
                  <span title={data?.formatted?.date}>{data?.formatted?.date}</span>
                </div>
                <div>
                  <img src={ICON_ASSETS.CLOCK_ICON} title={translations.COMMON.TIME} alt={translations.COMMON.TIME} />
                  <span title={data?.formatted?.time}>
                    {`${data?.formatted?.time} `}
                    {data?.formatted?.isToday ? translations.COMMON.TODAY : ""}
                    {data?.formatted?.isTomorrow ? translations.COMMON.TOMORROW : ""}
                    {data?.formatted?.isYesterday ? translations.COMMON.YESTERDAY : ""}
                  </span>
                </div>
              </ClassDetailsContainer>
            </SessionDetailsContainer>
            <SessionActionsContainer>
              <USER_COMPONENTS.OutlinedButton
                onClick={() => {
                  if (currentUser.account_type === ROLES.TEACHER)
                    router.push(ROUTES.TEACHER_UPCOMING_CLASSES.path)
                  else if (currentUser.account_type === ROLES.STUDENT)
                    router.push(ROUTES.USER_UPCOMING_CLASSES.path)
                }}>
                <FontAwesomeIcon icon={faChevronLeft} />
                {translations.COMMON.BACK}
              </USER_COMPONENTS.OutlinedButton>
              {
                data?.formatted?.isToday &&
                (data?.status === CLASS_STATUSES.SCHEDULED || data?.status === CLASS_STATUSES.ON_GOING) &&
                data?.isReady &&
                <USER_COMPONENTS.OutlinedButton
                  text={
                    currentUser.account_type === ROLES.STUDENT
                      ? translations.CLASS_DETAILS.JOIN_SESSION
                      : data?.status === CLASS_STATUSES.ON_GOING
                        ? translations.CLASS_DETAILS.JOIN_SESSION
                        : translations.CLASS_DETAILS.START_SESSION
                  }
                  onClick={() => {
                    if (currentUser.account_type === ROLES.STUDENT)
                      router.push(`${ROUTES.USER_CLASS_SESSION.path}?id=${id}`)
                    else if (currentUser.account_type === ROLES.TEACHER)
                      router.push(`${ROUTES.TEACHER_CLASS_SESSION.path}?id=${id}`)
                  }}
                />
              }
            </SessionActionsContainer>
          </SessionInfoContainer>
        }
      </ContentContainer>
    </MainContainer>
  )
}

export default ViewDetails