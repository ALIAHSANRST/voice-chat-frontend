import { COMMON_COMPONENTS } from '@/src/components';
import BaseAPI, { HandleError } from '@/src/utils/api';

const SendEmail = async ({
  payload,
  setIsLoading,
}) => {
  setIsLoading(true)

  try {
    const ENDPOINT = `/email/sendToAllUsers`
    const response = await BaseAPI.post(ENDPOINT, payload)

    if (response.data.success) COMMON_COMPONENTS.Toast.showSuccessToast(response.data.message)
    else COMMON_COMPONENTS.Toast.showErrorToast('Something Went Wrong!')
  } catch (error) {
    console.error('SendEmail:', error)
    HandleError(error, 'Failed To Send Email!');
  } finally {
    setIsLoading(false)
  }
}

export { SendEmail }