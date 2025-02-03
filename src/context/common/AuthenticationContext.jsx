'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import BaseAPI from '@/src/utils/api';
import { COMMON_COMPONENTS } from '@/src/components';
import { useLocalStorage } from '@/src/hooks';
import { GetPublicRoutes, ROUTES } from '@/src/utils/routes';
import { COMMON_CONTEXT } from '@/src/context';
import { ROLES } from '@/src/utils/constants';

const AuthenticationContext = createContext();

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
  const [currentUser, setCurrentUser, clearCurrentUser] = useLocalStorage('user', null);
  const [token, setToken, clearToken] = useLocalStorage('token', null);
  const [completionPercentage, setCompletionPercentage] = useLocalStorage('completion', 0);
  const { currentLanguage } = COMMON_CONTEXT.TranslationContext.useTranslation();

  const [isCheckingUserStatus, setIsCheckingUserStatus] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      if (!GetPublicRoutes().includes(window.location.pathname.toLowerCase())) {
        window.location.href = ROUTES.HOME.path;
        window.onload = () => setIsCheckingUserStatus(false);
      } else {
        setIsCheckingUserStatus(false);
      }

      return;
    }

    if (window.location.pathname.toLowerCase() === ROUTES.LOGOUT.path) {
      Logout();
      return;
    }

    const isAdmin = currentUser.account_type === ROLES.ADMIN
    const isStudent = currentUser.account_type === ROLES.STUDENT
    const isTeacher = currentUser.account_type === ROLES.TEACHER

    const _ = window.location.pathname.split('/')
    const module = _.length > 1 ? _[1] : null

    if (!module) return setIsCheckingUserStatus(false);

    if (isAdmin && module !== ROLES.ADMIN) {
      window.location.href = ROUTES.ADMIN_HOME.path
    } else if (isStudent && module !== ROLES.STUDENT) {
      window.location.href = ROUTES.USER_HOME.path
    } else if (isTeacher && module !== ROLES.TEACHER) {
      window.location.href = ROUTES.TEACHER_HOME.path
    }

    setIsCheckingUserStatus(false);
  }, [])

  useEffect(() => {
    if (!currentUser) return;
    const percentage = CalculateProfileCompletionPercentage(currentUser);
    setCompletionPercentage(percentage);
  }, [currentUser])

  const CalculateProfileCompletionPercentage = (user) => {
    if (!user) return 0;
    if (!user.account_type === ROLES.ADMIN) return 100;

    if (user.account_type === ROLES.STUDENT) {
      const requiredFields = ['fullname', 'email', 'profile_picture'];
      const completedFields = requiredFields.filter(field => user[field]);
      return Math.round((completedFields.length / requiredFields.length) * 100);
    }

    if (user.account_type === ROLES.TEACHER) {
      const requiredFields = ['fullname', 'email', 'profile_picture', 'linkedInProfile', 'location', 'experience', 'introductory', 'slots'];
      const completedFields = requiredFields.filter(field => user[field]);
      return Math.round((completedFields.length / requiredFields.length) * 100);
    }
  }

  const DeleteAccount = async () => {
    try {
      await BaseAPI.delete('/auth/delete_account');
      Logout();
      COMMON_COMPONENTS.Toast.showSuccessToast('Account Deleted Successfully!');
    } catch (error) {
      console.log(`Error in DeleteAccount: ${error}`);
      COMMON_COMPONENTS.Toast.showErrorToast('Failed to Delete Account. Please Try Again Later!');
    }
  }

  const SignUpLocal = async ({ payload, callback }) => {
    try {
      const response = await BaseAPI.post('/auth/signup', payload, {
        headers: {
          'language': currentLanguage
        }
      });

      COMMON_COMPONENTS.Toast.showSuccessToast('Successfully Signed Up! Please Verify Your Email!');
      callback(response.data.user)
    } catch (error) {
      console.log(`Error in SignUpLocal: ${error}`)
      COMMON_COMPONENTS.Toast.showErrorToast(
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        "Something Went Wrong!"
      );
      callback(null)
    }
  }

  const SignInLocal = async ({ payload, callback }) => {
    try {
      const response = await BaseAPI.post('/auth/login', payload, {
        headers: {
          'language': currentLanguage
        }
      });

      if (response.data.user.account_type !== payload.account_type) {
        COMMON_COMPONENTS.Toast.showErrorToast('Invalid Email or Password!');
        callback(null);
        return;
      }

      setToken(response.data.token);
      setCurrentUser(response.data.user);

      COMMON_COMPONENTS.Toast.showSuccessToast('Successfully Signed In!');
      callback(response.data.user)
    } catch (error) {
      console.log(`Error in SignInLocal: ${error}`)
      COMMON_COMPONENTS.Toast.showErrorToast(
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        "Something Went Wrong!"
      );
      callback(null)
    }
  }

  const Logout = () => {
    clearCurrentUser();
    clearToken();
    window.location.href = ROUTES.SIGN_IN.path;
  };

  return (
    <AuthenticationContext.Provider value={{
      currentUser,
      setCurrentUser,
      clearCurrentUser,
      completionPercentage,
      token,
      setToken,
      clearToken,
      SignUpLocal,
      SignInLocal,
      Logout,
      DeleteAccount,
    }}>
      {isCheckingUserStatus && <COMMON_COMPONENTS.LoaderFullScreen message={'Loading...'} />}
      {!isCheckingUserStatus && children}
    </AuthenticationContext.Provider>
  );
};