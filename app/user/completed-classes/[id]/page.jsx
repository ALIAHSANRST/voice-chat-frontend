'use client'

import { USER_COMPONENTS } from '@/src/components';

const CompletedClassDetailsPage = ({ params }) => {
  const { id } = params;

  return (
    <USER_COMPONENTS.UpcomingClasses.ViewDetails id={id} />
  )
}

export default CompletedClassDetailsPage