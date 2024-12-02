'use client'

import { BeatLoader } from 'react-spinners'
import { Button, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import {
  faArrowLeft,
  faRotateLeft,
  faSave,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

import { ADMIN_COMPONENTS, COMMON_COMPONENTS } from "@/src/components"

/**
 * FormActionsFooter Component
 * 
 * A reusable footer component for forms that provides common action buttons like
 * back, reset, delete, and save/update with confirmation dialogs.
 *
 * @component
 * @example
 * return (
 *   <FormActionsFooter
 *     isEdit={true}
 *     formik={formikInstance}
 *     handleDelete={() => handleDelete()}
 *     handleFormSubmit={(values) => handleSubmit(values)}
 *   />
 * )
 */
const FormActionsFooter = ({
  // view states
  isView = false,
  isEdit = false,
  isLoading = false,
  isDeleting = false,

  // labels
  goBackLabel = 'Go Back',
  resetLabel = 'Reset',
  deleteLabel = 'Delete',
  saveLabel = 'Save',
  updateLabel = 'Update',

  // dialog configurations
  resetDialog = {
    title: 'Warning',
    body: []
  },
  deleteDialog = {
    title: 'Warning',
    body: []
  },
  confirmDialog = {
    title: 'Confirmation',
    updateBody: [],
    saveBody: []
  },

  // dialog button labels
  dialogPositiveLabel = 'Proceed',
  dialogNegativeLabel = 'Cancel',

  // button variants
  backButtonVariant = 'outline-secondary',
  resetButtonVariant = 'warning',
  deleteButtonVariant = 'danger',
  saveButtonVariant = 'success',

  // handlers
  formik,
  handleDelete,
  handleReset,
  handleFormSubmit,
  handleGoBack,

  // loader props
  loaderColor = '#fff',
  loaderSize = 8,

  // show/hide buttons
  showBackButton = true,
  showResetButton = true,
  showDeleteButton = true,
  showSaveButton = true
}) => {
  const [showResetDialogue, setShowResetDialogue] = useState(false)
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false)
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false)

  // handlers for dialog actions
  const handleResetConfirm = () => {
    handleReset(formik)
    setShowResetDialogue(false)
  }

  const handleDeleteConfirm = () => {
    handleDelete()
    setShowDeleteDialogue(false)
  }

  const handleSaveConfirm = () => {
    if (isLoading) return
    if (formik.isValid) handleFormSubmit(formik.values)
    setShowConfirmationDialogue(false)
  }

  const handleDialogClose = (setterFn) => () => {
    setterFn(false)
  }

  return (
    <>
      <ADMIN_COMPONENTS.ContentWrapper
        innerOnly={true}
        className='mt-3 d-flex justify-content-between align-items-center w-100 gap-3 flex-wrap'
      >
        {showBackButton && (
          <Button
            type='reset'
            className='d-flex justify-content-center align-items-center gap-2 w-auto'
            variant={backButtonVariant}
            onClick={handleGoBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {goBackLabel}
          </Button>
        )}

        <Container className='p-0 m-0 d-flex gap-3 w-auto'>
          {!isView && showResetButton && (
            <Button
              type='reset'
              className='d-flex justify-content-center align-items-center gap-2 px-3'
              variant={resetButtonVariant}
              onClick={() => setShowResetDialogue(true)}
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              {resetLabel}
            </Button>
          )}

          {showDeleteButton && (
            <Button
              type='reset'
              className='d-flex justify-content-center align-items-center gap-2 px-3'
              variant={deleteButtonVariant}
              onClick={() => setShowDeleteDialogue(true)}
            >
              {isDeleting ? (
                <BeatLoader color={loaderColor} size={loaderSize} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faTrash} />
                  {deleteLabel}
                </>
              )}
            </Button>
          )}

          {!isView && showSaveButton && (
            <Button
              type='submit'
              className='d-flex justify-content-center align-items-center gap-2 px-3'
              variant={saveButtonVariant}
              onClick={() => {
                if (formik.isValid) setShowConfirmationDialogue(true)
              }}
            >
              {isLoading ? (
                <BeatLoader color={loaderColor} size={loaderSize} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} />
                  {isEdit ? updateLabel : saveLabel}
                </>
              )}
            </Button>
          )}
        </Container>
      </ADMIN_COMPONENTS.ContentWrapper>

      {showResetDialogue && (
        <COMMON_COMPONENTS.AlertDialogue
          title={resetDialog.title}
          positiveMessage={dialogPositiveLabel}
          negativeMessage={dialogNegativeLabel}
          positiveCallback={handleResetConfirm}
          negativeCallback={handleDialogClose(setShowResetDialogue)}
          show={showResetDialogue}
          handleClose={handleDialogClose(setShowResetDialogue)}
        >
          {resetDialog.body.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </COMMON_COMPONENTS.AlertDialogue>
      )}

      {showDeleteDialogue && (
        <COMMON_COMPONENTS.AlertDialogue
          title={deleteDialog.title}
          positiveMessage={dialogPositiveLabel}
          negativeMessage={dialogNegativeLabel}
          positiveCallback={handleDeleteConfirm}
          negativeCallback={handleDialogClose(setShowDeleteDialogue)}
          show={showDeleteDialogue}
          handleClose={handleDialogClose(setShowDeleteDialogue)}
        >
          {deleteDialog.body.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </COMMON_COMPONENTS.AlertDialogue>
      )}

      {showConfirmationDialogue && formik.isValid && (
        <COMMON_COMPONENTS.AlertDialogue
          title={confirmDialog.title}
          positiveMessage={dialogPositiveLabel}
          negativeMessage={dialogNegativeLabel}
          positiveCallback={handleSaveConfirm}
          negativeCallback={handleDialogClose(setShowConfirmationDialogue)}
          show={showConfirmationDialogue}
          handleClose={handleDialogClose(setShowConfirmationDialogue)}
        >
          {(isEdit && !isView ? confirmDialog.updateBody : confirmDialog.saveBody).map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </COMMON_COMPONENTS.AlertDialogue>
      )}
    </>
  )
}

export default FormActionsFooter