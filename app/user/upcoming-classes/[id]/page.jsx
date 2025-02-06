'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { USER_COMPONENTS } from "@/src/components"
import { ROUTES } from "@/src/utils/routes"

const UpcomingClassDetailsPage = ({ params }) => {
  const { id } = params
  const router = useRouter();

  useEffect(() => {
    if (id) return;
    router.push(ROUTES.TEACHER_HOME.path)
  }, [])

  return (
    <>
      {id && <USER_COMPONENTS.UpcomingClasses.ViewDetails id={id} />}
    </>
  )
}

export default UpcomingClassDetailsPage