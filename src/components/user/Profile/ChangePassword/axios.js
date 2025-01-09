import { COMMON_COMPONENTS } from "@/src/components"
import BaseAPI from "@/src/utils/api"
import { ROUTES } from "@/src/utils/routes"

const SaveChanges = async ({ payload, setIsSubmitting, router }) => {
  setIsSubmitting(true)

  try {
    const ENDPOINT = `/auth/update_account`
    const response = await BaseAPI.put(ENDPOINT, payload)

    if (response.data.success) {
      COMMON_COMPONENTS.Toast.showSuccessToast('Changes Saved, Please Login Again!')
      router.push(ROUTES.LOGOUT.path)
    }
    else COMMON_COMPONENTS.Toast.showErrorToast('Something Went Wrong!')
  } catch (error) {
    console.error('SaveChanges:', error)
    COMMON_COMPONENTS.Toast.showErrorToast(error?.response?.data?.message || 'Failed To Save Changes!')
  } finally {
    setIsSubmitting(false)
  }
}

export { SaveChanges }