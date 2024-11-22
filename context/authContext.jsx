'use client';

import { showErrorToast, showSuccessToast } from '@/Components/Toast';
import baseApi from '@/utilis/api';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setUser(user)
    }, [])

    const signup = async ({ payload, callback }) => {
        try {
            const response = await baseApi.post('/auth/signup', payload)
            setUser(response.data);
            showSuccessToast('Signup successful');
            sessionStorage.setItem('user', JSON.stringify(response.data));
            sessionStorage.setItem('token', JSON.stringify(response.data.token));
            callback(true)
        } catch (error) {
            console.log(error, 'error')
            showErrorToast(error.response.data.message);
            callback(false)
        }
    }

    const login = async ({ payload, callback }) => {
        try {
            let response;
            console.log(payload, 'payload')
            if (payload.isAdmin) {
                response = await baseApi.post('/auth/adminLogin', payload)
            } else {
                response = await baseApi.post('/auth/login', payload)
            }
            setUser(response.data);
            showSuccessToast('Login successful');
            sessionStorage.setItem('user', JSON.stringify(response.data));
            sessionStorage.setItem('token', JSON.stringify(response.data.token));
            callback(true)
        } catch (error) {
            console.log(error, 'error')
            showErrorToast(error?.response?.data?.message || "Something went wrong!");
            callback(false)
        }
    }

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, setUser, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};