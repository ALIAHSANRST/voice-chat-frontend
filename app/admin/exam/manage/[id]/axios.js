'use client'

import BaseAPI from "@/src/utils/api"
import { CapitalizeWords, DataTableDateFormat } from "@/src/utils/helpers"
import { COMMON_COMPONENTS } from "@/src/components"
import { ROUTES } from "@/src/utils/routes"

/**
 * Fetches an exam by ID and sets the form values
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Exam ID to fetch
 * @param {Function} params.setInitialValues - Function to set form initial values
 * @param {Function} params.setIsLoading - Loading state setter
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const GetExam = async ({
  id,
  setInitialValues,
  setIsLoading
}) => {
  // validate required params
  if (!id || !setInitialValues || !setIsLoading) {
    throw new Error('GetExam: Required parameters missing')
  }

  try {
    const ENDPOINT = `/exam/manage/${id}`
    const response = await BaseAPI.get(ENDPOINT)

    // validate response data
    if (!response?.data) {
      throw new Error('Invalid response format')
    }

    const {
      name, description, total_marks, word_limit, sentence_limit,
      complexity_levels, rubrics_levels, status,
      updatedAt, createdAt, updatedBy, createdBy
    } = response.data.data

    // transform complexity levels to match form format
    const formattedComplexityLevels = complexity_levels?.map(level => ({
      label: CapitalizeWords(level),
      value: level
    })) || []

    // transform and set form values
    setInitialValues({
      name: name || '',
      description: description || '',
      total_marks: total_marks || '',
      word_limit: word_limit || '',
      sentence_limit: sentence_limit || '',
      complexity_levels: formattedComplexityLevels,
      rubrics_levels: rubrics_levels || [],
      status: status ? {
        label: CapitalizeWords(status),
        value: status,
      } : null,
      updatedAt: DataTableDateFormat(updatedAt),
      createdAt: DataTableDateFormat(createdAt),
      updatedBy: updatedBy?.fullname || 'Unknown',
      createdBy: createdBy?.fullname || 'Unknown',
    })
  } catch (error) {
    console.error('Exam > ManagePage > GetExam:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Fetch Exam!')
  } finally {
    setIsLoading(false)
  }
}
/**
 * Updates an existing exam
 * @async
 * @param {Object} params - Request parameters
 * @param {Object} params.payload - Exam data to update
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const UpdateExam = async ({ payload, setIsLoading, router }) => {
  // validate required params
  if (!payload?.id || !setIsLoading || !router) {
    throw new Error('UpdateExam: Required parameters missing')
  }

  setIsLoading(true)

  try {
    const ENDPOINT = `/exam/manage/${payload.id}`

    const data = {
      name: payload.name,
      description: payload.description,
      total_marks: payload.total_marks,
      complexity_levels: payload.complexity_levels?.map(level => level.value) || [],
      rubrics_levels: payload.rubrics_levels?.map(level => ({
        level_name: level.level_name,
        level_description: level.level_description || '',
        upper_percentage: level.upper_percentage,
        lower_percentage: level.lower_percentage
      })) || [],
      status: payload.status?.value || null
    }

    if (payload.word_limit) data.word_limit = payload.word_limit
    if (payload.sentence_limit) data.sentence_limit = payload.sentence_limit

    const response = await BaseAPI.put(ENDPOINT, data)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Exam Updated Successfully!')
    router.push(ROUTES.ADMIN_EXAM_MANAGE.path)
  } catch (error) {
    console.error('Exam > ManagePage > UpdateExam:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Update Exam!')
  } finally {
    setIsLoading(false)
  }
}

/**
 * Deletes an exam by ID
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Exam ID to delete
 * @param {Function} params.setIsDeleting - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const DeleteExam = async ({ id, setIsDeleting, router }) => {
  // validate required params
  if (!id || !setIsDeleting || !router) {
    throw new Error('DeleteExam: Required parameters missing')
  }

  setIsDeleting(true)

  try {
    const ENDPOINT = `/exam/manage/${id}`
    const response = await BaseAPI.delete(ENDPOINT)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Exam Deleted Successfully!')
    router.push(ROUTES.ADMIN_EXAM_MANAGE.path)
  } catch (error) {
    console.error('Exam > ManagePage > Delete:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Delete Exam!')
    setIsDeleting(false)
  }
}

/**
 * Creates a new exam
 * @async
 * @param {Object} params - Request parameters
 * @param {Object} params.payload - Exam data to create
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const AddExam = async ({ payload, setIsLoading, router }) => {
  // validate required params
  if (!payload || !setIsLoading || !router) {
    throw new Error('AddExam: Required parameters missing')
  }

  setIsLoading(true)

  try {
    const ENDPOINT = '/exam/manage'

    const data = {
      name: payload.name,
      description: payload.description,
      total_marks: payload.total_marks,
      complexity_levels: payload.complexity_levels?.map(level => level.value),
      rubrics_levels: payload.rubrics_levels?.map(level => ({
        level_name: level.level_name,
        level_description: level.level_description,
        upper_percentage: level.upper_percentage,
        lower_percentage: level.lower_percentage
      })),
      status: payload.status?.value
    }

    if (payload.word_limit) data.word_limit = payload.word_limit
    if (payload.sentence_limit) data.sentence_limit = payload.sentence_limit

    const response = await BaseAPI.post(ENDPOINT, data)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Exam Added Successfully!')
    router.push(ROUTES.ADMIN_EXAM_MANAGE.path) // fixed path
  } catch (error) {
    console.error('Exam > ManagePage > Add:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Add Exam!')
    setIsLoading(false)
  }
}

export {
  GetExam,
  UpdateExam,
  DeleteExam,
  AddExam,
}