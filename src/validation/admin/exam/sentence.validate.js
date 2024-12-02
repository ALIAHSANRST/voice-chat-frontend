'use client';

import * as Yup from 'yup';

/**
 * Validation schema for exam sentences
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} SentenceSchema
 * @property {string} text - The sentence text content
 * @property {Object} complexity_level - Sentence complexity with value and label
 * @property {Object} status - Sentence status with value and label
 */
const SentenceSchema = Yup.object().shape({
  text: Yup.string()
    .typeError('Invalid!')
    .min(10, 'Must Be At Least 10 Characters Long!')
    .max(250, 'Cannot Exceed 250 Characters!')
    .required('Required!'),

  complexity_level: Yup.object({
    label: Yup.string().required('Required!'),
    value: Yup.string()
      .typeError('Invalid')
      .oneOf(['easy', 'medium', 'hard'], 'Invalid!')
      .required('Required!')
  }),

  status: Yup.object({
    label: Yup.string().required('Required!'),
    value: Yup.string()
      .typeError('Invalid')
      .oneOf(['active', 'inactive'], 'Invalid!')
      .required('Required!')
  }),
});

export {
  SentenceSchema
};