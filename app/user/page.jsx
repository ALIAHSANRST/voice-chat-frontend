'use client'

import Image from "next/image";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap"
import { useRouter } from "next/navigation";

import LightLogo from "@/public/images/logo/light.jpeg";
import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import styled from "styled-components";
import { USER_COLORS } from "@/src/utils/colors";
import { USER_ASSETS } from "@/src/utils/assets";

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
`

const Container = styled.div`
  width: 100%;
  border-radius: 1rem;
  background-color: ${USER_COLORS.Home.Container.Background};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PrimaryText = styled.p`
  padding: 0;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: ${USER_COLORS.Home.Container.PrimaryText}
`

const SecondaryText = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 300;
  color: ${USER_COLORS.Home.Container.SecondaryText}
`

const UserHomePage = () => {
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();
  const router = useRouter();

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar />

      <ContentContainer>
        <Container style={{ gap: 0, flexDirection: 'row' }}>
          <div>
            <PrimaryText>
              👋 Hi, {currentUser.fullname}
            </PrimaryText>
            <SecondaryText>
              Welcome to Globalie Education!
            </SecondaryText>
          </div>
          {/* <USER_COMPONENTS.CircularProgressWithLabel /> */}
        </Container>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Container style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', padding: '4rem 0rem' }}>
            <PrimaryText>
              Take a Free Exam Today!
            </PrimaryText>
            <SecondaryText>
              Test your knowledge and get instant results — no cost, no commitment!
            </SecondaryText>
            <img src={USER_ASSETS.HOME.TAKE_FREE_EXAM_ARTIFACT} alt="Take Free Exam"
              style={{ width: '100%', maxWidth: '22.5rem', height: '100%' }} />
            <USER_COMPONENTS.Button
              text={'Take a free exam'}
              style={{ width: '100%', maxWidth: '22.5rem' }}
            />
          </Container>
          <div style={{ flex: 1, display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '35rem' }}>
            <Container>
              <PrimaryText style={{ fontSize: '1.625rem', lineHeight: '1.5rem' }}>
                My tutors
              </PrimaryText>
              <SecondaryText style={{ fontSize: '1rem' }}>
                Looks like you haven't contacted anyone yet. Let's get started!
              </SecondaryText>
              <USER_COMPONENTS.OutlinedButton
                variant='primary'
                text='Join as student'
                style={{ width: 'fit-content' }}
              />
            </Container>
            <Container>
              <PrimaryText style={{ fontSize: '1.625rem', lineHeight: '1.5rem' }}>
                Getting Started Guide
              </PrimaryText>
              <SecondaryText style={{ fontSize: '1rem' }}>
                Follow these simple steps to begin
              </SecondaryText>
              <USER_COMPONENTS.Stepper
                steps={[
                  'Create or Join an organization',
                  'Read the instructions carefully',
                  'Click \'Start Exam\' to begin',
                  'View your score and provide feedback',
                  'Answer \'Where did you find Globalie?\''
                ]}
                activeStep={-1}
                orientation="vertical"
              />
            </Container>
          </div>
        </div>
      </ContentContainer>
    </MainContainer>
  )
}

export default UserHomePage