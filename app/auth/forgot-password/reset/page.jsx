'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, useFormik } from 'formik';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { INITIAL_VALUES } from './values';
import { UpdatePassword } from './axios';
import { ICON_ASSETS } from '@/src/utils/assets';
import { usePageTitle } from '@/src/hooks';
import { COMMON_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { COMMON_VALIDATION } from '@/src/validation';
import { COMMON_COLORS } from '@/src/utils/colors';
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

const ResetPasswordPage = () => {
  usePageTitle({ title: 'Reset Password' })

  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!currentUser) return
    router.push(`/${currentUser.account_type}`)
  }, [currentUser])

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) return;
    router.push(ROUTES.SIGN_IN.path)
  }, [searchParams])

  const HandleSubmit = (values, { setSubmitting }) => {
    UpdatePassword({
      payload: { ...values, token: searchParams.get('token') },
      setIsLoading: setSubmitting,
      router: router
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: COMMON_VALIDATION.Authentication.ResetPasswordSchema,
    onSubmit: HandleSubmit,
  })

  return (
    <Container>
      <LeftSideContainer>
        <Formik enableReinitialize>
          <form onSubmit={formik.handleSubmit} method='POST'>
            <COMMON_COMPONENTS.Auth.FormCard
              title={'Reset password'}
              description={'Enter your new password'}>
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

              <COMMON_COMPONENTS.Auth.InputField
                name={'confirmPassword'}
                label={'Confirm Password'}
                placeholder={'Re-enter your password'}
                type={showConfirmPassword ? 'text' : 'password'}
                leftIcon={ICON_ASSETS.LOCK_ICON}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.errors.confirmPassword}
                disabled={formik.isSubmitting}
                rightIcon={
                  <FontAwesomeIcon
                    style={{ cursor: 'pointer', opacity: 0.8, color: COMMON_COLORS.AUTH.neutral_black }}
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                }
              />

              <COMMON_COMPONENTS.Auth.Button
                type={'submit'}
                disabled={formik.isSubmitting}
                text={'Reset Password'}
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

export default ResetPasswordPage