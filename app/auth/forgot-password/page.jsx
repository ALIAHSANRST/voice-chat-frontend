'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, useFormik } from 'formik';
import styled from 'styled-components';

import { INITIAL_VALUES } from './values';
import { ResetPassword } from './axios';
import { ICON_ASSETS } from '@/src/utils/assets';
import { usePageTitle } from '@/src/hooks';
import { COMMON_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { COMMON_VALIDATION } from '@/src/validation';

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

const ForgotPasswordPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  const [isEmailSent, setIsEmailSent] = useState(false)
  usePageTitle({
    title: isEmailSent
      ? [translations.FORGOT_PASSWORD.EMAIL_SENT, translations.FORGOT_PASSWORD.TITLE]
      : translations.FORGOT_PASSWORD.TITLE
  })

  const router = useRouter()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });

  useEffect(() => {
    if (!currentUser) return
    router.push(`/${currentUser.account_type}`)
  }, [currentUser])

  const HandleSubmit = (values, { setSubmitting }) => {
    ResetPassword({
      payload: values,
      setIsLoading: setSubmitting,
      router: router,
      setIsEmailSent: setIsEmailSent
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: COMMON_VALIDATION.Authentication.ForgotPasswordSchema,
    onSubmit: HandleSubmit,
  })

  if (isEmailSent) {
    return (
      <Container>
        <LeftSideContainer>
          <COMMON_COMPONENTS.Auth.FormCard
            header={
              <img src={ICON_ASSETS.SMS_TRACKING_ICON} alt='sms-tracking-icon' />
            }
            title={translations.FORGOT_PASSWORD.HEADING_1}
            description={translations.FORGOT_PASSWORD.DESCRIPTION_1}>
            <COMMON_COMPONENTS.Auth.GoBack />
          </COMMON_COMPONENTS.Auth.FormCard>
        </LeftSideContainer>
        <RightSideContainer>
          <COMMON_COMPONENTS.Auth.SideCard />
        </RightSideContainer>
      </Container>
    )
  }

  return (
    <Container>
      <LeftSideContainer style={{ minHeight: '100%' }}>
        <Formik enableReinitialize>
          <form onSubmit={formik.handleSubmit} method='POST'>
            <COMMON_COMPONENTS.Auth.FormCard
              title={translations.FORGOT_PASSWORD.HEADING_2}
              description={translations.FORGOT_PASSWORD.DESCRIPTION_2}>
              <COMMON_COMPONENTS.Auth.InputField
                name={'email'}
                label={translations.FORGOT_PASSWORD.EMAIL}
                placeholder={translations.FORGOT_PASSWORD.EMAIL_PLACEHOLDER}
                type={'email'}
                leftIcon={ICON_ASSETS.SMS_ICON}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                disabled={formik.isSubmitting}
              />

              <COMMON_COMPONENTS.Auth.Button
                type={'submit'}
                disabled={formik.isSubmitting}
                text={translations.FORGOT_PASSWORD.SEND_EMAIL}
              />

              <COMMON_COMPONENTS.Auth.GoBack />
            </COMMON_COMPONENTS.Auth.FormCard>
          </form>
        </Formik>
      </LeftSideContainer>
      <RightSideContainer>
        <COMMON_COMPONENTS.Auth.SideCard />
      </RightSideContainer>
    </Container>
  )
};

export default ForgotPasswordPage