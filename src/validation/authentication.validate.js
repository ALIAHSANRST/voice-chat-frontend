import * as Yup from 'yup';

/**
 * Validation schema for user signin form
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} SignInSchema
 * @property {string} email - Valid email address with proper domain
 * @property {string} password - Password (8+ chars)
 */
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Format!')
    .required('Required!')
    .lowercase()
    .trim()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid Format!'
    ),

  password: Yup.string()
    .min(8, 'Must Be At Least 8 Characters!')
    .required('Required!')
});

/**
 * Validation schema for user signup form
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} SignupSchema
 * @property {string} fullname - User's full name (3-30 characters)
 * @property {string} email - Valid email address with proper domain
 * @property {string} password - Password (8-50 chars, must contain number and special char)
 * @property {string} confirmPassword - Must match password exactly
 * @property {string} industry - User's industry sector (2-50 chars)
 * @property {string} region - User's geographical region (2-50 chars) 
 * @property {string} role - User's role/position (2-50 chars)
 */
const SignUpSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, 'Must Be At Least 3 Characters!')
    .max(30, 'Cannot Exceed 30 Characters!')
    .required('Required!')
    .trim()
    .matches(/^[a-zA-Z\s]+$/, 'Can Only Contain Letters And Spaces!'),

  email: Yup.string()
    .email('Invalid Format!')
    .required('Required!')
    .lowercase()
    .trim()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid Format!'
    ),

  password: Yup.string()
    .min(8, 'Must Be At Least 8 Characters!')
    .max(50, 'Cannot Exceed 50 Characters!')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      'Must Contain At Least One Number And One Special Character!'
    )
    .required('Required!'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords Must Match!')
    .required('Required!'),

  industry: Yup.string()
    .min(2, 'Must Be At Least 2 Characters!')
    .max(50, 'Cannot Exceed 50 Characters!')
    .required('Required!')
    .trim(),

  region: Yup.string()
    .min(2, 'Must Be At Least 2 Characters!')
    .max(50, 'Cannot Exceed 50 Characters!')
    .required('Required!')
    .trim(),

  role: Yup.string()
    .min(2, 'Must Be At Least 2 Characters!')
    .max(50, 'Cannot Exceed 50 Characters!')
    .required('Required!')
    .trim()
});

export {
  SignInSchema,
  SignUpSchema
};