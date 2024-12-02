'use client'

import { Formik } from 'formik'
import { Row, Col, Form } from 'react-bootstrap'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Select from 'react-select'

import AdminLayout from '@/app/admin/layout'
import { ADMIN_COMPONENTS, COMMON_COMPONENTS } from '@/src/components'
import { ADMIN_CONSTANTS } from '@/src/utils/constants'
import { ADMIN_VALIDATION } from '@/src/validation'
import { AddSentence, DeleteSentence, GetSentence, UpdateSentence } from './axios'
import { INITIAL_VALUES, STATUS_OPTIONS, COMPLEXITY_LEVELS } from './values'
import { ROUTES } from '@/src/utils/routes'
import { SelectMenuDisabledStyle } from '@/src/utils/styles'
import { usePageTitle } from '@/src/hooks'

// sub-components
const BasicInfoForm = ({ formik, isView }) => (
  <Row>
    <Col xl={12}>
      <COMMON_COMPONENTS.TextField
        name='text'
        disable={isView}
        formik={formik}
        label='Sentence'
        placeholder='Type Sentence Here...'
        as='textarea'
      />
    </Col>

    <Col sm={12} md={6} lg={4} xl={3}>
      <Form.Group className='mb-3'>
        <Form.Label>Status</Form.Label>
        <Select
          styles={isView && SelectMenuDisabledStyle}
          isDisabled={isView}
          key='status'
          name='status'
          instanceId='status'
          placeholder='Choose Status'
          isSearchable={false}
          onChange={(data) => formik.setFieldValue('status', data)}
          options={STATUS_OPTIONS}
          value={formik.values.status}
        />
        {formik.errors.status && formik.touched.status && (
          <Form.Text className='text-danger'>
            {formik.errors.status.value}
          </Form.Text>
        )}
      </Form.Group>
    </Col>

    <Col sm={12} md={6} lg={4} xl={3}>
      <Form.Group className='mb-3'>
        <Form.Label>Complexity Level</Form.Label>
        <Select
          styles={isView && SelectMenuDisabledStyle}
          isDisabled={isView}
          key='complexityLevel'
          name='complexityLevel'
          instanceId='complexityLevel'
          placeholder='Choose Complexity Level'
          isSearchable={false}
          onChange={(data) => formik.setFieldValue('complexity_level', data)}
          options={COMPLEXITY_LEVELS}
          value={formik.values.complexity_level}
        />
        {formik.errors.complexity_level && formik.touched.complexity_level && (
          <Form.Text className='text-danger'>
            {formik.errors.complexity_level.value}
          </Form.Text>
        )}
      </Form.Group>
    </Col>
  </Row>
)

/**
 * SentencePage Component
 * 
 * A comprehensive form component for managing exam sentences in the admin panel.
 * Implements CRUD operations with proper validation and error handling.
 * 
 * Features:
 * - Create new sentences
 * - Edit existing sentences
 * - View sentence details in read-only mode
 * - Delete sentences with confirmation
 * - Form validation using Formik
 * - Responsive layout with Bootstrap
 * - Loading states and error boundaries
 * - Optimized re-renders using proper React hooks
 * - Proper type checking and error handling
 * 
 * Props:
 * @param {Object} params - URL parameters
 * @param {string} params.id - Sentence ID for edit/view modes
 * 
 * States:
 * @property {Object} initialValues - Form's initial state
 * @property {boolean} isLoading - Loading state for async operations
 * @property {boolean} isDeleting - Deleting state for async operations
 * 
 * URL Parameters:
 * - edit=true: Enables edit mode
 * - view=true: Enables view-only mode
 * 
 * @returns {JSX.Element} Rendered SentencePage component
 */
