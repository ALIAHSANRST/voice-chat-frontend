import { COMMON_COMPONENTS } from "@/src/components"
import BaseAPI from "@/src/utils/api"
import { ROUTES } from "@/src/utils/routes"

const SaveChanges = async ({ payload, setIsSubmitting, router }) => {
  setIsSubmitting(true)

  try {
    if (payload.profilePhoto) {
      payload.profile_picture = payload.profilePhoto
      delete payload.profilePhoto
    }

    if (payload.profile_picture && !payload.profile_picture.includes('base64')) {
      delete payload.profile_picture
    }

    const ENDPOINT = `/auth/update_account`
    const response = await BaseAPI.put(ENDPOINT, payload)

    if (response.data.success) {
      COMMON_COMPONENTS.Toast.showSuccessToast('Changes Saved, Please Login Again!')
      router.push(ROUTES.LOGOUT.path)
    }
    else COMMON_COMPONENTS.Toast.showErrorToast('Something Went Wrong!')
  } catch (error) {
    console.error('SaveChanges:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(
      error?.response?.data?.errors?.[0]?.message
      || error?.response?.data?.message
      || 'Failed To Save Changes!'
    )
  } finally {
    setIsSubmitting(false)
  }
}

export { SaveChanges }