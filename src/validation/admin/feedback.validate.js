'use client';

import * as Yup from 'yup';

/**
 * Validation schema for feedback questions
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} FeedbackQuestionSchema
 * @property {string} question - The question text
 * @property {Object} status - Question status with value and label
 * @property {Object} questionType - Type of question (single/multiple choice)
 * @property {Array<Object>} options - Array of answer options
 */
const FeedbackQuestionSchema = Yup.object().shape({
  question: Yup.string()
    .typeError('Invalid!')
    .min(5, 'Must Be At Least 5 Characters Long!')
    .max(200, 'Cannot Exceed 200 Characters!')
    .required('Required!'),

  status: Yup.object({
    label: Yup.string().required('Required!'),
    value: Yup.string()
      .typeError('Invalid')
      .oneOf(['active', 'inactive'], 'Invalid!')
      .required('Required!')
  }),

  questionType: Yup.object({
    label: Yup.string().required('Required!'),
    value: Yup.string()
      .typeError('Invalid')
      .oneOf(['single', 'multiple'], 'Invalid!')
      .required('Required!')
  }),

  options: Yup.array()
    .of(
      Yup.object({
        text: Yup.string()
          .min(2, 'Must Be At Least 2 Characters Long!')
          .max(100, 'Cannot Exceed 100 Characters!')
          .required('Required!'),

        status: Yup.object({
          label: Yup.string().required('Required!'),
          value: Yup.string()
            .typeError('Invalid')
            .oneOf(['active', 'inactive'], 'Invalid!')
            .required('Required!')
        })
      })
    )
    .min(2, 'At Least 2 Options Are Required!')
    .max(10, 'Cannot Have More Than 10 Options!')
    .required('Required!')
});

export {
  FeedbackQuestionSchema
};