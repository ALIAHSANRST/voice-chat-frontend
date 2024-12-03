'use client'

import { FieldArray, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Form, Container, Button } from 'react-bootstrap'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Select from 'react-select'

import AdminLayout from '@/app/admin/layout'
import { ADMIN_COMPONENTS, COMMON_COMPONENTS } from '@/src/components'
import { ADMIN_CONSTANTS } from '@/src/utils/constants'
import { ADMIN_VALIDATION } from '@/src/validation'
import { AddExam, DeleteExam, GetExam, UpdateExam } from './axios'
import { INITIAL_VALUES, STATUS_OPTIONS, COMPLEXITY_LEVELS } from './values'
import { ROUTES } from '@/src/utils/routes'
import { SelectMenuDisabledStyle } from '@/src/utils/styles'
import { usePageTitle } from '@/src/hooks'

// sub-components
const BasicInfoForm = ({ formik, isView }) => (
  <Row>
    <Col xl={12}>
      <COMMON_COMPONENTS.TextField
        name='name'
        disable={isView}
        formik={formik}
        label='Title'
        placeholder='Enter Exam Title'
      />
    </Col>

    <Col xl={12}>
      <COMMON_COMPONENTS.TextField
        name='description'
        disable={isView}
        formik={formik}
        label='Description'
        placeholder='Type Exam Description Here...'
        as='textarea'
      />
    </Col>

    <Col sm={12} md={6} lg={4} xl={3}>
      <COMMON_COMPONENTS.TextField
        name='total_marks'
        disable={isView}
        formik={formik}
        label='Total Marks'
        placeholder='Enter Total Marks'
      />
    </Col>

    <Col sm={12} md={6} lg={4} xl={3}>
      <COMMON_COMPONENTS.TextField
        name='word_limit'
        disable={isView}
        formik={formik}
        label='Word Limit'
        placeholder='Enter Word Limit'
      />
    </Col>

    <Col sm={12} md={6} lg={4} xl={3}>
      <COMMON_COMPONENTS.TextField
        name='sentence_limit'
        disable={isView}
        formik={formik}
        label='Sentence Limit'
        placeholder='Enter Sentence Limit'
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

    <Col sm={12} md={12} lg={8} xl={6}>
      <Form.Group className='mb-3'>
        <Form.Label>Complexity Levels</Form.Label>
        <Select
          styles={isView && SelectMenuDisabledStyle}
          isDisabled={isView}
          key='complexityLevels'
          name='complexityLevels'
          instanceId='complexityLevels'
          placeholder='Choose Complexity Levels'
          isSearchable={false}
          isMulti={true}
          onChange={(data) => formik.setFieldValue('complexity_levels', data)}
          options={COMPLEXITY_LEVELS}
          value={formik.values.complexity_levels}
        />
        {formik.errors.complexity_levels && formik.touched.complexity_levels && (
          <Form.Text className='text-danger'>
            {formik.errors.complexity_levels}
          </Form.Text>
        )}
      </Form.Group>
    </Col>
  </Row>
)

