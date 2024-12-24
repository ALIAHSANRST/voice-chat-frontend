'use client'

import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Formik, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { SubmitFeedback, GetQuestions } from './axios';
import { INITIAL_VALUES } from './values'
import { USER_VALIDATION } from '@/src/validation';
import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { USER_COLORS } from '@/src/utils/colors';
import usePageTitle from '@/src/hooks/usePageTitle';

const WrapperContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 3rem;
  background-color: ${USER_COLORS.GiveFeedback.Background.Page};
  font-family: 'Montserrat', sans-serif;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${USER_COLORS.GiveFeedback.Background.Container};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2.25rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

`

const HeadingText = styled.h1`
  font-size: 1.625rem;
  font-weight: 600;
  margin-bottom: 0.875rem;
  color: ${USER_COLORS.GiveFeedback.Text.Primary};

  @media (max-width: 768px) {
    font-size: 1.325rem;
    margin-bottom: 0.625rem;
  }
`

const SubHeadingText = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  color: ${USER_COLORS.GiveFeedback.Text.Secondary};

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const LikertScaleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.625rem;
  }
`

const LikertScaleOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${USER_COLORS.GiveFeedback.LikertScale.Background};
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 4.75rem;
  border: 1px solid ${props => props.isSelected ? USER_COLORS.GiveFeedback.LikertScale.Selected.Border : USER_COLORS.GiveFeedback.LikertScale.Background};
  user-select: none;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }

  p {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: ${props => props.isSelected ? USER_COLORS.GiveFeedback.LikertScale.Selected.Text : USER_COLORS.GiveFeedback.LikertScale.Text};

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
`

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid ${USER_COLORS.GiveFeedback.QuestionContainer.Border};

  @media (max-width: 768px) {
    padding: 1.25rem;
    gap: 0.75rem;
  }
`

const QuestionHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${USER_COLORS.GiveFeedback.QuestionContainer.PrimaryText};

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const QuestionSubHeading = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  color: ${USER_COLORS.GiveFeedback.QuestionContainer.SecondaryText};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  .form-check-label {
    font-size: 1rem;
    font-weight: 600;
    color: ${USER_COLORS.GiveFeedback.QuestionContainer.PrimaryText};

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`

const QuestionError = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  color: #FF0000;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const FeedbackTextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  border-radius: 0.5rem;
  border: 1px solid ${USER_COLORS.GiveFeedback.QuestionContainer.Border};
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  color: ${USER_COLORS.GiveFeedback.QuestionContainer.PrimaryText};

  @media (max-width: 768px) {
    height: 8rem;
  }

  &:focus {
    outline: none;
    border-color: ${USER_COLORS.GiveFeedback.LikertScale.Selected.Border};
  }

  &::placeholder {
    color: ${USER_COLORS.GiveFeedback.QuestionContainer.SecondaryText};
    font-weight: 600;
  }
`

const ProvideFeedbackPage = () => {
  const router = useRouter();
  usePageTitle({ title: 'Give Feedback' });

  const [initialValues, setInitialValues] = useState({ ...INITIAL_VALUES });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

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
    onSubmit: () => {
      SubmitFeedback({
        payload: formik.values,
        setIsSubmitting: setIsSubmitting,
        router: router
      });
    }
  });

  return (
    <WrapperContainer>
      <Formik enableReinitialize>
        <form onSubmit={formik.handleSubmit}>
          <MainContainer>
            <HeadingContainer>
              <div>
                <HeadingText>We'd love your feedback!</HeadingText>
                <SubHeadingText>Please let us know about your experience to help us improve.</SubHeadingText>
              </div>
            </HeadingContainer>

            {
              isLoading &&
              <QuestionContainer>
                <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <COMMON_COMPONENTS.Loader wrapped message='Loading...' />
                </div>
              </QuestionContainer>
            }

            {
              !isLoading &&
              <>
                <QuestionContainer>
                  <QuestionHeading>How Was Your Experience?</QuestionHeading>
                  <QuestionSubHeading>Rate your satisfaction with the course on a scale of 1 to 5.</QuestionSubHeading>
                  <LikertScaleContainer>
                    {
                      [1, 2, 3, 4, 5].map((option, index) => (
                        <LikertScaleOption
                          key={index}
                          disabled={isSubmitting}
                          isSelected={formik.values.rating === option}
                          onClick={() => formik.setFieldValue('rating', option)}>
                          <p>{option}</p>
                        </LikertScaleOption>
                      ))
                    }
                  </LikertScaleContainer>
                  {
                    formik.errors.rating &&
                    <QuestionError>{formik.errors.rating}</QuestionError>
                  }
                </QuestionContainer>
                {
                  questions.map((question, index) => (
                    <QuestionContainer key={question._id}>
                      <QuestionHeading>{index + 1}. {question.question}</QuestionHeading>
                      <OptionContainer>
                        {
                          question?.options?.map((option, optionIndex) => (
                            <Form.Check
                              key={optionIndex}
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
                          ))
                        }
                      </OptionContainer>
                      {
                        formik.errors[`question_${question._id}`] &&
                        <QuestionError>{formik.errors[`question_${question._id}`]}</QuestionError>
                      }
                    </QuestionContainer>
                  ))
                }

                <QuestionContainer>
                  <QuestionHeading>Share Your Thoughts</QuestionHeading>
                  <QuestionSubHeading>We'd love to hear your detailed feedback to help us improve.</QuestionSubHeading>
                  <FeedbackTextArea
                    name='description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    disabled={isSubmitting}
                    placeholder='Write your feedback here...'
                  />
                  {
                    formik.errors.description &&
                    <QuestionError>{formik.errors.description}</QuestionError>
                  }
                </QuestionContainer>

                <div style={{ marginLeft: 'auto' }}>
                  <USER_COMPONENTS.Button
                    type={'submit'}
                    text={'Submit Feedback'}
                    disabled={isSubmitting}
                  />
                </div>
              </>
            }
          </MainContainer>
        </form>
      </Formik>
    </WrapperContainer>
  )
};

export default ProvideFeedbackPage;