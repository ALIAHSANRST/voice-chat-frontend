"use client";

import moment from 'moment';

import BaseAPI, { HandleError } from '@/src/utils/api';
import { SLOT_DURATION_IN_MINUTES } from '@/src/utils/constants';

const FormatTime = (time, date) => {
  const timeArray = time.split(":");
  const hours = parseInt(timeArray[0]);
  const minutes = parseInt(timeArray[1]);
  const timeString = moment().hours(hours).minutes(minutes).format("hh:mm A");
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  const scheduledDate = moment(date).format("YYYY-MM-DD");

  return {
    time: `${timeString} - ${moment().hours(hours).minutes(minutes + SLOT_DURATION_IN_MINUTES).format("hh:mm A")}`,
    isToday: scheduledDate === today,
    isTomorrow: scheduledDate === tomorrow,
    isYesterday: scheduledDate === yesterday
  };
}

const GetUpcomingClass = async ({ id, setIsLoading, setData }) => {
  try {
    const ENDPOINT = `/class/${id}`
    const response = await BaseAPI.get(ENDPOINT)

    if (response?.data?.success) {
      const data = response?.data?.data
      const parsedDate = moment(data?.scheduledFor?.date).format('YYYY-MM-DD')

      data.formatted = {
        date: moment(parsedDate).format("dddd, D MMMM"),
        ...FormatTime(data?.scheduledFor?.time, parsedDate)
      }

      const classDateTime = moment(`${parsedDate} ${data?.scheduledFor?.time}`, 'YYYY-MM-DD HH:mm')
      const classEndDateTime = moment(classDateTime).add(SLOT_DURATION_IN_MINUTES, 'minutes')

      data.isExpired = moment().isAfter(classEndDateTime)
      data.isReady = moment().isBetween(classDateTime, classEndDateTime)

      setData(data)
    }
  } catch (error) {
    console.error('GetUpcomingClass:', error)
    HandleError(error, 'Failed To Get Upcoming Class')
  } finally {
    setIsLoading(false)
  }
}

export {
  GetUpcomingClass,
}