import BaseAPI, { HandleError } from '@/src/utils/api';

const GetStudents = async ({ limit, page, query, setIsLoading, setData }) => {
  setIsLoading(true)

  try {
    // build query params
    const queryParams = new URLSearchParams();
    if (typeof page === 'number') queryParams.set('page', page.toString());
    if (typeof limit === 'number') queryParams.set('limit', limit.toString());
    if (query?.trim()) queryParams.set('query', query.trim());

    const ENDPOINT = `/teacher/students?${queryParams}`;
    const response = await BaseAPI.get(ENDPOINT)

    setData(response?.data)
  } catch (error) {
    console.error('GetStudents:', error)
    HandleError(error, 'Failed To Get Requests')
  } finally {
    setIsLoading(false)
  }
}

export {
  GetStudents,
}