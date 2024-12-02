'use client'

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Clear, Done } from '@mui/icons-material';
import { Formik, useFormik, FieldArray } from 'formik';
import { BeatLoader } from 'react-spinners';

import { SubmitFeedback, GetQuestions } from './axios';
import { INITIAL_VALUES } from './values'
import { USER_VALIDATION } from '@/src/validation';
import { COMMON_COMPONENTS } from '@/src/components';
import usePageTitle from '@/src/hooks/usePageTitle';
import { faCheck, faCross, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

const ProvideFeedbackPage = () => {
  const router = useRouter();
  usePageTitle({ title: 'Submit Feedback' });

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  const [showClearDialogue, setShowClearDialogue] = useState(false);
  const [showConfirmationDialogue, setShowConfirmationDialogue] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      await GetQuestions({
        setIsLoading: setIsLoading,
        setQuestions: setQuestions
      });
    }
    fetchQuestions();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: USER_VALIDATION.Feedback.FeedbackSchema,
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

        {
          isLoading &&
          <COMMON_COMPONENTS.Loader />
        }

        {
          !isLoading &&
          <Formik enableReinitialize>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col xl={12}>
                  <COMMON_COMPONENTS.TextField
                    name='title'
                    disabled={isSubmitting}
                    formik={formik}
                    label='Title'
                    placeholder='Enter Title'
                    required={true}
                  />
                </Col>
                <Col xl={12}>
                  <COMMON_COMPONENTS.TextField
                    name='description'
                    disabled={isSubmitting}
                    formik={formik}
                    label='Description'
                    placeholder='Type Description Here...'
                    as='textarea'
                    required={true}
                  />
                </Col>
              </Row>

              <p className='fw-medium text-muted m-0 p-0 fs-6 mb-3'>
                Please select the most appropriate option for each question.
              </p>

              {questions.map((question, index) => (
                <Row key={index} className='w-100 p-0 m-0 border border-muted px-2 py-3 rounded-3 mb-3 gap-2'>
                  <Col xl={12}>
                    <p className='fw-medium text-muted m-0 p-0 fs-6'>
                      {index + 1}. {question.question}
                    </p>
                  </Col>
                  {question?.options?.map((option, optionIndex) => (
                    <Col xl={3} lg={4} md={6} sm={12} key={optionIndex}>
                      <Form.Check
                        type={question?.question_type?.toLowerCase() === 'single' ? 'radio' : 'checkbox'}
                        name={`question_${question._id}`}
                        id={`option_${option._id}`}
                        value={option._id}
                        label={option.text}
                        disabled={isSubmitting}
                        onChange={formik.handleChange}
                        required={
                          question?.question_type?.toLowerCase() === 'single'
                            ? true
                            : optionIndex === 0 && !formik.values[`question_${question._id}`]?.length
                        }
                        checked={
                          question?.question_type?.toLowerCase() === 'single'
                            ? formik.values[`question_${question._id}`] === option._id
                            : formik.values[`question_${question._id}`]?.includes(option._id)
                        }
                      />
                    </Col>
                  ))}
                </Row>
              ))}

              <Container className='p-0 d-flex gap-3 mt-3 justify-content-end'>
                <Button
                  className='text-uppercase d-flex justify-content-center align-items-center gap-2'
                  variant='danger'
                  onClick={(e) => setShowClearDialogue(true)}>
                  <FontAwesomeIcon icon={faXmark} />
                  {'Clear'}
                </Button>
                <Button
                  type='submit'
                  className='text-uppercase d-flex justify-content-center align-items-center gap-2'
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
                        <FontAwesomeIcon icon={faCheck} />
                        {'Submit'}
                      </>
                  }
                </Button>
              </Container>
            </Form>
          </Formik>
        }
      </div>

      {
        showClearDialogue &&
        <COMMON_COMPONENTS.AlertDialogue
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
        </COMMON_COMPONENTS.AlertDialogue>
      }

      {
        showConfirmationDialogue &&
        <COMMON_COMPONENTS.AlertDialogue
          title='Confirmation'
          positiveMessage='Proceed'
          negativeMessage='Cancel'
          positiveCallback={async () => {
            setShowConfirmationDialogue(false);
            await SubmitFeedback({ payload: formik.values, setIsSubmitting, router });
            setInitialValues({ ...INITIAL_VALUES });
            formik.resetForm(formik.initialValues);
          }}
          negativeCallback={() => setShowConfirmationDialogue(false)}
          show={showConfirmationDialogue}
          handleClose={() => setShowConfirmationDialogue(false)}>
          <p>Are you sure you want to submit this feedback?</p>
          <p>This action cannot be undone!</p>
        </COMMON_COMPONENTS.AlertDialogue>
      }
    </div>
  )
};

export default ProvideFeedbackPage;