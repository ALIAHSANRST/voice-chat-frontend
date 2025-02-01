import { COMMON_COMPONENTS } from '@/src/components';
import BaseAPI, { HandleError } from '@/src/utils/api';

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

const SaveTeacherSlots = async ({ setIsLoading, slots, translations }) => {
  setIsLoading(true)

  try {
    const ENDPOINT = `/teacher/slots`
    await BaseAPI.post(ENDPOINT, { slots })

    COMMON_COMPONENTS.Toast.showSuccessToast(translations.MANAGE_SLOTS.SUCCESS.SAVED);
  } catch (error) {
    console.error('SaveTeacherSlots:', error)
    HandleError(error, 'Failed To Save Teacher Slots')
  } finally {
    setIsLoading(false)
  }
}

export {
  GetTeacherSlots,
  SaveTeacherSlots,
}