import { showErrorToast, showInfoToast, showSuccessToast } from '@/src/components/Toast';
import BaseAPI from '@/src/utils/api';

const UpdateExamScript = async ({
  payload,
  setIsSubmitting,
}) => {
  setIsSubmitting(true)

  try {
    const ENDPOINT = `/examScript`
    const response = await BaseAPI.post(ENDPOINT, payload)

    if (response.data.success) showSuccessToast(response.data.message)
    else showErrorToast('Something Went Wrong!')
  } catch (error) {
    console.error('UpdateExamScript:', error)
    showErrorToast(error?.response?.data?.message || 'Failed To Update Exam Script!');
  } finally {
    setIsSubmitting(false)
  }
}

const GetExamScript = async ({
  setIsLoading,
  setInitialValues
}) => {
  setIsLoading(true)

  try {
    const ENDPOINT = `/examScript`
    const response = await BaseAPI.get(ENDPOINT)

    if (response.status === 200) setInitialValues(response.data.data)
    else if (response.status === 404) { }
    else showErrorToast('Something Went Wrong!')
  } catch (error) {
    console.error('GetExamScript:', error)
    showErrorToast(error?.response?.data?.message || 'Failed To Get Exam Script!');
  } finally {
    setIsLoading(false)
  }
}

export {
  UpdateExamScript,
  GetExamScript
}