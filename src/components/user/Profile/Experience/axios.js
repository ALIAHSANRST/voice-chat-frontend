import { COMMON_COMPONENTS } from "@/src/components"
import BaseAPI from "@/src/utils/api"

const SaveChanges = async ({ payload, setIsSubmitting, currentUser, setCurrentUser }) => {
  setIsSubmitting(true)

  try {
    payload.experience = payload.experience.map(exp => {
      if (!exp.endDate) delete exp.endDate
      return exp
    })

    const ENDPOINT = `/auth/update_account`
    const response = await BaseAPI.put(ENDPOINT, payload)

    if (response.data.success) {
      const changes = {}
      for (const key in payload) if (payload[key] !== currentUser[key]) changes[key] = payload[key]
      setCurrentUser({ ...currentUser, ...changes })
      COMMON_COMPONENTS.Toast.showSuccessToast('Changes Saved!')
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