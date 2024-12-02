'use client';

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message, options) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    ...options,
  });
};

export const showErrorToast = (message, options) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    ...options,
  });
};

export const showInfoToast = (message, options) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    ...options,
  });
};

export const showWarningToast = (message, options) => {
  toast.warn(message, {
    position: 'top-right',
    autoClose: 3000,
    ...options,
  });
};

const ToastComponent = ({ limit = 3, newestOnTop = true, pauseOnHover = true }) => {
  return <ToastContainer limit={limit} newestOnTop={newestOnTop} pauseOnHover={pauseOnHover} />;
};

export default ToastComponent;