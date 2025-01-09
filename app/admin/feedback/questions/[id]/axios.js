'use client'

import BaseAPI, { HandleError } from "@/src/utils/api"
import { CapitalizeWords } from "@/src/utils/helpers"
import { COMMON_COMPONENTS } from "@/src/components"
import { ROUTES } from "@/src/utils/routes"

/**
 * Fetches a feedback question by ID and sets the form values
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Question ID to fetch
 * @param {Function} params.setInitialValues - Function to set form initial values
 * @param {Function} params.setIsLoading - Loading state setter
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const GetQuestion = async ({
  id,
  setInitialValues,
  setIsLoading
}) => {
  // validate required params
  if (!id || !setInitialValues || !setIsLoading) {
    throw new Error('GetQuestion: Required parameters missing')
  }

  try {
    const ENDPOINT = `/feedback/question/${id}`
    const response = await BaseAPI.get(ENDPOINT)

    // validate response data
    if (!response?.data) {
      throw new Error('Invalid response format')
    }

    const { question, status, question_type, options } = response.data

    // transform and set form values
    setInitialValues({
      question: question || '',
      status: status ? {
        label: CapitalizeWords(status),
        value: status,
      } : null,
      questionType: question_type ? {
        label: CapitalizeWords(question_type),
        value: question_type,
      } : null,
      options: Array.isArray(options) ? options.map(option => ({
        text: option.text || '',
        status: option.status ? {
          label: CapitalizeWords(option.status),
          value: option.status,
        } : null,
      })) : [],
    })
  } catch (error) {
    console.error('Feedback > QuestionPage > GetQuestion:', error)
    HandleError(error, 'Failed To Fetch Question!');
  } finally {
    setIsLoading(false)
  }
}

/**
 * Updates an existing feedback question
 * @async
 * @param {Object} params - Request parameters
 * @param {Object} params.payload - Question data to update
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const UpdateQuestion = async ({ payload, setIsLoading, router }) => {
  // validate required params
  if (!payload?.id || !setIsLoading || !router) {
    throw new Error('UpdateQuestion: Required parameters missing')
  }

  setIsLoading(true)

  try {
    const ENDPOINT = `/feedback/question/${payload.id}`

    // validate and transform payload
    const data = {
      question: payload.question?.trim() || '',
      status: payload.status?.value,
      question_type: payload.questionType?.value,
      options: Array.isArray(payload.options) ? payload.options.map(option => ({
        text: option.text?.trim() || '',
        status: option.status?.value
      })) : []
    }

    const response = await BaseAPI.put(ENDPOINT, data)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Question Updated Successfully!')
    router.push(ROUTES.ADMIN_FEEDBACK_QUESTIONS.path)
  } catch (error) {
    console.error('Feedback > QuestionPage > Update:', error)
    HandleError(error, 'Failed To Update Question!');
    setIsLoading(false)
  }
}

/**
 * Deletes a feedback question by ID
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Question ID to delete
 * @param {Function} params.setIsDeleting - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const DeleteQuestion = async ({ id, setIsDeleting, router }) => {
  // validate required params
  if (!id || !setIsDeleting || !router) {
    throw new Error('DeleteQuestion: Required parameters missing')
  }

  setIsDeleting(true)

  try {
    const ENDPOINT = `/feedback/question/${id}`
    const response = await BaseAPI.delete(ENDPOINT)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Question Deleted Successfully!')
    router.push(ROUTES.ADMIN_FEEDBACK_QUESTIONS.path)
  } catch (error) {
    console.error('Feedback > QuestionPage > Delete:', error)
    HandleError(error, 'Failed To Delete Question!');
    setIsDeleting(false)
  }
}

/**
 * Creates a new feedback question
 * @async
 * @param {Object} params - Request parameters
 * @param {Object} params.payload - Question data to create
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const AddQuestion = async ({ payload, setIsLoading, router }) => {
  // validate required params
  if (!payload || !setIsLoading || !router) {
    throw new Error('AddQuestion: Required parameters missing')
  }

  setIsLoading(true)

  try {
    const ENDPOINT = '/feedback/question'

    // validate and transform payload
    const data = {
      question: payload.question?.trim() || '',
      status: payload.status?.value,
      question_type: payload.questionType?.value,
      options: Array.isArray(payload.options) ? payload.options.map(option => ({
        text: option.text?.trim() || '',
        status: option.status?.value
      })) : []
    }

    const response = await BaseAPI.post(ENDPOINT, data)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Question Added Successfully!')
    router.push(ROUTES.ADMIN_FEEDBACK_QUESTIONS.path)
  } catch (error) {
    console.error('Feedback > QuestionPage > Add:', error)
    HandleError(error, 'Failed To Add Question!');
    setIsLoading(false)
  }
}

export {
  GetQuestion,
  UpdateQuestion,
  DeleteQuestion,
  AddQuestion,
}