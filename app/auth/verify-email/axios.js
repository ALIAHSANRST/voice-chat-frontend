'use client'

import BaseAPI, { HandleError } from "@/src/utils/api"
import { COMMON_COMPONENTS } from "@/src/components"

/**
 * Verifies user email with token
 * @async
 * @param {Object} params - Request parameters
 * @param {Object} params.payload - Token data
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const VerifyEmail = async ({ payload, setIsLoading, router }) => {
  // validate required params
  if (!payload?.token || !setIsLoading || !router) {
    throw new Error('VerifyEmail: Required parameters missing')
  }

  setIsLoading(true)

  try {
    const ENDPOINT = `/auth/verify_email`

    const data = { token: payload.token?.trim() || '' }

    const response = await BaseAPI.post(ENDPOINT, data)

    if (response?.data?.success) {
      COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Email Verified Successfully!')
    } else {
      COMMON_COMPONENTS.Toast.showErrorToast(response?.data?.message || 'Failed To Verify Email!')
    }
  } catch (error) {
    console.error('Verify Email > Verify Email:', error)
    HandleError(error, 'Failed To Verify Email!');
  } finally {
    setIsLoading(false)
  }
}

export {
  VerifyEmail,
}