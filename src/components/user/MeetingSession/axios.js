"use client";

import moment from 'moment';

import BaseAPI, { HandleError } from '@/src/utils/api';
import { SLOT_DURATION_IN_MINUTES } from '@/src/utils/constants';

const GetSessionInfo = async ({ id, setIsLoading, setData }) => {
  try {
    const ENDPOINT = `/class/${id}`
    const response = await BaseAPI.get(ENDPOINT)

    if (response?.data?.success) {
      const data = response?.data?.data
      const parsedDate = moment(data?.scheduledFor?.date).format('YYYY-MM-DD')

      const classDateTime = moment(`${parsedDate} ${data?.scheduledFor?.time}`, 'YYYY-MM-DD HH:mm')
      const classEndDateTime = moment(classDateTime).add(SLOT_DURATION_IN_MINUTES, 'minutes')

      data.isExpired = moment().isAfter(classEndDateTime)
      data.isReady = moment().isBetween(classDateTime, classEndDateTime)

      setData(data)
    }
  } catch (error) {
    console.error('GetSessionInfo:', error)
    HandleError(error, 'Failed To Get Session Info')
  } finally {
    setIsLoading(false)
  }
}

const GetStreamChatToken = async ({ id, setIsLoading, setData }) => {
  try {
    const ENDPOINT = `/class/stream-token/${id}`
    const response = await BaseAPI.get(ENDPOINT)

    if (response?.data?.success) {
      setData(response?.data?.token)
    }
  } catch (error) {
    console.error('GetStreamChatToken:', error)
    HandleError(error, 'Failed To Get Stream Chat Token')
  } finally {
    setIsLoading(false)
  }
}

const EndClass = async ({ id, setIsLoading = () => { } }) => {
  try {
    const ENDPOINT = `/class/${id}/end`
    await BaseAPI.put(ENDPOINT)
  } catch (error) {
    console.error('EndClass:', error)
    HandleError(error, 'Failed To End Class')
  } finally {
    setIsLoading(false)
  }
}

export {
  GetSessionInfo,
  GetStreamChatToken,
  EndClass,
}