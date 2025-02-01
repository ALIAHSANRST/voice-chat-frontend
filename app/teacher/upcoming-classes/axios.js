import BaseAPI, { HandleError } from '@/src/utils/api';

const GetUpcomingClasses = async ({ limit, page, query, setIsLoading, setData }) => {
  setIsLoading(true)

  try {
    // build query params
    const queryParams = new URLSearchParams();
    if (typeof page === 'number') queryParams.set('page', page.toString());
    if (typeof limit === 'number') queryParams.set('limit', limit.toString());
    if (query?.trim()) queryParams.set('query', query.trim());

    const ENDPOINT = `/class?${queryParams}`;
    const response = await BaseAPI.get(ENDPOINT)

    setData(response?.data)
  } catch (error) {
    console.error('GetUpcomingClasses:', error)
    HandleError(error, 'Failed To Get Upcoming Classes')
  } finally {
    setIsLoading(false)
  }
}

export {
  GetUpcomingClasses,
}