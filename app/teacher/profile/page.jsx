'use client'

import { useState } from "react";
import styled from "styled-components";

import { USER_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { USER_COLORS } from "@/src/utils/colors";
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
  gap: 1.5rem;
  max-width: 90rem;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.25rem;
    gap: 1.125rem;
  }
`

const FlexContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.125rem;
  }
`

const LeftContainer = styled.div`
  width: 25%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const RightContainer = styled.div`
  width: 75%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const HeadingText = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${USER_COLORS.CardLists.Text.Heading};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const ProfilePage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  usePageTitle({ title: [translations.PROFILE.TITLE, currentUser?.fullname] })

  const [activeItem, setActiveItem] = useState(0)

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar activeItem="" />
      <ContentContainer>
        <HeadingText>{translations.PROFILE.TITLE}</HeadingText>
        <FlexContainer>
          <LeftContainer>
            <USER_COMPONENTS.Profile.SideBar activeItem={activeItem} setActiveItem={setActiveItem} />
          </LeftContainer>
          <RightContainer>
            {activeItem === 0 && <USER_COMPONENTS.Profile.PersonalInformation />}
            {activeItem === 1 && <USER_COMPONENTS.Profile.ChangePassword />}
            {activeItem === 2 && <USER_COMPONENTS.Profile.Experience />}
          </RightContainer>
        </FlexContainer>
      </ContentContainer>
    </MainContainer>
  )
}

export default ProfilePage