import { COMMON_COMPONENTS } from '@/src/components';
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

const GetTeacherSlots = async ({ setIsLoading, setData, userId }) => {
  setIsLoading(true)

  try {
    const ENDPOINT = `/teacher/${userId}/slots`
    const response = await BaseAPI.get(ENDPOINT)

    if (response?.data?.data?.slots) {
      const data = response?.data?.data?.slots;
      delete data._id;
      setData(data)
    }
  } catch (error) {
    console.error('GetTeacherSlots:', error)
    HandleError(error, 'Failed To Get Teacher Slots')
  } finally {
    setIsLoading(false)
  }
}

const RequestTeahcer = async ({ setIsLoading, data }) => {
  setIsLoading(true)

  try {
    const ENDPOINT = `/teacher/request`
    const response = await BaseAPI.post(ENDPOINT, data)

    if (response?.data?.success) {
      COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message)
    }
  } catch (error) {
    console.error('RequestTeahcer:', error)
    HandleError(error, 'Failed To Request Teacher')
  } finally {
    setIsLoading(false)
  }
}

export {
  GetTutorsForLobby,
  GetTeacherSlots,
  RequestTeahcer,
}