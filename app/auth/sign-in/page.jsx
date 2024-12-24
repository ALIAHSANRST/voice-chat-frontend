'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

const ForgotPasswordWrapper = styled.div`
  text-align: right;

  a {
    font-size: 1rem;
    font-weight: 600;
    color: ${COMMON_COLORS.AUTH.neutral_3};
    text-decoration: none;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }
`

const RightSideContainer = styled.div`
  flex: 1.5;

  @media (max-width: 768px) {
    display: none;
  }
`

const SignInPage = () => {
  usePageTitle({ title: 'Sign In' })

  const router = useRouter()
  const { SignInLocal, currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

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

    SignInLocal({ payload: values, callback: callback })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: COMMON_VALIDATION.Authentication.SignInSchema,
    onSubmit: HandleSubmit,
  })

  return (
    <Container>
      <LeftSideContainer>
        <Formik enableReinitialize>
          <form onSubmit={formik.handleSubmit} method='POST'>
            <COMMON_COMPONENTS.Auth.FormCard
              title={'Welcome Back'}
              description={'Enter your email and password to sign in'}>
              <COMMON_COMPONENTS.Auth.SocialMedia />
              <COMMON_COMPONENTS.Auth.OrSeperator />

              <COMMON_COMPONENTS.Auth.InputField
                name={'email'}
                label={'Email'}
                placeholder={'Enter your email'}
                type={'email'}
                leftIcon={ICON_ASSETS.SMS_ICON}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                disabled={formik.isSubmitting}
              />

              <COMMON_COMPONENTS.Auth.InputField
                name={'password'}
                label={'Password'}
                placeholder={'Enter your password'}
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

              <ForgotPasswordWrapper>
                <Link href={'/auth/forgot-password'}>
                  Forgot your password?
                </Link>
              </ForgotPasswordWrapper>

              <COMMON_COMPONENTS.Auth.Button
                type={'submit'}
                disabled={formik.isSubmitting}
                text={'Login'}
              />

              <COMMON_COMPONENTS.Auth.AlternativeFlow
                link={'/auth/sign-up'}
                linkText={'Create an Account'}
                text={'Not registered yet?'}
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

export default SignInPage