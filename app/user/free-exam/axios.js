import { showErrorToast } from '@/src/components/Toast';
import BaseAPI from '@/src/utils/api';

const GetExamScript = async ({
  setIsLoadingExamScript,
  setExamScript
}) => {
  setIsLoadingExamScript(true)

  try {
    const ENDPOINT = `/examScript`
    const response = await BaseAPI.get(ENDPOINT)

    if (response.status === 200) setExamScript(response.data?.data?.content || 'No Exam Script Found!')
    else if (response.status === 404) { }
    else showErrorToast('Something Went Wrong!')
  } catch (error) {
    console.error('GetExamScript:', error)
    showErrorToast(error?.response?.data?.message || 'Failed To Get Exam Script!');
  } finally {
    setIsLoadingExamScript(false)
  }
}

export {
  GetExamScript
}