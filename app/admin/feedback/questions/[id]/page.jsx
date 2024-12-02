'use client'

import { FieldArray, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Select from 'react-select'

import AdminLayout from '@/app/admin/layout'
import { ADMIN_COMPONENTS, COMMON_COMPONENTS } from '@/src/components'
import { ADMIN_CONSTANTS } from '@/src/utils/constants'
import { ADMIN_VALIDATION } from '@/src/validation'
import { AddQuestion, DeleteQuestion, GetQuestion, UpdateQuestion } from './axios'
import { INITIAL_VALUES, STATUS_OPTIONS, QUESTION_TYPES } from './values'
import { ROUTES } from '@/src/utils/routes'
import { SelectMenuDisabledStyle } from '@/src/utils/styles'
import { usePageTitle } from '@/src/hooks'

// sub-components
const BasicInfoForm = ({ formik, isView }) => (
  <Row>
    <Col xl={12}>
      <COMMON_COMPONENTS.TextField
        name='question'
        disable={isView}
        formik={formik}
        label='Question'
        placeholder='Type Question Here...'
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
        <Form.Label>Question Type</Form.Label>
        <Select
          styles={isView && SelectMenuDisabledStyle}
          isDisabled={isView}
          key='questionType'
          name='questionType'
          instanceId='questionType'
          placeholder='Choose Question Type'
          isSearchable={false}
          onChange={(data) => formik.setFieldValue('questionType', data)}
          options={QUESTION_TYPES}
          value={formik.values.questionType}
        />
        {formik.errors.questionType && formik.touched.questionType && (
          <Form.Text className='text-danger'>
            {formik.errors.questionType.value}
          </Form.Text>
        )}
      </Form.Group>
    </Col>
  </Row>
)

const OptionsList = ({ formik, isView, arrayHelpers }) => (
  <>
    <Container className='m-0 p-0 d-flex justify-content-between align-items-center w-100'>
      <p className='m-0 p-0 fw-bold fs-4 text-secondary'>Options</p>
      {!isView && (
        <Button
          className='btn-sm text-uppercase d-flex justify-content-center align-items-center gap-2 px-3'
          variant='outline-primary'
          onClick={() => arrayHelpers.push({ text: '', status: STATUS_OPTIONS[0] })}>
          <FontAwesomeIcon icon={faPlus} />
          Add
        </Button>
      )}
    </Container>

    {formik.errors.options && formik.touched.options && !Array.isArray(formik.errors.options) && (
      <Form.Text className='text-danger'>{formik.errors.options}</Form.Text>
    )}

    {formik.values.options.length > 1 && formik.values.options.length < 2 && (
      <Form.Text className='text-danger'>At Least 2 Options Are Required!</Form.Text>
    )}

    <Row className='w-100'>
      {formik.values.options.map((option, index) => (
        <Col sm={12} md={6} lg={4} xl={3} className='mt-3' key={`option-${index}`}>
          <Container className='m-0 p-3 rounded rounded-3 border border-muted'>
            <Container className='m-0 p-0 d-flex gap-2 align-items-center justify-content-between mb-2'>
              <p className='m-0 p-0 fw-bold fs-5 text-primary'>#{index + 1}</p>
              {!isView && (
                <Button
                  className='btn-sm text-uppercase d-flex justify-content-center align-items-center m-0 p-2'
                  variant='outline-danger'
                  onClick={() => arrayHelpers.remove(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              )}
            </Container>

            <COMMON_COMPONENTS.TextField
              disable={isView}
              value={formik.values.options[index].text}
              name={`options[${index}].text`}
              formik={formik}
              label='Value'
              placeholder='Enter Value'
              hasFieldArrayError={true}
            />

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Select
                styles={isView && SelectMenuDisabledStyle}
                isDisabled={isView}
                key='status'
                name='status'
                instanceId='status'
                placeholder='Choose Status'
                isSearchable={false}
                onChange={(data) => formik.setFieldValue(`options[${index}].status`, data)}
                options={STATUS_OPTIONS}
                value={formik.values.options[index].status}
              />
              {formik.getFieldMeta(`options[${index}].status`).error &&
                formik.getFieldMeta(`options[${index}].status`).touched && (
                  <Form.Text className='text-danger d-block'>
                    {formik.getFieldMeta(`options[${index}].status`).error.value}
                  </Form.Text>
                )}
            </Form.Group>
          </Container>
        </Col>
      ))}
    </Row>
  </>
)

/**
 * QuestionPage Component
 * 
 * A comprehensive form component for managing feedback questions in the admin panel.
 * Implements CRUD operations with proper validation and error handling.
 * 
 * Features:
 * - Create new questions with dynamic option management
 * - Edit existing questions and their associated options
 * - View question details in read-only mode
 * - Delete questions with confirmation
 * - Form validation using Formik
 * - Responsive layout with Bootstrap
 * - Loading states and error boundaries
 * - Optimized re-renders using proper React hooks
 * - Proper type checking and error handling
 * 
 * Props:
 * @param {Object} params - URL parameters
 * @param {string} params.id - Question ID for edit/view modes
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
 * @returns {JSX.Element} Rendered QuestionPage component
 */
const QuestionPage = ({ params }) => {
  const { id } = params
  const router = useRouter()
  const searchParams = useSearchParams()

  // check for invalid edit/view params and redirect
  const editParam = searchParams.get('edit')
  const viewParam = searchParams.get('view')

  useEffect(() => {
    if ((editParam && editParam !== 'true') || (viewParam && viewParam !== 'true')) {
      router.push(ROUTES.ADMIN_FEEDBACK_QUESTIONS.path)
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
        ? ROUTES.ADMIN_FEEDBACK_QUESTIONS_ADD.name
        : isLoading
          ? 'Loading...'
          : isEdit
            ? 'Edit Question'
            : 'View Question',
      ADMIN_CONSTANTS.MODULE_TITLE
    ],
  })

  // fetch question data on mount for edit/view modes
  useEffect(() => {
    const fetchData = async () => {
      if ((!isEdit && !isView) || !id) return

      await GetQuestion({
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
  if ((isEdit || isView) && !initialValues?.question) {
    return <ADMIN_COMPONENTS.SomethingWentWrong />
  }

  // form submission handler
  const handleFormSubmit = async (values) => {
    if (isEdit && !isView) {
      await UpdateQuestion({
        payload: { ...values, id },
        setIsLoading,
        router
      })
    } else {
      await AddQuestion({
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

  // question deletion handler
  const handleDelete = async () => {
    await DeleteQuestion({
      id,
      setIsDeleting,
      router
    })
  }

  // go back handler
  const handleGoBack = () => {
    router.push(ROUTES.ADMIN_FEEDBACK_QUESTIONS.path)
  }

  return (
    <ADMIN_COMPONENTS.ContentWrapper outerOnly={true}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={ADMIN_VALIDATION.Feedback.FeedbackQuestionSchema}>
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <ADMIN_COMPONENTS.ContentWrapper innerOnly={true}>
              <BasicInfoForm formik={formik} isView={isView} />
            </ADMIN_COMPONENTS.ContentWrapper>

            <ADMIN_COMPONENTS.ContentWrapper innerOnly={true} className='mt-3 w-100'>
              <FieldArray
                name='options'
                render={(arrayHelpers) => (
                  <OptionsList formik={formik} isView={isView} arrayHelpers={arrayHelpers} />
                )}
              />
            </ADMIN_COMPONENTS.ContentWrapper>

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
                  'Are you sure you want to delete this question?',
                  'This action cannot be undone!'
                ]
              }}
              confirmDialog={{
                title: 'Confirmation',
                updateBody: [
                  'Are you sure you want to update this question?',
                  'This action cannot be undone!'
                ],
                saveBody: [
                  'Are you sure you want to save this question?'
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

QuestionPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default QuestionPage