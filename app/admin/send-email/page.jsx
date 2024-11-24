'use client'

import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Clear, SendRounded } from '@mui/icons-material';
import { Formik, useFormik } from 'formik';
import { BeatLoader } from 'react-spinners';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import { SendEmail } from './axios';
import { INITIAL_VALUES } from './values'
import AdminLayout from '../layout';
import { SendEmailSchema } from '@/src/validation';
import TextField from '@/src/components/TextField';
import CustomAlertDialogue from '@/src/components/CustomAlertDialogue';
import usePageTitle from '@/src/hooks/usePageTitle';

const SendEmailPage = () => {
  usePageTitle('Send Email');

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isLoading, setIsLoading] = useState(false);

  const [showClearDialogue, setShowClearDialogue] = useState(false);
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);

  const IconStyles = {
    marginRight: '0.375rem',
    fontSize: '1.25rem',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: SendEmailSchema,
    onSubmit: () => { setShowConfirmationDialogue(true) }
  });

  return (
    <Container style={{ padding: '1.25rem' }}>
      <Container style={{ background: '#fff', padding: '1.5rem', borderRadius: '0.5rem' }}>
        <Formik enableReinitialize>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xl={12}>
                <TextField
                  name='subject'
                  disabled={isLoading}
                  formik={formik}
                  label='Subject'
                  placeholder='Enter Subject'
                />
              </Col>

              <Col xl={12}>
                <TextField
                  name='title'
                  formik={formik}
                  disabled={isLoading}
                  label='Title'
                  placeholder='Enter Title'
                />
              </Col>

              <Col xl={12}>
                <ReactQuill
                  value={formik.values.body}
                  onChange={(content) => formik.setFieldValue('body', content)}
                  style={{ marginTop: '0.5rem' }}
                  readOnly={isLoading}
                  theme='snow'
                  placeholder='Type Your Email Body Here...'
                />
                {
                  formik.errors.body && formik.touched.body
                    ? <Form.Text className='text-danger'>{formik.errors.body}</Form.Text>
                    : null
                }
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
                style={isLoading ? { height: '2.35rem' } : {}}
                variant='success'>
                {
                  isLoading
                    ?
                    <>
                      <BeatLoader color='#fff' size={8} />
                    </>
                    :
                    <>
                      <SendRounded style={IconStyles} />
                      {'Send'}
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
            await SendEmail({ payload: formik.values, setIsLoading: setIsLoading });
            formik.resetForm(formik.initialValues);
          }}
          negativeCallback={() => setShowConfirmationDialogue(false)}
          show={showConfirmationDialogue}
          handleClose={() => setShowConfirmationDialogue(false)}>
          <p>Are you sure you want to send this email to all users?</p>
          <p>This action cannot be undone!</p>
        </CustomAlertDialogue>
      }
    </Container>
  );
};

SendEmailPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default SendEmailPage;