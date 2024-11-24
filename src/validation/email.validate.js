import * as Yup from 'yup';

/**
 * Validation schema for sending emails to all users
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} SendEmailSchema
 * @property {string} title - Email title
 * @property {string} subject - Email subject line
 * @property {string} body - Raw HTML email body content
 */
const SendEmailSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Must Be At Least 5 Characters Long!')
    .max(100, 'Cannot Exceed 100 Characters!')
    .required('Required!')
    .trim(),

  subject: Yup.string()
    .min(5, 'Must Be At Least 5 Characters Long!')
    .max(100, 'Cannot Exceed 100 Characters!')
    .required('Required!')
    .trim(),

  body: Yup.string()
    .min(10, 'Must Be At Least 10 Characters Long!')
    .required('Required!')
});

export {
  SendEmailSchema
};