const RubricsLevelsList = ({ formik, isView, arrayHelpers }) => (
  <>
    <Container className='m-0 p-0 d-flex justify-content-between align-items-center w-100'>
      <p className='m-0 p-0 fw-bold fs-4 text-secondary'>Rubrics Levels</p>
      {!isView && (
        <Button
          className='btn-sm text-uppercase d-flex justify-content-center align-items-center gap-2 px-3'
          variant='outline-primary'
          onClick={() => arrayHelpers.push({
            level_name: '',
            level_description: '',
            upper_percentage: '',
            lower_percentage: ''
          })}>
          <FontAwesomeIcon icon={faPlus} />
          Add
        </Button>
      )}
    </Container>

    {formik.errors.rubrics_levels && formik.touched.rubrics_levels && !Array.isArray(formik.errors.rubrics_levels) && (
      <Form.Text className='text-danger'>{formik.errors.rubrics_levels}</Form.Text>
    )}

    <Row className='w-100 m-0 p-0'>
      {formik.values.rubrics_levels.map((level, index) => (
        <Col sm={12} className='mt-3 p-0' key={`level-${index}`}>
          <Container className='m-0 p-3 rounded rounded-3 border border-muted'>
            <Container className='m-0 p-0 d-flex gap-2 align-items-center justify-content-between mb-2'>
              <p className='m-0 p-0 fw-bold fs-5 text-primary'>Level # {index + 1}</p>
              {!isView && (
                <Button
                  className='btn-sm text-uppercase d-flex justify-content-center align-items-center m-0 p-2'
                  variant='outline-danger'
                  onClick={() => arrayHelpers.remove(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              )}
            </Container>

            <Row>
              <Col sm={12} md={12} lg={8} xl={6}>
                <COMMON_COMPONENTS.TextField
                  disable={isView}
                  value={formik.values.rubrics_levels[index].level_name}
                  name={`rubrics_levels[${index}].level_name`}
                  formik={formik}
                  label='Level Name'
                  placeholder='Enter Level Name'
                  hasFieldArrayError={true}
                />
              </Col>

              <Col sm={12} md={6} lg={2} xl={3}>
                <COMMON_COMPONENTS.TextField
                  disable={isView}
                  value={formik.values.rubrics_levels[index].upper_percentage}
                  name={`rubrics_levels[${index}].upper_percentage`}
                  formik={formik}
                  label='Upper Percentage'
                  placeholder='Enter Upper %'
                  hasFieldArrayError={true}
                />
              </Col>

              <Col sm={12} md={6} lg={2} xl={3}>
                <COMMON_COMPONENTS.TextField
                  disable={isView}
                  value={formik.values.rubrics_levels[index].lower_percentage}
                  name={`rubrics_levels[${index}].lower_percentage`}
                  formik={formik}
                  label='Lower Percentage'
                  placeholder='Enter Lower %'
                  hasFieldArrayError={true}
                />
              </Col>

              <Col sm={12} md={12} lg={12} xl={12}>
                <COMMON_COMPONENTS.TextField
                  disable={isView}
                  value={formik.values.rubrics_levels[index].level_description}
                  name={`rubrics_levels[${index}].level_description`}
                  formik={formik}
                  label='Level Description'
                  placeholder='Enter Level Description'
                  hasFieldArrayError={true}
                  as='textarea'
                />
              </Col>
            </Row>
          </Container>
        </Col>
      ))}
    </Row>
  </>
)

/**
 * ManageExamPage Component
 * 
 * A comprehensive form component for managing exams in the admin panel.
 * Implements CRUD operations with proper validation and error handling.
 * 
 * Features:
 * - Create new exams
 * - Edit existing exams 
 * - View exam details in read-only mode
 * - Delete exams with confirmation
 * - Form validation using Formik
 * - Responsive layout with Bootstrap
 * - Loading states and error boundaries
 * - Optimized re-renders using proper React hooks
 * - Proper type checking and error handling
 * 
 * Props:
 * @param {Object} params - URL parameters
 * @param {string} params.id - Exam ID for edit/view modes
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
 * @returns {JSX.Element} Rendered ManageExamPage component
 */
const ManageExamPage = ({ params }) => {
  const { id } = params
  const router = useRouter()
  const searchParams = useSearchParams()

  // check for invalid edit/view params and redirect
  const editParam = searchParams.get('edit')
  const viewParam = searchParams.get('view')

  useEffect(() => {
    if ((editParam && editParam !== 'true') || (viewParam && viewParam !== 'true')) {
      router.push(ROUTES.ADMIN_EXAM_MANAGE.path)
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
        ? ROUTES.ADMIN_EXAM_MANAGE_ADD.name
        : isLoading
          ? 'Loading...'
          : isEdit
            ? 'Edit Exam'
            : 'View Exam',
      ADMIN_CONSTANTS.MODULE_TITLE
    ],
  })

  // fetch exam data on mount for edit/view modes
  useEffect(() => {
    const fetchData = async () => {
      if ((!isEdit && !isView) || !id) return

      await GetExam({
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
  if ((isEdit || isView) && !initialValues?.name) {
    return <ADMIN_COMPONENTS.SomethingWentWrong />
  }

  // form submission handler
  const handleFormSubmit = async (values) => {
    if (isEdit && !isView) {
      await UpdateExam({
        payload: { ...values, id },
        setIsLoading,
        router
      })
    } else {
      await AddExam({
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

  // exam deletion handler
  const handleDelete = async () => {
    await DeleteExam({
      id,
      setIsDeleting,
      router
    })
  }

  // go back handler
  const handleGoBack = () => {
    router.push(ROUTES.ADMIN_EXAM_MANAGE.path)
  }

  return (
    <ADMIN_COMPONENTS.ContentWrapper outerOnly={true}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={ADMIN_VALIDATION.Exam.Exam.ExamSchema}>
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <ADMIN_COMPONENTS.ContentWrapper innerOnly={true}>
              <BasicInfoForm formik={formik} isView={isView} />
            </ADMIN_COMPONENTS.ContentWrapper>

            <ADMIN_COMPONENTS.ContentWrapper innerOnly={true} className='mt-3'>
              <FieldArray
                name='rubrics_levels'
                render={(arrayHelpers) => (
                  <RubricsLevelsList formik={formik} isView={isView} arrayHelpers={arrayHelpers} />
                )}
              />
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
                  'Are you sure you want to delete this exam?',
                  'This action cannot be undone!'
                ]
              }}
              confirmDialog={{
                title: 'Confirmation',
                updateBody: [
                  'Are you sure you want to update this exam?',
                  'This action cannot be undone!'
                ],
                saveBody: [
                  'Are you sure you want to save this exam?'
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

ManageExamPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default ManageExamPage