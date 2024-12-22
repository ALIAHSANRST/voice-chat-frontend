'use client'

import BaseAPI from "@/src/utils/api"
import { DataTableDateFormat } from "@/src/utils/helpers"
import { COMMON_COMPONENTS } from "@/src/components"
import { ROUTES } from "@/src/utils/routes"

/**
 * Fetches a feedback response by ID and sets the form values
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Response ID to fetch
 * @param {Function} params.setInitialValues - Function to set form initial values
 * @param {Function} params.setIsLoading - Loading state setter
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const GetResponse = async ({
  id,
  setInitialValues,
  setIsLoading
}) => {
  // validate required params
  if (!id || !setInitialValues || !setIsLoading) {
    throw new Error('GetResponse: Required parameters missing')
  }

  try {
    const ENDPOINT = `/feedback/response/${id}`
    const response = await BaseAPI.get(ENDPOINT)

    // validate response data
    if (!response?.data?.data) {
      throw new Error('Invalid response format')
    }

    const { description, rating, user_id, responses, createdAt, updatedAt } = response.data.data

    // transform and set form values
    setInitialValues({
      description: description || 'Unknown',
      rating: rating || 0,
      user: {
        fullname: user_id?.fullname || 'Unknown',
        email: user_id?.email || 'Unknown'
      },
      responses: Array.isArray(responses) ? responses
        .filter(response => response.question_id !== null)
        .map(response => ({
          question: response.question_id?.question || 'Unknown',
          questionType: response.question_id?.question_type || 'Unknown',
          selectedOptions: Array.isArray(response.selected_option) ?
            response.selected_option.map(option => ({
              id: option._id,
              text: option.text
            })) : [],
          id: response._id
        })) : [],
      createdAt: DataTableDateFormat(createdAt),
      updatedAt: DataTableDateFormat(updatedAt)
    })
  } catch (error) {
    console.error('Feedback > ResponsePage > GetResponse:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Fetch Response!')
  } finally {
    setIsLoading(false)
  }
}

/**
 * Deletes a feedback response by ID
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Response ID to delete
 * @param {Function} params.setIsDeleting - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const DeleteResponse = async ({ id, setIsDeleting, router }) => {
  // validate required params
  if (!id || !setIsDeleting || !router) {
    throw new Error('DeleteResponse: Required parameters missing')
  }

  setIsDeleting(true)

  try {
    const ENDPOINT = `/feedback/response/${id}`
    const response = await BaseAPI.delete(ENDPOINT)

    COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Response Deleted Successfully!')
    router.push(ROUTES.ADMIN_FEEDBACK_RESPONSES.path)
  } catch (error) {
    console.error('Feedback > ResponsePage > Delete:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Delete Response!')
    setIsDeleting(false)
  }
}

export {
  GetResponse,
  DeleteResponse,
}