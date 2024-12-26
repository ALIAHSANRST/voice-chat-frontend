'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import { VerifyEmail } from './axios';
import { usePageTitle } from '@/src/hooks';
import { COMMON_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { ROUTES } from '@/src/utils/routes';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
`

const LeftSideContainer = styled.div`
  flex: 1;
  form {
    height: 100%;

    @media (max-width: 768px) {
      height: unset;
    }
  }
`

const RightSideContainer = styled.div`
  flex: 1.5;

  @media (max-width: 768px) {
    display: none;
  }
`

const VerifyEmailPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  usePageTitle({ title: translations.VERIFY_EMAIL.TITLE })

  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!currentUser) return
    router.push(`/${currentUser.account_type}`)
  }, [currentUser])

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) HandleEmailVerification()
    router.push(ROUTES.SIGN_IN.path)
  }, [searchParams])

  const HandleEmailVerification = async () => {
    await VerifyEmail({
      payload: { token: searchParams.get('token') },
      setIsLoading: setIsLoading,
      router: router
    })
  }


  return (
    <Container>
      <LeftSideContainer>
        <COMMON_COMPONENTS.Auth.FormCard
          title={isLoading ? translations.VERIFY_EMAIL.HEADING_1 : translations.VERIFY_EMAIL.HEADING_2}
          description={isLoading ? translations.VERIFY_EMAIL.DESCRIPTION : translations.VERIFY_EMAIL.DESCRIPTION_2}>
          <COMMON_COMPONENTS.Auth.Button
            text={translations.VERIFY_EMAIL.TEXT_1}
            onClick={() => router.push(ROUTES.SIGN_IN.path)}
          />
        </COMMON_COMPONENTS.Auth.FormCard>
      </LeftSideContainer>
      <RightSideContainer>
        <COMMON_COMPONENTS.Auth.SideCard />
      </RightSideContainer>
    </Container>
  )
};

export default VerifyEmailPage