'use client'

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { Formik, useFormik } from 'formik';
import styled from 'styled-components';

import { INITIAL_VALUES } from './values';
import { ICON_ASSETS } from '@/src/utils/assets';
import { usePageTitle } from '@/src/hooks';
import { COMMON_COLORS } from '@/src/utils/colors';
import { COMMON_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { COMMON_VALIDATION } from '@/src/validation';
import { ROUTES } from '@/src/utils/routes';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
`

const LeftSideContainer = styled.div`
  flex: 1;
`

const RightSideContainer = styled.div`
  flex: 1.5;

  @media (max-width: 768px) {
    display: none;
  }
`

const SignUpPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  usePageTitle({ title: translations.SIGN_IN.TITLE })

  const router = useRouter()
  const { SignUpLocal, currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!currentUser) return
    router.push(`/${currentUser.account_type}`)
  }, [currentUser])

  const HandleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const callback = (currentUser) => {
      console.log(`currentUser: `, currentUser)

      setSubmitting(false);
      if (!currentUser) return;

      if (currentUser?.account_type === 'admin') {
        router.push(ROUTES.ADMIN_HOME.path);
      } else if (currentUser?.account_type === 'user') {
        router.push(ROUTES.USER_HOME.path);
      } else {
        router.push(ROUTES.HOME.path);
      }
    }

    SignUpLocal({
      payload: { ...values, confirmPassword: values.password },
      callback: callback
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: COMMON_VALIDATION.Authentication.SignUpSchema,
    onSubmit: HandleSubmit,
  })

  return (
    <Container>
      <LeftSideContainer>
        <Formik enableReinitialize>
          <form onSubmit={formik.handleSubmit} method='POST'>
            <COMMON_COMPONENTS.Auth.FormCard
              title={translations.SIGN_UP.WELCOME_TO_SIGN_UP}
              description={translations.SIGN_UP.DESCRIPTION}>

              <COMMON_COMPONENTS.Auth.SocialMedia />
              <COMMON_COMPONENTS.Auth.OrSeperator />

              <COMMON_COMPONENTS.Auth.InputField
                name={'fullname'}
                label={translations.SIGN_UP.FULL_NAME}
                placeholder={translations.SIGN_UP.FULL_NAME_PLACEHOLDER}
                type={'text'}
                leftIcon={ICON_ASSETS.USER_ICON}
                value={formik.values.fullname}
                onChange={formik.handleChange}
                error={formik.errors.fullname}
                disabled={formik.isSubmitting}
              />

              <COMMON_COMPONENTS.Auth.InputField
                name={'email'}
                label={translations.SIGN_UP.EMAIL}
                placeholder={translations.SIGN_UP.EMAIL_PLACEHOLDER}
                type={'email'}
                leftIcon={ICON_ASSETS.SMS_ICON}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                disabled={formik.isSubmitting}
              />

              <COMMON_COMPONENTS.Auth.InputField
                name={'password'}
                label={translations.SIGN_UP.PASSWORD}
                placeholder={translations.SIGN_UP.PASSWORD_PLACEHOLDER}
                type={showPassword ? 'text' : 'password'}
                leftIcon={ICON_ASSETS.LOCK_ICON}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
                disabled={formik.isSubmitting}
                rightIcon={
                  <FontAwesomeIcon
                    style={{ cursor: 'pointer', opacity: 0.8, color: COMMON_COLORS.AUTH.neutral_black }}
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)} />
                }
              />

              <COMMON_COMPONENTS.Auth.Button
                type={'submit'}
                disabled={formik.isSubmitting}
                text={translations.SIGN_UP.SIGN_UP}
              />

              <COMMON_COMPONENTS.Auth.AlternativeFlow
                link={'/auth/sign-in'}
                linkText={translations.SIGN_UP.LOGIN_NOW}
                text={translations.SIGN_UP.ALREADY_HAVE_AN_ACCOUNT}
              />
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

export default SignUpPage