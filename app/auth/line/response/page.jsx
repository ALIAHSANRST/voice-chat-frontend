'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import LoaderFullScreen from "@/src/components/LoaderFullScreen";
import { useAuthenticationContext } from "@/src/context/AuthenticationContext";
import { showErrorToast } from "@/src/components/Toast";

const LineAuthResponsePage = () => {
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

    if (success === 'false') {
      const error = searchParams.get('error');
      const message = searchParams.get('message');
      console.error(error);

      showErrorToast(message);
      setTimeout(() => router.push('/sign-in'), 3000);
    }
  }, [router, searchParams]);

  return <LoaderFullScreen message="Logging in with LINE..." />
}

export default LineAuthResponsePage;