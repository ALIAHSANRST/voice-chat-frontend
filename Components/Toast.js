// ToastComponent.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
    });
};

export const showErrorToast = (message) => {
    toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
    });
};

export const showInfoToast = (message) => {
    toast.info(message, {
        position: 'top-right',
        autoClose: 3000,
    });
};

export const showWarningToast = (message) => {
    toast.warn(message, {
        position: 'top-right',
        autoClose: 3000,
    });
};

const ToastComponent = () => {
    return <ToastContainer limit={3} newestOnTop pauseOnHover />;
};

export default ToastComponent;
