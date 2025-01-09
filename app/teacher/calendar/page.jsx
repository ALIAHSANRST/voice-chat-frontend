'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { USER_COLORS } from "@/src/utils/colors";
import { ICON_ASSETS, USER_ASSETS } from "@/src/utils/assets";
import { usePageTitle } from "@/src/hooks";

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

const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`

const CalendarPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  usePageTitle({ title: [translations.CALENDAR.TITLE, currentUser?.fullname] })

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar activeItem="calendar" />
      <ContentContainer>
        <FlexContainer>
          <USER_COMPONENTS.CardLists.UpcomingClasses
            showViewAll={false}
            data={[
              {
                photoURL: USER_ASSETS.PLACEHOLDER.PROFILE_PHOTO,
                title: 'Critical Reading Strategies',
                from: '2025-01-08T18:00:00Z',
                to: '2025-01-08T19:00:00Z',
              },
              {
                photoURL: USER_ASSETS.PLACEHOLDER.PROFILE_PHOTO,
                title: 'Complex Sentences',
                from: '2025-01-08T19:30:00Z',
                to: '2025-01-08T20:00:00Z',
              },
              {
                photoURL: USER_ASSETS.PLACEHOLDER.PROFILE_PHOTO,
                title: 'Close Reading Techniques',
                from: '2025-01-08T20:30:00Z',
                to: '2025-01-08T21:30:00Z',
              }
            ]} />
          <CalendarContainer>
            <USER_COMPONENTS.Calendar />
          </CalendarContainer>
        </FlexContainer>
      </ContentContainer>
    </MainContainer>
  )
}

export default CalendarPage