const SentencePage = ({ params }) => {
  const { id } = params
  const router = useRouter()
  const searchParams = useSearchParams()

  // check for invalid edit/view params and redirect
  const editParam = searchParams.get('edit')
  const viewParam = searchParams.get('view')

  useEffect(() => {
    if ((editParam && editParam !== 'true') || (viewParam && viewParam !== 'true')) {
      router.push(ROUTES.ADMIN_EXAM_SENTENCES.path)
      return
    }
  }, [editParam, viewParam])

  // determine page mode from URL params
  const isEdit = editParam?.toLowerCase() === 'true'
  const isView = viewParam?.toLowerCase() === 'true'

  // form and loading states with proper typing
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES)
  const [isLoading, setIsLoading] = useState(isEdit || isView)
  const [isDeleting, setIsDeleting] = useState(false)

  // set dynamic page title based on current mode
  usePageTitle({
    title: [
      id === 'add'
        ? ROUTES.ADMIN_EXAM_SENTENCES_ADD.name
        : isLoading
          ? 'Loading...'
          : isEdit
            ? 'Edit Sentence'
            : 'View Sentence',
      ADMIN_CONSTANTS.MODULE_TITLE
    ],
  })

  // fetch sentence data on mount for edit/view modes
  useEffect(() => {
    const fetchData = async () => {
      if ((!isEdit && !isView) || !id) return

      await GetSentence({
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

  // handle missing data in edit/view modes
  if ((isEdit || isView) && !initialValues?.text) {
    return <ADMIN_COMPONENTS.SomethingWentWrong />
  }

  // form submission handler
  const handleFormSubmit = async (values) => {
    if (isEdit && !isView) {
      await UpdateSentence({
        payload: { ...values, id },
        setIsLoading,
        router
      })
    } else {
      await AddSentence({
        payload: values,
        setIsLoading,
        router
      })
    }
  }

  // form reset handler
  const handleReset = (formik) => {
    formik.resetForm()
  }

  // sentence deletion handler
  const handleDelete = async () => {
    await DeleteSentence({
      id,
      setIsDeleting,
      router
    })
  }

  // go back handler
  const handleGoBack = () => {
    router.push(ROUTES.ADMIN_EXAM_SENTENCES.path)
  }

  return (
    <ADMIN_COMPONENTS.ContentWrapper outerOnly={true}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={ADMIN_VALIDATION.Exam.Sentence.SentenceSchema}>
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <ADMIN_COMPONENTS.ContentWrapper innerOnly={true}>
              <BasicInfoForm formik={formik} isView={isView} />
            </ADMIN_COMPONENTS.ContentWrapper>

            {
              (isEdit || isView) &&
              <ADMIN_COMPONENTS.FormMetaInfo
                updatedBy={initialValues.updatedBy}
                updatedAt={initialValues.updatedAt}
                createdBy={initialValues.createdBy}
                createdAt={initialValues.createdAt}
              />
            }

            <ADMIN_COMPONENTS.FormActionsFooter
              isEdit={isEdit}
              isView={isView}
              isLoading={isLoading}
              isDeleting={isDeleting}
              resetDialog={{
                title: 'Warning',
                body: [
                  'Are you sure you want to reset this form?',
                  'This action cannot be undone!'
                ]
              }}
              deleteDialog={{
                title: 'Warning',
                body: [
                  'Are you sure you want to delete this sentence?',
                  'This action cannot be undone!'
                ]
              }}
              confirmDialog={{
                title: 'Confirmation',
                updateBody: [
                  'Are you sure you want to update this sentence?',
                  'This action cannot be undone!'
                ],
                saveBody: [
                  'Are you sure you want to save this sentence?'
                ]
              }}
              formik={formik}
              handleDelete={handleDelete}
              handleFormSubmit={handleFormSubmit}
              handleReset={handleReset}
              handleGoBack={handleGoBack}
              showDeleteButton={isEdit || isView}
            />
          </Form>
        )}
      </Formik>
    </ADMIN_COMPONENTS.ContentWrapper>
  )
}

SentencePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default SentencePage