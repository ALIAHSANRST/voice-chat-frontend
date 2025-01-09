'use client'

import BaseAPI, { HandleError } from "@/src/utils/api"
import { COMMON_COMPONENTS } from "@/src/components"
import { ROUTES } from "@/src/utils/routes"

/**
 * Updates user password with reset token
 * @async
 * @param {Object} params - Request parameters
 * @param {Object} params.payload - Password and token data
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.router - Router instance
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const UpdatePassword = async ({ payload, setIsLoading, router }) => {
  // validate required params
  if (!payload?.password || !payload?.token || !setIsLoading || !router) {
    throw new Error('UpdatePassword: Required parameters missing')
  }

  setIsLoading(true)

  try {
    const ENDPOINT = `/auth/verify_reset_password`

    const data = {
      password: payload.password?.trim() || '',
      token: payload.token?.trim() || ''
    }

    const response = await BaseAPI.post(ENDPOINT, data)

    if (response?.data?.success) {
      COMMON_COMPONENTS.Toast.showSuccessToast(response?.data?.message || 'Password Updated Successfully!')
      router.push(ROUTES.SIGN_IN.path)
    } else {
      COMMON_COMPONENTS.Toast.showErrorToast(response?.data?.message || 'Failed To Update Password!')
    }
  } catch (error) {
    console.error('Forgot Password > Update Password:', error)
    HandleError(error, 'Failed To Update Password!');
  } finally {
    setIsLoading(false)
  }
}

export {
  UpdatePassword,
}