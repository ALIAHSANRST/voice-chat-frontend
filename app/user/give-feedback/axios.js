import BaseAPI from '@/src/utils/api';
import { COMMON_COMPONENTS } from '@/src/components';
import { ROUTES } from '@/src/utils/routes';

const GetQuestions = async ({ setIsLoading, setQuestions }) => {
  try {
    const ENDPOINT = `/feedback/question?page=1&limit=100`
    const response = await BaseAPI.get(ENDPOINT)

    setQuestions(response.data.questions)
  } catch (error) {
    console.error('GetQuestions:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Fetch Questions!')
  } finally {
    setIsLoading(false)
  }
}

const SubmitFeedback = async ({
  payload,
  setIsSubmitting,
  router
}) => {
  setIsSubmitting(true)

  payload = {
    rating: payload.rating,
    responses: Object.entries(payload)
      .filter(([key]) => key.startsWith('question_'))
      .map(([key, value]) => ({
        question_id: key.split('question_')[1],
        selected_option: Array.isArray(value) ? value : [value]
      }))
  }

  try {
    const ENDPOINT = `/feedback/response`
    const response = await BaseAPI.post(ENDPOINT, payload)

    if (response.data.success) COMMON_COMPONENTS.Toast.showSuccessToast(response.data.message)
    else COMMON_COMPONENTS.Toast.showErrorToast('Something Went Wrong!')

    router.push(ROUTES.USER_HOME.path)
  } catch (error) {
    console.error('SubmitFeedback:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Submit Feedback!')
  } finally {
    setIsSubmitting(false)
  }
}

export {
  SubmitFeedback,
  GetQuestions
}