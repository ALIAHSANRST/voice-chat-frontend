'use client'

import BaseAPI, { HandleError } from "@/src/utils/api"
import { CapitalizeWords, DataTableDateFormat } from "@/src/utils/helpers"
import { COMMON_COMPONENTS } from "@/src/components"
import { ROUTES } from "@/src/utils/routes"

/**
 * Fetches an exam sentence by ID and sets the form values
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Sentence ID to fetch
 * @param {Function} params.setInitialValues - Function to set form initial values
 * @param {Function} params.setIsLoading - Loading state setter
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const GetSentence = async ({
  id,
  setInitialValues,
  setIsLoading
}) => {
  // validate required params
  if (!id || !setInitialValues || !setIsLoading) {
    throw new Error('GetSentence: Required parameters missing')
  }

  try {
    const ENDPOINT = `/exam/sentence/${id}`
    const response = await BaseAPI.get(ENDPOINT)

    // validate response data
    if (!response?.data) {
      throw new Error('Invalid response format')
    }

    const { text, status, complexity_level, updatedAt, createdAt, updatedBy, createdBy } = response.data.data

    // transform and set form values
    setInitialValues({
      text: text || '',
      status: status ? {
        label: CapitalizeWords(status),
        value: status,
      } : null,
      complexity_level: complexity_level ? {
        label: CapitalizeWords(complexity_level),
        value: complexity_level,
      } : null,
      updatedAt: DataTableDateFormat(updatedAt),
      createdAt: DataTableDateFormat(createdAt),
      updatedBy: updatedBy?.fullname || 'Unknown',
      createdBy: createdBy?.fullname || 'Unknown',
    })
  } catch (error) {
    console.error('Exam > SentencePage > GetSentence:', error)
    HandleError(error, 'Failed To Fetch Sentence!');
  } finally {
    setIsLoading(false)
  }
}

/**
 * Updates an existing exam sentence
 * @async
 * @param {Object} params - Request parameters
 * @param {Object} params.payload - Sentence data to update
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const UpdateSentence = async ({ payload, setIsLoading, router }) => {
  // validate required params
  if (!payload?.id || !setIsLoading || !router) {
    throw new Error('UpdateSentence: Required parameters missing')
  }

  setIsLoading(true)

  try {
    const ENDPOINT = `/exam/sentence/${payload.id}`

    // validate and transform payload
    const data = {
      text: payload.text?.trim() || '',
      status: payload.status?.value,
      complexity_level: payload.complexity_level?.value
    }

    const response = await BaseAPI.put(ENDPOINT, data)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Sentence Updated Successfully!')
    router.push(ROUTES.ADMIN_EXAM_SENTENCES.path)
  } catch (error) {
    console.error('Exam > SentencePage > Update:', error)
    HandleError(error, 'Failed To Update Sentence!');
    setIsLoading(false)
  }
}

/**
 * Deletes an exam sentence by ID
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Sentence ID to delete
 * @param {Function} params.setIsDeleting - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const DeleteSentence = async ({ id, setIsDeleting, router }) => {
  // validate required params
  if (!id || !setIsDeleting || !router) {
    throw new Error('DeleteSentence: Required parameters missing')
  }

  setIsDeleting(true)

  try {
    const ENDPOINT = `/exam/sentence/${id}`
    const response = await BaseAPI.delete(ENDPOINT)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Sentence Deleted Successfully!')
    router.push(ROUTES.ADMIN_EXAM_SENTENCES.path)
  } catch (error) {
    console.error('Exam > SentencePage > Delete:', error)
    HandleError(error, 'Failed To Delete Sentence!');
    setIsDeleting(false)
  }
}

/**
 * Creates a new exam sentence
 * @async
 * @param {Object} params - Request parameters
 * @param {Object} params.payload - Sentence data to create
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const AddSentence = async ({ payload, setIsLoading, router }) => {
  // validate required params
  if (!payload || !setIsLoading || !router) {
    throw new Error('AddSentence: Required parameters missing')
  }

  setIsLoading(true)

  try {
    const ENDPOINT = '/exam/sentence'

    // validate and transform payload
    const data = {
      text: payload.text?.trim() || '',
      status: payload.status?.value,
      complexity_level: payload.complexity_level?.value
    }

    const response = await BaseAPI.post(ENDPOINT, data)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Sentence Added Successfully!')
    router.push(ROUTES.ADMIN_EXAM_SENTENCES.path)
  } catch (error) {
    console.error('Exam > SentencePage > Add:', error)
    HandleError(error, 'Failed To Add Sentence!');
    setIsLoading(false)
  }
}

export {
  GetSentence,
  UpdateSentence,
  DeleteSentence,
  AddSentence,
}