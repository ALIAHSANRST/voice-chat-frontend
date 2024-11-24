'use client'

import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Clear, Done } from '@mui/icons-material';
import { Formik, useFormik } from 'formik';
import { BeatLoader } from 'react-spinners';

import { SubmitFeedback } from './axios';
import { INITIAL_VALUES } from './values'
import { FeedbackSchema } from '@/src/validation';
import TextField from '@/src/components/TextField';
import CustomAlertDialogue from '@/src/components/CustomAlertDialogue';
import usePageTitle from '@/src/hooks/usePageTitle';

const ProvideFeedbackPage = () => {
  usePageTitle('Submit Feedback');

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showClearDialogue, setShowClearDialogue] = useState(false);
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);

  const IconStyles = {
    marginRight: '0.375rem',
    fontSize: '1.25rem',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: FeedbackSchema,
    onSubmit: () => { setShowConfirmationDialogue(true) }
  });

  return (
    <div className='py-4 container' style={{ minHeight: '100vh' }}>
      <div className="border border-muted rounded-3 bg-white shadow-sm p-4">
        <div className='d-flex justify-content-between align-items-center'>
          <h4 className='fw-medium text-muted m-0 p-0 text-center'>Submit Feedback</h4>
          <Button variant='outline-secondary' size='sm' href='/user'>
            Go to Home
          </Button>
        </div>
        <hr className='w-100 p-0 m-0 my-3 text-muted' />
        <Formik enableReinitialize>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xl={12}>
                <TextField
                  name='title'
                  disabled={isSubmitting}
                  formik={formik}
                  label='Title'
                  placeholder='Enter Title'
                />
              </Col>
              <Col xl={12}>
                <TextField
                  name='description'
                  disabled={isSubmitting}
                  formik={formik}
                  label='Description'
                  placeholder='Type Description Here...'
                  as='textarea'
                />
              </Col>
            </Row>

            <Container className='p-0 d-flex gap-3 mt-3 justify-content-end'>
              <Button
                type='reset'
                className='text-uppercase d-flex justify-content-center align-items-center pe-3'
                variant='danger'
                onClick={(e) => setShowClearDialogue(true)}>
                <Clear style={IconStyles} />
                {'Clear'}
              </Button>
              <Button
                type='submit'
                className='text-uppercase d-flex justify-content-center align-items-center pe-3'
                style={isSubmitting ? { height: '2.35rem' } : {}}
                variant='success'>
                {
                  isSubmitting
                    ?
                    <>
                      <BeatLoader color='#fff' size={8} />
                    </>
                    :
                    <>
                      <Done style={IconStyles} />
                      {'Submit'}
                    </>
                }
              </Button>
            </Container>
          </Form>
        </Formik>
      </div>

      {
        showClearDialogue &&
        <CustomAlertDialogue
          title='Warning'
          positiveMessage='Proceed'
          negativeMessage='Cancel'
          positiveCallback={() => {
            setInitialValues({ ...INITIAL_VALUES });
            formik.resetForm(formik.initialValues);
            setShowClearDialogue(false);
          }}
          negativeCallback={() => setShowClearDialogue(false)}
          show={showClearDialogue}
          handleClose={() => setShowClearDialogue(false)}>
          <p>Are you sure you want to clear this form?</p>
        </CustomAlertDialogue>
      }

      {
        showConfirmationDialogue &&
        <CustomAlertDialogue
          title='Confirmation'
          positiveMessage='Proceed'
          negativeMessage='Cancel'
          positiveCallback={async () => {
            setShowConfirmationDialogue(false);
            await SubmitFeedback({ payload: formik.values, setIsSubmitting: setIsSubmitting });
            setInitialValues({ ...INITIAL_VALUES });
            formik.resetForm(formik.initialValues);
          }}
          negativeCallback={() => setShowConfirmationDialogue(false)}
          show={showConfirmationDialogue}
          handleClose={() => setShowConfirmationDialogue(false)}>
          <p>Are you sure you want to submit this feedback?</p>
          <p>This action cannot be undone!</p>
        </CustomAlertDialogue>
      }
    </div>
  )
};

export default ProvideFeedbackPage;