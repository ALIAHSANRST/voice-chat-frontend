'use client'

import { useEffect } from 'react';

import { useAuthenticationContext } from '@/src/context/AuthenticationContext';
import usePageTitle from '@/src/hooks/usePageTitle';

const LogoutPage = () => {
  usePageTitle('Logout')

  const { Logout } = useAuthenticationContext()

  useEffect(() => {
    Logout()
  }, [])

  return (
    <></>
  );
};

export default LogoutPage