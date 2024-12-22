import { COMMON_COMPONENTS } from '@/src/components';
import BaseAPI from '@/src/utils/api';

const GetExamHistory = async ({ limit, page, query, setIsLoading, setData }) => {
  setIsLoading(true)

  try {
    // build query params
    const queryParams = new URLSearchParams();
    if (typeof page === 'number') queryParams.set('page', page.toString());
    if (typeof limit === 'number') queryParams.set('limit', limit.toString());
    if (query?.trim()) queryParams.set('query', query.trim());

    const ENDPOINT = `/exam/result?${queryParams}`
    const response = await BaseAPI.get(ENDPOINT)

    setData(response?.data?.data)
  } catch (error) {
    console.error('GetExamHistory:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Get Exam History!')
  } finally {
    setIsLoading(false)
  }
}

export { GetExamHistory }