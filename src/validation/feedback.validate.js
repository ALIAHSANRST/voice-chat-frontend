import * as Yup from 'yup';

/**
 * Validation schema for user feedback form
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} FeedbackSchema
 * @property {string} title - Feedback title
 * @property {string} description - Detailed feedback description
 */
const FeedbackSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Must Be At Least 5 Characters Long!')
    .max(100, 'Cannot Exceed 100 Characters!')
    .required('Required!')
    .trim(),

  description: Yup.string()
    .min(20, 'Must Be At Least 20 Characters Long!')
    .max(2000, 'Cannot Exceed 2000 Characters!')
    .required('Required!')
    .trim(),
});

export {
  FeedbackSchema
};