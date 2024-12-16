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

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
`

const SignInPage = () => {
  usePageTitle({ title: 'Sign In' })

  const router = useRouter()
  const { SignInLocal, currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!currentUser) return
    // router.push(`/${currentUser.account_type}`)

    if (currentUser?.account_type === 'admin') {
      router.push('/admin');
    } else if (currentUser?.account_type === 'user') {
      router.push('/user/user-guide');
    } else {
      router.push('/');
    }
  }, [currentUser])

  const HandleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const callback = (currentUser) => {
      console.log(`currentUser: `, currentUser)

      setSubmitting(false);
      if (!currentUser) return;

      if (currentUser?.account_type === 'admin') {
        router.push('/admin');
      } else if (currentUser?.account_type === 'user') {
        // router.push('/user');
        router.push('/user/user-guide');
      } else {
        router.push('/');
      }
    }

    SignInLocal({ payload: values, callback: callback, isAdmin: isAdmin })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: COMMON_VALIDATION.Authentication.SignInSchema,
    onSubmit: HandleSubmit,
  })

  return (
    <Container>
      <div style={{ flex: 1 }}>
        <Formik enableReinitialize>
          <form onSubmit={formik.handleSubmit} method='POST'>
            <COMMON_COMPONENTS.Auth.FormCard
              title={'Welcome Back'}
              description={'Enter your email and password to sign in'}>
              <COMMON_COMPONENTS.Auth.UserModeToggle
                mode={isAdmin}
                setMode={setIsAdmin}
              />

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

              <Link href={'/auth/forgot-password'} style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: COMMON_COLORS.AUTH.neutral_3,
                textDecoration: 'none',
                marginLeft: 'auto',
              }}>
                Forgot your password?
              </Link>

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
      </div>
      <div style={{ flex: 1.5 }}>
        <COMMON_COMPONENTS.Auth.SideCard />
      </div>
    </Container>
  )
};

export default SignInPage