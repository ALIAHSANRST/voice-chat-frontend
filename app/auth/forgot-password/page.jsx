'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, useFormik } from 'formik';

import { INITIAL_VALUES } from './values';
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

const ForgotPasswordPage = () => {
  usePageTitle({ title: 'Forgot Password' })

  const router = useRouter()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });

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
    COMMON_COMPONENTS.Toast.showInfoToast({
      message: 'Coming Soon!'
    })
    // setSubmitting(true);

    // const callback = (currentUser) => {
    //   console.log(`currentUser: `, currentUser)

    //   setSubmitting(false);
    //   if (!currentUser) return;

    //   if (currentUser?.account_type === 'admin') {
    //     router.push('/admin');
    //   } else if (currentUser?.account_type === 'user') {
    //     // router.push('/user');
    //     router.push('/user/user-guide');
    //   } else {
    //     router.push('/');
    //   }
    // }

    // SignInLocal({ payload: values, callback: callback, isAdmin: isAdmin })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: COMMON_VALIDATION.Authentication.ForgotPasswordSchema,
    onSubmit: HandleSubmit,
  })

  return (
    <Container>
      <div style={{ flex: 1 }}>
        <Formik enableReinitialize>
          <form onSubmit={formik.handleSubmit} method='POST'>
            <COMMON_COMPONENTS.Auth.FormCard
              title={'Forgot password?'}
              description={'No worriers, we\'ll send you reset instructions'}>
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

              <COMMON_COMPONENTS.Auth.Button
                type={'submit'}
                disabled={formik.isSubmitting}
                text={'Send Email'}
              />

              <COMMON_COMPONENTS.Auth.GoBack />
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

export default ForgotPasswordPage