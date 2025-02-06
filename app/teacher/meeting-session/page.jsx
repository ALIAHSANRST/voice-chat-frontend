'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { USER_COMPONENTS } from "@/src/components"
import { ROUTES } from "@/src/utils/routes"

const MeetingSessionPage = ({ searchParams }) => {
  const { id } = searchParams
  const router = useRouter();

  useEffect(() => {
    if (id) return;
    router.push(ROUTES.TEACHER_HOME.path)
  }, [])

  return (
    <>
      {id && <USER_COMPONENTS.MeetingSession id={id} />}
    </>
  )
}

export default MeetingSessionPage