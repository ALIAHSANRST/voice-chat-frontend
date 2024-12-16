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

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
`

const SignUpPage = () => {
  usePageTitle({ title: 'Sign Up' })

  const router = useRouter()
  const { SignUpLocal, currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!currentUser) return
    // router.push(`/${currentUser.account_type}`)

    if (currentUser?.account_type === 'admin') {
      router.push(`/${currentUser.account_type}`)
    } else {
      router.push('/user/user-guide')
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

    SignUpLocal({ payload: values, callback: callback })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: COMMON_VALIDATION.Authentication.SignUpSchema,
    onSubmit: HandleSubmit,
    onReset: () => {
      setInitialValues({ ...INITIAL_VALUES })
      formik.resetForm(formik.initialValues)
    }
  })

  return (
    <Container>
      <div style={{ flex: 1 }}>
        <Formik enableReinitialize>
          <form onSubmit={formik.handleSubmit} method='POST'>
            <COMMON_COMPONENTS.Auth.FormCard
              title={'Create Account'}
              description={'Enter your information below or continue with social media account'}>

              <COMMON_COMPONENTS.Auth.SocialMedia />
              <COMMON_COMPONENTS.Auth.OrSeperator />

              <COMMON_COMPONENTS.Auth.InputField
                name={'fullname'}
                label={'Full Name'}
                placeholder={'Enter your full name'}
                type={'text'}
                leftIcon={ICON_ASSETS.USER_ICON}
                value={formik.values.fullname}
                onChange={formik.handleChange}
                error={formik.errors.fullname}
                disabled={formik.isSubmitting}
              />

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

              <COMMON_COMPONENTS.Auth.Button
                type={'submit'}
                disabled={formik.isSubmitting}
                text={'Sign Up'}
              />

              <COMMON_COMPONENTS.Auth.AlternativeFlow
                link={'/auth/sign-in'}
                linkText={'Login Now'}
                text={'Already have an account?'}
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

export default SignUpPage