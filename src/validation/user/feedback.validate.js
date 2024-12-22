'use client';

import * as Yup from 'yup';

/**
 * Validation schema for user feedback form
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} FeedbackSchema
 * @property {string} description - Detailed feedback description
 * @property {number} rating - Rating for the feedback
 */
const FeedbackSchema = Yup.object().shape({
  description: Yup.string()
    .min(20, 'Must Be At Least 20 Characters Long!')
    .max(2000, 'Cannot Exceed 2000 Characters!')
    .trim(),

  rating: Yup.number()
    .min(1, 'Rating Must Be Between 1 and 5!')
    .max(5, 'Rating Must Be Between 1 and 5!')
    .required('Required!')
    .integer('Rating Must Be An Integer!'),
});

export {
  FeedbackSchema
};