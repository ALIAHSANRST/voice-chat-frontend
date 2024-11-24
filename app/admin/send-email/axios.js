import { showErrorToast, showSuccessToast } from '@/src/components/Toast';
import BaseAPI from '@/src/utils/api';

const SendEmail = async ({
  payload,
  setIsLoading,
}) => {
  setIsLoading(true)

  try {
    const ENDPOINT = `/email/sendToAllUsers`
    const response = await BaseAPI.post(ENDPOINT, payload)

    if (response.data.success) showSuccessToast(response.data.message)
    else showErrorToast('Something Went Wrong!')
  } catch (error) {
    console.error('SendEmail:', error)
    showErrorToast(error?.response?.data?.message || 'Failed To Send Email!');
  } finally {
    setIsLoading(false)
  }
}

export {
  SendEmail
}