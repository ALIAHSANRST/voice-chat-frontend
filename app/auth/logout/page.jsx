'use client'

import { useEffect } from 'react';

import { COMMON_CONTEXT } from '@/src/context';
import { usePageTitle } from '@/src/hooks';

const LogoutPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  usePageTitle({ title: translations.LOGOUT.TITLE })

  const { Logout } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext()

  useEffect(() => {
    Logout()
  }, [])

  return (
    <></>
  );
};

export default LogoutPage