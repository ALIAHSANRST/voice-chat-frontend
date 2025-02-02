'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import { COMMON_COMPONENTS } from "@/src/components";
import { COMMON_CONTEXT } from "@/src/context";
import { usePageTitle } from "@/src/hooks"

const GoogleAuthResponsePage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()
  usePageTitle({ title: translations.GOOGLE_AUTH_RESPONSE.TITLE })

  const router = useRouter();
  const searchParams = useSearchParams();
  const { setCurrentUser, setToken } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  useEffect(() => {
    const _ = async () => {
      const success = searchParams.get('success');
      const userData = JSON.parse(searchParams.get('userData'));
      const token = searchParams.get('token');

      if (success && userData && token) {
        setToken(token);
        setCurrentUser(userData);

        router.push(`/${userData?.account_type || ''}`);
      }

      if (success === 'false') {
        const error = searchParams.get('error');
        const message = searchParams.get('message');
        console.error(error);

        COMMON_COMPONENTS.Toast.showErrorToast(message);
        setTimeout(() => router.push('/auth/sign-in'), 3000);
      }
    }

    _();
  }, [router, searchParams]);

  return <COMMON_COMPONENTS.LoaderFullScreen message={translations.GOOGLE_AUTH_RESPONSE.MESSAGE} />
}

export default GoogleAuthResponsePage;