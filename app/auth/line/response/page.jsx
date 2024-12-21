'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import { COMMON_COMPONENTS } from "@/src/components";
import { COMMON_CONTEXT } from "@/src/context";

const LineAuthResponsePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setCurrentUser, setToken } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  useEffect(() => {
    const success = searchParams.get('success');
    const userData = JSON.parse(searchParams.get('userData'));
    const token = searchParams.get('token');

    if (success && userData && token) {
      setCurrentUser(userData);
      setToken(token);

      if (userData?.account_type === 'admin') {
        router.push(`/${userData.account_type}`);
      } else if (userData?.account_type === 'user') {
        router.push('/user');
      } else {
        router.push('/');
      }
    }

    if (success === 'false') {
      const error = searchParams.get('error');
      const message = searchParams.get('message');
      console.error(error);

      COMMON_COMPONENTS.Toast.showErrorToast(message);
      setTimeout(() => router.push('/auth/sign-in'), 3000);
    }
  }, [router, searchParams]);

  return <COMMON_COMPONENTS.LoaderFullScreen message="Logging in with LINE..." />
}

export default LineAuthResponsePage;