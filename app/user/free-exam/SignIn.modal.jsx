'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { Formik, useFormik } from 'formik';

import { INITIAL_VALUES } from './SignIn.values';
import { ICON_ASSETS } from '@/src/utils/assets';
import { COMMON_COLORS } from '@/src/utils/colors';
import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { COMMON_VALIDATION } from '@/src/validation';
import { ROUTES } from '@/src/utils/routes';

const SignInModal = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  const router = useRouter()
  const { SignInLocal } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [showPassword, setShowPassword] = useState(false);

  const HandleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const callback = (currentUser) => {
      setSubmitting(false);
      if (!currentUser) return;

      if (currentUser?.account_type === 'user') {
        router.push(ROUTES.USER_FREE_EXAM.path);
      } else {
        router.push(ROUTES.HOME.path);
      }
    }

    SignInLocal({ payload: values, callback: callback, isAdmin: false })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: COMMON_VALIDATION.Authentication.SignInSchema,
    onSubmit: HandleSubmit,
  })

  return (
    <USER_COMPONENTS.Modal.Main modalContainerStyle={{ maxWidth: '32rem', width: '100%', paddingTop: '1rem' }}>
      <Formik enableReinitialize>
        <form onSubmit={formik.handleSubmit} method='POST'>
          <COMMON_COMPONENTS.Auth.FormCard
            showLogo={false}
            containerStyle={{ padding: 0 }}
            contentWrapperStyle={{ maxWidth: '100%' }}
            title={translations.FREE_EXAM.SIGN_IN_MODAL.TITLE}
            description={translations.FREE_EXAM.SIGN_IN_MODAL.DESCRIPTION}>

            <COMMON_COMPONENTS.Auth.SocialMedia userMode={'user'} />
            <COMMON_COMPONENTS.Auth.OrSeperator />

            <COMMON_COMPONENTS.Auth.InputField
              name={'email'}
              label={translations.FREE_EXAM.SIGN_IN_MODAL.EMAIL}
              placeholder={translations.FREE_EXAM.SIGN_IN_MODAL.EMAIL_PLACEHOLDER}
              type={'email'}
              leftIcon={ICON_ASSETS.SMS_ICON}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
              disabled={formik.isSubmitting}
            />

            <COMMON_COMPONENTS.Auth.InputField
              name={'password'}
              label={translations.FREE_EXAM.SIGN_IN_MODAL.PASSWORD}
              placeholder={translations.FREE_EXAM.SIGN_IN_MODAL.PASSWORD_PLACEHOLDER}
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
              {translations.FREE_EXAM.SIGN_IN_MODAL.FORGOT_PASSWORD}
            </Link>

            <COMMON_COMPONENTS.Auth.Button
              type={'submit'}
              disabled={formik.isSubmitting}
              text={translations.FREE_EXAM.SIGN_IN_MODAL.LOGIN}
            />

            <COMMON_COMPONENTS.Auth.AlternativeFlow
              link={'/auth/sign-up'}
              linkText={translations.FREE_EXAM.SIGN_IN_MODAL.CREATE_AN_ACCOUNT}
              text={translations.FREE_EXAM.SIGN_IN_MODAL.NOT_REGISTERED_YET}
            />
          </COMMON_COMPONENTS.Auth.FormCard>
        </form>
      </Formik>
    </USER_COMPONENTS.Modal.Main>
  )
};

export default SignInModal