import { showErrorToast, showSuccessToast } from '@/src/components/Toast';
import BaseAPI from '@/src/utils/api';

const SubmitFeedback = async ({
  payload,
  setIsSubmitting,
}) => {
  setIsSubmitting(true)

  try {
    const ENDPOINT = `/feedback`
    const response = await BaseAPI.post(ENDPOINT, payload)

    if (response.data.success) showSuccessToast(response.data.message)
    else showErrorToast('Something Went Wrong!')
  } catch (error) {
    console.error('SubmitFeedback:', error)
    showErrorToast(error?.response?.data?.message || 'Failed To Submit Feedback!');
  } finally {
    setIsSubmitting(false)
  }
}

export {
  SubmitFeedback
}