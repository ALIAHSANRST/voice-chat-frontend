'use client'

import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Clear, Done } from '@mui/icons-material';
import { Formik, useFormik } from 'formik';
import { BeatLoader } from 'react-spinners';

import { UpdateExamScript, GetExamScript } from './axios';
import { INITIAL_VALUES } from './values'
import AdminLayout from '../layout';
import { ExamScriptSchema } from '@/src/validation';
import TextField from '@/src/components/TextField';
import CustomAlertDialogue from '@/src/components/CustomAlertDialogue';
import usePageTitle from '@/src/hooks/usePageTitle';

const ExamScriptPage = () => {
  usePageTitle('Exam Script');

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showClearDialogue, setShowClearDialogue] = useState(false);
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);

  useEffect(() => {
    GetExamScript({ setInitialValues, setIsLoading })
  }, [])

  const IconStyles = {
    marginRight: '0.375rem',
    fontSize: '1.25rem',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: ExamScriptSchema,
    onSubmit: () => { setShowConfirmationDialogue(true) }
  });

  if (isLoading) {
    return (
      <Container style={{ padding: '1.25rem' }}>
        <Container style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.5rem' }}>
          <div className='d-flex justify-content-center align-items-center flex-column py-3'>
            <span className='mb-2 fs-5 text-secondary'>
              {'Loading Data...'}
            </span>
            <BeatLoader color='#333333' size={12} />
          </div>
        </Container>
      </Container>
    )
  }

  return (
    <Container style={{ padding: '1.25rem' }}>
      <Container style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.5rem' }}>
        <Formik enableReinitialize>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xl={12}>
                <TextField
                  name='content'
                  disabled={isSubmitting}
                  formik={formik}
                  label='Content'
                  placeholder='Type Content Here...'
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
                      {'Update'}
                    </>
                }
              </Button>
            </Container>
          </Form>
        </Formik>
      </Container>

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
            await UpdateExamScript({ payload: formik.values, setIsSubmitting: setIsSubmitting });
          }}
          negativeCallback={() => setShowConfirmationDialogue(false)}
          show={showConfirmationDialogue}
          handleClose={() => setShowConfirmationDialogue(false)}>
          <p>Are you sure you want to update this exam script?</p>
          <p>This action cannot be undone!</p>
        </CustomAlertDialogue>
      }
    </Container>
  );
};

ExamScriptPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ExamScriptPage;