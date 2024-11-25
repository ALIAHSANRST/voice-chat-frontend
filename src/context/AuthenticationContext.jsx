'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import LoaderFullScreen from '@/src/components/LoaderFullScreen';
import { showErrorToast, showSuccessToast } from '@/src/components/Toast';
import BaseAPI from '@/src/utils/api';

const AuthenticationContext = createContext();

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingUserStatus, setIsCheckingUserStatus] = useState(true);

  useEffect(() => {
    const _currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (!_currentUser) {
      const publicPaths = ['/', '/sign-up', '/sign-in', '/logout', '/auth/line/response', '/auth/google/response'];
      const currentPath = window.location.pathname.toLowerCase();

      if (!publicPaths.includes(currentPath)) {
        window.location.href = '/';
        window.onload = () => setIsCheckingUserStatus(false);
      } else {
        setIsCheckingUserStatus(false);
      }

      return;
    }

    if (window.location.pathname.toLowerCase() === '/logout') {
      Logout();
      return;
    }

    setCurrentUser(_currentUser)

    const isAdmin = _currentUser.account_type === "admin"
    const isUser = _currentUser.account_type === "user"

    const _ = window.location.pathname.split('/')
    const module = _.length > 1 ? _[1] : null

    if (!module) return setIsCheckingUserStatus(false);

    if (isAdmin && module !== "admin") {
      window.location.href = '/admin'
    } else if (isUser && module !== "user") {
      window.location.href = '/user'
    }

    setIsCheckingUserStatus(false);
  }, [])

  const SignUpLocal = async ({ payload, callback }) => {
    try {
      const response = await BaseAPI.post('/auth/signup', payload)
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('token', response.data.token);

      setCurrentUser(response.data.user);
      showSuccessToast('Successfully Signed Up!');
      callback(response.data.user)
    } catch (error) {
      console.log(`Error in SignUpLocal: ${error}`)
      showErrorToast(
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        "Something Went Wrong!"
      );
      callback(null)
    }
  }

  const SignInLocal = async ({ payload, callback, isAdmin }) => {
    try {
      const response = await BaseAPI.post('/auth/login', payload);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('token', response.data.token);

      if (
        (response.data.user.account_type === "admin" && !isAdmin) ||
        (response.data.user.account_type === "user" && isAdmin)
      ) {
        showErrorToast("Invalid Email or Password!");
        callback(null);
        return;
      }

      setCurrentUser(response.data.user);
      showSuccessToast('Successfully Signed In!');
      callback(response.data.user)
    } catch (error) {
      console.log(`Error in SignInLocal: ${error}`)
      showErrorToast(
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        "Something Went Wrong!"
      );
      callback(null)
    }
  }

  const Logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <AuthenticationContext.Provider value={{
      currentUser,
      setCurrentUser,
      SignUpLocal,
      SignInLocal,
      Logout
    }}>
      {isCheckingUserStatus && <LoaderFullScreen />}
      {!isCheckingUserStatus && children}
    </AuthenticationContext.Provider>
  );
};