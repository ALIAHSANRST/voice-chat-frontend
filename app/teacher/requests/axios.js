import { COMMON_COMPONENTS } from '@/src/components';
import BaseAPI, { HandleError } from '@/src/utils/api';

const GetRequests = async ({ limit, page, query, setIsLoading, setData }) => {
  setIsLoading(true)

  try {
    // build query params
    const queryParams = new URLSearchParams();
    if (typeof page === 'number') queryParams.set('page', page.toString());
    if (typeof limit === 'number') queryParams.set('limit', limit.toString());
    if (query?.trim()) queryParams.set('query', query.trim());

    const ENDPOINT = `/teacher/requests?${queryParams}`
    const response = await BaseAPI.get(ENDPOINT)

    setData(response?.data)
  } catch (error) {
    console.error('GetRequests:', error)
    HandleError(error, 'Failed To Get Requests')
  } finally {
    setIsLoading(false)
  }
}

const UpdateRequestStatus = async ({ payload, setIsLoading, setFilters }) => {
  setIsLoading(true)

  try {
    const ENDPOINT = '/class/request/status'
    const response = await BaseAPI.put(ENDPOINT, payload)

    if (response?.data?.success) {
      setFilters(prev => ({ ...prev, page: 1 }))
      COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message)
    }
  } catch (error) {
    console.error('UpdateRequestStatus:', error)
    HandleError(error, 'Failed To Update Request Status')
  } finally {
    setIsLoading(false)
  }
}

export {
  GetRequests,
  UpdateRequestStatus
}