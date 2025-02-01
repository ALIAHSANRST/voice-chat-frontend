import BaseAPI, { HandleError } from '@/src/utils/api';

const GetTeacherStats = async ({ setIsLoading, setData, translations }) => {
  setIsLoading(true)

  try {
    const ENDPOINT = `/teacher/stats`
    const response = await BaseAPI.get(ENDPOINT)

    if (response?.data?.success) {
      const stats = response?.data?.stats
      setData([
        {
          'title': translations.TEACHER_HOME.LESSONS,
          'value': stats.totalCompletedLessons + '+'
        },
        {
          'title': translations.TEACHER_HOME.STUDENTS,
          'value': stats.totalStudents + '+'
        },
      ])
    }
  } catch (error) {
    console.error('GetTeacherStats:', error)
    HandleError(error, 'Failed To Get Teacher Stats')
  } finally {
    setIsLoading(false)
  }
}

export {
  GetTeacherStats,
}