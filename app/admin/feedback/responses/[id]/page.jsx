'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Badge, Container, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'

import { ADMIN_COMPONENTS, COMMON_COMPONENTS } from '@/src/components'
import AdminLayout from '@/app/admin/layout'
import { DeleteResponse, GetResponse } from './axios'
import { ADMIN_CONSTANTS } from '@/src/utils/constants'
import { ROUTES } from '@/src/utils/routes'
import { usePageTitle } from '@/src/hooks'

/**
 * ResponsePage Component
 * 
 * A comprehensive component for viewing and managing individual feedback responses in the admin panel.
 * Implements secure data fetching, proper state management and error boundaries.
 * 
 * Features:
 * - View detailed response information including user details
 * - Display response data in organized tabular format
 * - Delete responses with confirmation
 * - Loading states and error handling
 * - Responsive layout with Bootstrap components
 * - Optimized performance with proper React hooks usage
 * - Type-safe data handling
 * - Secure routing and navigation
 * 
 * Props:
 * @param {Object} params - URL parameters containing response ID
 * @param {string} params.id - Unique identifier for the response
 * 
 * States:
 * @property {Object} initialValues - Response data with user info and answers
 * @property {boolean} isLoading - Loading state for data fetching
 * @property {boolean} isDeleting - Loading state for delete operation
 * 
 * @returns {JSX.Element} Rendered ResponsePage component
 */
const ResponsePage = ({ params }) => {
  const { id } = params
  const router = useRouter()

  // state management with proper typing
  const [initialValues, setInitialValues] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  // set dynamic page title
  usePageTitle({
    title: [
      'View Response',
      ADMIN_CONSTANTS.MODULE_TITLE
    ],
  })

  // fetch response data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await GetResponse({
        id,
        setInitialValues,
        setIsLoading
      })
    }

    fetchData()
  }, [])

  // loading state handler
  if (isLoading) {
    return (
      <ADMIN_COMPONENTS.ContentWrapper>
        <COMMON_COMPONENTS.Loader
          wrapped={true}
          message='Loading Data...'
        />
      </ADMIN_COMPONENTS.ContentWrapper>
    )
  }

  // handle missing or invalid data
  if (!isLoading && !initialValues?.description) {
    return <ADMIN_COMPONENTS.SomethingWentWrong />
  }

  // event handlers
  const handleDelete = async () => {
    await DeleteResponse({
      id,
      setIsDeleting,
      router
    })
  }

  const handleGoBack = () => {
    router.push(ROUTES.ADMIN_FEEDBACK_RESPONSES.path)
  }

  return (
    <ADMIN_COMPONENTS.ContentWrapper outerOnly={true}>
      <ADMIN_COMPONENTS.ContentWrapper innerOnly={true}>
        <p className='g-dark-text mb-0'>
          <b className='text-primary'>{'Feedback Comment: '}</b>
          {initialValues?.description?.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < initialValues?.description?.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>

        <hr className='m-0 p-0 text-muted my-2' />

        <Container className='m-0 p-0 d-flex flex-column'>
          <Container className='m-0 p-0 d-flex align-items-center justify-content-between gap-2 w-100 flex-wrap'>
            <small className='text-muted' style={{ fontSize: '0.8rem' }}>
              {initialValues?.user?.fullname}
              <span className='mx-1'>-</span>
              <Link href={`mailto:${initialValues?.user?.email}`} className='text-decoration-none text-muted'>
                {initialValues?.user?.email}
              </Link>
            </small>

            <small className='text-muted' style={{ fontSize: '0.8rem' }}>
              Submitted At: {initialValues?.createdAt}
            </small>
          </Container>
        </Container>
      </ADMIN_COMPONENTS.ContentWrapper>

      <ADMIN_COMPONENTS.ContentWrapper innerOnly={true} className='mt-3'>
        <Table responsive hover>
          <thead>
            <tr>
              <th className='g-dark-text fw-bold'>Question</th>
              <th className='g-dark-text fw-bold'>Response</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='g-dark-text'>Rating</td>
              <td title={`Rating: ${initialValues?.rating}`}>
                {
                  [...Array(initialValues?.rating || 0)].map((_, i) => (
                    <span key={i} className='text-primary'>&#9733;</span>
                  ))
                }
              </td>
            </tr>
            {initialValues?.responses?.map((response) => (
              <tr key={response.id}>
                <td className='g-dark-text'>{response.question}</td>
                <td>
                  {response.selectedOptions.map((option, index) => (
                    <Badge key={option.id} bg="dark" className="me-1" >
                      {option.text || 'Unknown'}
                    </Badge>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ADMIN_COMPONENTS.ContentWrapper>

      <ADMIN_COMPONENTS.FormActionsFooter
        showSaveButton={false}
        showResetButton={false}
        showDeleteButton={true}
        showBackButton={true}
        isDeleting={isDeleting}
        deleteDialog={{
          title: 'Warning',
          body: [
            'Are you sure you want to delete this response?',
            'This action cannot be undone!'
          ]
        }}
        handleDelete={handleDelete}
        handleGoBack={handleGoBack}
      />
    </ADMIN_COMPONENTS.ContentWrapper>
  )
}

ResponsePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default ResponsePage