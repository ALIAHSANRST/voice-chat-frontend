import moment from 'moment';

import { showErrorToast } from '@/src/components/Toast';
import BaseAPI from '@/src/utils/api';

const GetAllExamResults = async ({ limit, page, query, setIsLoading, setData }) => {
  setIsLoading(true)

  try {
    const queryParams = new URLSearchParams()
    if (page) queryParams.set('page', page)
    if (limit) queryParams.set('limit', limit)
    if (query) queryParams.set('query', query)

    const ENDPOINT = `/exam/getAllExamScores?${queryParams}`
    const response = await BaseAPI.get(ENDPOINT)

    const mappedData = response.data.exams.map((item, index) => {
      return {
        ...item,
        index: ((page * limit) + index + 1) - limit,
        createdAt: moment(item.createdAt).format('hh:mm A, DD-MM-YYYY'),
        transcriptShort: item.transcript.split(' ').slice(0, 5).join(' ').substring(0, 40) + '...',
        transcript: item.transcript,
      }
    })

    setData(mappedData)
  } catch (error) {
    setData([])
    console.error('ExamResultsPage > GetData:', error)
    showErrorToast(error?.response?.data?.message || 'Failed To Fetch Exam Results!');
  } finally {
    setIsLoading(false)
  }
}

export {
  GetAllExamResults
}