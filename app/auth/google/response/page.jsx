'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import LoaderFullScreen from "@/src/components/LoaderFullScreen";
import { useAuthenticationContext } from "@/src/context/AuthenticationContext";

const GoogleAuthResponsePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setCurrentUser } = useAuthenticationContext();

  useEffect(() => {
    const success = searchParams.get('success');
    const userData = JSON.parse(searchParams.get('userData'));
    const token = searchParams.get('token');

    if (success && userData && token) {
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', token);

      setCurrentUser(userData);

      if (userData?.account_type === 'admin') {
        router.push(`/${userData.account_type}`);
      } else if (userData?.account_type === 'user') {
        router.push('/user/user-guide');
      } else {
        router.push('/');
      }
    }

    if (!success) {
      const error = searchParams.get('error');
      const message = searchParams.get('message');
      showErrorToast(message);
      console.error(error);
    }
  }, [router, searchParams]);

  return <LoaderFullScreen message="Logging in with Google..." />
}

export default GoogleAuthResponsePage;