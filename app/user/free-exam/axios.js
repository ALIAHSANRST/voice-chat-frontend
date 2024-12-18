import { COMMON_COMPONENTS } from '@/src/components';
import BaseAPI from '@/src/utils/api';

const GetExamScript = async ({
  setIsLoadingExamScript,
  setExamScript,
  setExamMeta
}) => {
  setIsLoadingExamScript(true)

  try {
    const ENDPOINT = `/exam/manage/random`
    const response = await BaseAPI.get(ENDPOINT)

    if (response.status === 200) {
      setExamScript(response.data?.exam?.sentences?.map(sentence => {
        const text = sentence.text.trim();
        return text.endsWith('.') ? text : `${text}.`;
      }).join(' '))
      setExamMeta({ examId: response.data?.exam?.info?._id })
    } else {
      throw new Error('Failed To Get Exam Script!')
    }
  } catch (error) {
    console.error('FreeExam > GetExamScript:', error)
    // COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Get Exam Script!')
  } finally {
    setIsLoadingExamScript(false)
  }
}

export { GetExamScript }