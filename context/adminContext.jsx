'use client';
import { showErrorToast, showSuccessToast } from '@/Components/Toast';
import baseApi from '@/utilis/api';
import { createContext, useContext, useState } from 'react';
import moment from 'moment';

const AdminContext = createContext();

export const useAdminContext = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState()
  const [userResults, setUserResults] = useState(null);

  const getAllUserScores = async ({ limit, page, query }) => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      if (page || page > 0) queryParams.set('page', page)
      if (limit) queryParams.set('limit', limit)
      if (query) queryParams.set('query', query)
      const response = await baseApi.get(`/admin/exam/getAll?${queryParams}`)

      response.data.exams = response.data.exams.map((item, index) => {
        return {
          ...item,
          index: ((page * limit) + index + 1) - limit,
          createdAt: moment(item.createdAt).format('hh:mm A, DD-MM-YYYY'),
          transcriptShort: item.transcript.split(' ').slice(0, 5).join(' ').substring(0, 40) + '...',
          transcript: item.transcript,
        }
      })

      setUserResults(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error, 'error')
      showErrorToast(error?.response?.data?.message || 'Something went wrong!');
      callback(false)
    }
  }

  const sendEmail = async ({ payload, callback }) => {
    try {
      console.log(payload, 'payload')
      let response = await baseApi.post('/admin/sendEmail', payload)
      showSuccessToast('Email sent successfully!');
      callback(true)
    } catch (error) {
      console.log(error, 'error')
      showErrorToast(error?.response?.data?.message || 'Something went wrong!');
      callback(false)
    }
  }

  return (
    <AdminContext.Provider value={{ sendEmail, getAllUserScores, userResults, loading, setLoading }}>
      {children}
    </AdminContext.Provider>
  );
};