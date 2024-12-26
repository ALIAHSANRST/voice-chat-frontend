'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { USER_COLORS } from "@/src/utils/colors";
import { USER_ASSETS } from "@/src/utils/assets";
import { usePageTitle } from "@/src/hooks";
import { ROUTES } from "@/src/utils/routes";

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
    padding: 1rem 1.5rem;
    gap: 1rem;
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
    padding: 1.5rem;
  }
`

const PrimaryText = styled.p`
  padding: 0;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: ${USER_COLORS.Home.Container.PrimaryText};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const SecondaryText = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 300;
  color: ${USER_COLORS.Home.Container.SecondaryText};

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const WelcomeContainer = styled(Container)`
  gap: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ExamContainer = styled(Container)`
  flex: 1.5;
  align-items: center;
  justify-content: center;
  padding: 4rem 0rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const ExamImage = styled.img`
  width: 100%;
  max-width: 22.5rem;
  height: 100%;

  @media (max-width: 768px) {
    max-width: 70vw;
    margin: 2rem 0;
  }
`

const ExamButton = styled(USER_COMPONENTS.Button)`
  width: 100%;
  max-width: 22.5rem;

  @media (max-width: 768px) {
    max-width: unset;
  }
`

const SidebarContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  max-width: 35rem;

  @media (max-width: 768px) {
    max-width: unset;
  }
`

const SectionTitle = styled(PrimaryText)`
  font-size: 1.625rem;
  line-height: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.25rem;
  }
`

const SectionText = styled(SecondaryText)`
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const FlexContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const UserHomePage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  const { currentUser, DeleteAccount } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();
  const router = useRouter();

  usePageTitle({ title: currentUser?.fullname || translations.USER_HOME.TITLE })

  const [showDeleteAccountDialogue, setShowDeleteAccountDialogue] = useState(false);
  const [showIsDeletingAccount, setShowIsDeletingAccount] = useState(false);

  if (showIsDeletingAccount) {
    return (
      <COMMON_COMPONENTS.LoaderFullScreen message={translations.USER_HOME.DELETING_ACCOUNT} />
    )
  }

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar />

      <ContentContainer>
        <WelcomeContainer>
          <div>
            <PrimaryText>
              {translations.USER_HOME.WELCOME.replace('{fullname}', currentUser.fullname)}
            </PrimaryText>
            <SecondaryText>
              {translations.USER_HOME.WELCOME_MESSAGE}
            </SecondaryText>
          </div>

          <USER_COMPONENTS.OutlinedButton text={'Delete Account'} variant={'danger'} onClick={() => {
            setShowDeleteAccountDialogue(true);
          }} />

          {/* <USER_COMPONENTS.CircularProgressWithLabel /> */}
        </WelcomeContainer>

        <FlexContainer>
          <ExamContainer>
            <PrimaryText>
              {translations.USER_HOME.TEXT_1}
            </PrimaryText>
            <SecondaryText style={{ textAlign: 'center' }}>
              {translations.USER_HOME.TEXT_2}
            </SecondaryText>
            <ExamImage src={USER_ASSETS.HOME.TAKE_FREE_EXAM_ARTIFACT} alt="Take Free Exam" />
            <ExamButton
              text={translations.USER_HOME.TAKE_FREE_EXAM}
              onClick={() => router.push(ROUTES.USER_FREE_EXAM.path)}
            />
          </ExamContainer>

          <SidebarContainer>
            <Container>
              <SectionTitle>
                {translations.USER_HOME.MY_TUTORS}
              </SectionTitle>
              <SectionText>
                {translations.USER_HOME.TEXT_3}
              </SectionText>
              <USER_COMPONENTS.OutlinedButton
                variant='primary'
                text={translations.USER_HOME.JOIN_AS_STUDENT}
                style={{ width: 'fit-content' }}
              />
            </Container>
            <Container>
              <SectionTitle>
                {translations.USER_HOME.GETTING_STARTED_GUIDE}
              </SectionTitle>
              <SectionText>
                {translations.USER_HOME.FOLLOW_THESE_STEPS}
              </SectionText>
              <USER_COMPONENTS.Stepper
                steps={translations.USER_HOME.STEPS}
                activeStep={-1}
                orientation="vertical"
              />
            </Container>
          </SidebarContainer>
        </FlexContainer>
      </ContentContainer>

      {
        showDeleteAccountDialogue &&
        <COMMON_COMPONENTS.AlertDialogue
          title='Warning'
          positiveMessage='Yes'
          negativeMessage='No'
          positiveCallback={async () => {
            setShowIsDeletingAccount(true);
            await DeleteAccount();
            setShowDeleteAccountDialogue(false);
          }}
          negativeCallback={() => setShowDeleteAccountDialogue(false)}
          show={showDeleteAccountDialogue}
          handleClose={() => setShowDeleteAccountDialogue(false)}>
          <p>Are you sure you want to delete your account?</p>
        </COMMON_COMPONENTS.AlertDialogue>
      }
    </MainContainer>
  )
}

export default UserHomePage