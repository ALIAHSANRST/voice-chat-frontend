import BaseAPI, { HandleError } from '@/src/utils/api';

const GetTutorsForLobby = async ({ limit, page, query, setIsLoading, setData }) => {
  setIsLoading(true)

  try {
    // build query params
    const queryParams = new URLSearchParams();
    if (typeof page === 'number') queryParams.set('page', page.toString());
    if (typeof limit === 'number') queryParams.set('limit', limit.toString());
    if (query?.trim()) queryParams.set('query', query.trim());

    const ENDPOINT = `/teacher/lobby?${queryParams}`
    const response = await BaseAPI.get(ENDPOINT)

    setData(response?.data)
  } catch (error) {
    console.error('GetTutorsForLobby:', error)
    HandleError(error, 'Failed To Get Tutors For Lobby')
  } finally {
    setIsLoading(false)
  }
}

export { GetTutorsForLobby }