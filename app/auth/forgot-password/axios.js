'use client'

import BaseAPI from "@/src/utils/api"
import { COMMON_COMPONENTS } from "@/src/components"
import { ROUTES } from "@/src/utils/routes"

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
const ResetPassword = async ({ payload, setIsLoading, router, setIsEmailSent }) => {
  // validate required params
  if (!payload?.email || !setIsLoading || !router) {
    throw new Error('ResetPassword: Required parameters missing')
  }

  setIsLoading(true)

  try {
    const ENDPOINT = `/auth/reset_password`

    const data = { email: payload.email?.trim() || '' }

    const response = await BaseAPI.post(ENDPOINT, data)

    if (response?.data?.success) {
      COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Password Reset Email Sent Successfully!')
      setIsEmailSent(true)
    } else {
      COMMON_COMPONENTS.Toast.showErrorToast(response?.data?.message || 'Failed To Reset Password!')
    }
  } catch (error) {
    console.error('Forgot Password > Reset Password:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Reset Password!')
  } finally {
    setIsLoading(false)
  }
}

export {
  ResetPassword,
}