'use client'

import styled from "styled-components";
import { useEffect, useState } from "react";

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { USER_COLORS } from "@/src/utils/colors";
import { ICON_ASSETS, USER_ASSETS } from "@/src/utils/assets";
import { usePageTitle } from "@/src/hooks";
import { GetTeacherStats } from "./axios";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${USER_COLORS.Home.Background};
  font-family: 'Montserrat', sans-serif;
`

const ContentContainer = styled.div`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 90rem;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.25rem;
    gap: 1.25rem;
  }
`

const Container = styled.div`
  width: 100%;
  border-radius: 1rem;
  background-color: ${USER_COLORS.Home.Container.Background};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`

const WelcomeContainer = styled(Container)`
  display: flex;
  gap: 0;
  flex-direction: column;
  position: relative;
  justify-content: center;
  overflow: hidden;
  width: 67%;

  @media (max-width: 768px) {
    width: 100%;
    min-height: 15rem;
    justify-content: flex-start;
  }
`

const StatsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 33%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const ExamImage = styled.img`
  position: absolute;
  bottom: -4rem;
  right: -5rem;
  width: 100%;
  max-width: 22.5rem;
  height: 100%;

  @media (max-width: 768px) {
    max-width: 17.5rem;
  }
`

const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`

const CalendarContainer = styled.div`
  width: 67%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const CardListsContainer = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const VerifiedBadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`

const VerifiedBadgeIcon = styled.img`
  width: 2rem;
  height: 2rem;

  @media (max-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const VerifiedBadgeText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${USER_COLORS.Home.Container.PrimaryText};

  @media (max-width: 768px) {
    font-size: 0.875rem;
    font-weight: 500;
  }
`

const WelcomeText = styled.span`
  font-size: 1.875rem;
  font-weight: 400;
  color: ${USER_COLORS.Home.Container.PrimaryText};

  @media (max-width: 768px) {
    font-size: 1.325rem;
  }
`

const WelcomeName = styled.span`
  font-size: 1.875rem;
  font-weight: 600;
  color: ${USER_COLORS.Home.Container.PrimaryText};

  @media (max-width: 768px) {
    font-size: 1.325rem;
  }
`

const GreetingText = styled.span`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${USER_COLORS.Home.Container.SecondaryText};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`

const StatsTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${USER_COLORS.Home.Container.PrimaryText};
  align-self: flex-start;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const Divider = styled.hr`
  background: ${USER_COLORS.Home.Container.Border};
  margin: 0;
`

const StatsGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${USER_COLORS.Home.Container.PrimaryText};

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const StatTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${USER_COLORS.Home.Container.SecondaryText};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const TeacherHomePage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()
  const { currentUser, completionPercentage } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  usePageTitle({ title: currentUser?.fullname || translations.TEACHER_HOME.TITLE });

  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState([
    {
      'title': translations.TEACHER_HOME.LESSONS,
      'value': '0+'
    },
    {
      'title': translations.TEACHER_HOME.STUDENTS,
      'value': '60+'
    },
    // {
    //   'title': translations.TEACHER_HOME.RATING,
    //   'value': '8.9'
    // }
  ]);

  useEffect(() => {
    const FetchStats = async () => {
      await GetTeacherStats({
        setIsLoading: setIsLoading,
        setData: setStats,
        translations: translations,
      })
    }

    FetchStats()
  }, [])

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar />

      <ContentContainer>
        <FlexContainer>
          <WelcomeContainer>
            <VerifiedBadgeContainer>
              <VerifiedBadgeIcon src={ICON_ASSETS.VERIFIED_BADGE_ICON} alt="Verified Badge" />
              <VerifiedBadgeText>
                {translations.TEACHER_HOME.VERIFIED_TEACHER}
              </VerifiedBadgeText>
            </VerifiedBadgeContainer>
            <div>
              <WelcomeText>{translations.TEACHER_HOME.WELCOME_BACK}, </WelcomeText>
              <WelcomeName>{currentUser.fullname}</WelcomeName>
            </div>
            <GreetingText>{translations.TEACHER_HOME.HAVE_A_NICE_DAY}</GreetingText>
            <ExamImage src={USER_ASSETS.HOME.TAKE_FREE_EXAM_ARTIFACT} alt="Take Free Exam" />
          </WelcomeContainer>
          <StatsContainer>
            <StatsHeader>
              <StatsTitle>{translations.TEACHER_HOME.OVERVIEW}</StatsTitle>
              <USER_COMPONENTS.CircularProgressWithLabel
                value={completionPercentage || 0}
                label={translations.TEACHER_HOME.PROFILE_COMPLETION} />
            </StatsHeader>
            <Divider />
            {
              !isLoading &&
              <StatsGrid>
                {
                  stats.map((item, index) => (
                    <StatItem key={`${item.title}-${index}`}>
                      <StatValue>{item.value}</StatValue>
                      <StatTitle>{item.title}</StatTitle>
                    </StatItem>
                  ))
                }
              </StatsGrid>
            }

            {
              isLoading &&
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}>
                <COMMON_COMPONENTS.Loader message={null} />
              </div>
            }
          </StatsContainer>
        </FlexContainer>

        <FlexContainer>
          <CalendarContainer>
            <USER_COMPONENTS.Calendar showManageSlots={false} />
          </CalendarContainer>
          <CardListsContainer>
            <USER_COMPONENTS.CardLists.UpcomingClasses limit={3} />
            <USER_COMPONENTS.CardLists.Students limit={3} />
          </CardListsContainer>
        </FlexContainer>
      </ContentContainer>
    </MainContainer>
  )
}

export default TeacherHomePage