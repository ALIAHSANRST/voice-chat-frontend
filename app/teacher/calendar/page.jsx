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

const ListContainer = styled.div`
  width: 33%;
  
  @media (max-width: 768px) {
    width: 100%;
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
          <ListContainer>
            <USER_COMPONENTS.CardLists.UpcomingClasses showViewAll={true} limit={5} />
          </ListContainer>
          <CalendarContainer>
            <USER_COMPONENTS.Calendar />
          </CalendarContainer>
        </FlexContainer>
      </ContentContainer>
    </MainContainer>
  )
}

export default CalendarPage