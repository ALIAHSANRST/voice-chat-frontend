'use client';

import * as Yup from 'yup';

/**
 * Validation schema for user personal information form
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} PersonalInformationSchema
 * @property {string} fullname - User's full name (3-30 characters)
 * @property {string} email - Valid email address with proper domain
 */
const PersonalInformationSchema = Yup.object().shape({
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
});

/**
 * Validation schema for changing user password
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} ChangePasswordSchema
 * @property {string} currentPassword - Current password (8+ chars)
 * @property {string} newPassword - New password (8-50 chars, must contain number and special char)
 */
const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, 'Must Be At Least 8 Characters!')
    .required('Required!'),

  newPassword: Yup.string()
    .min(8, 'Must Be At Least 8 Characters!')
    .max(50, 'Cannot Exceed 50 Characters!')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
      'Must Contain At Least One Number And One Special Character!'
    )
    .required('Required!'),
});

export {
  PersonalInformationSchema,
  ChangePasswordSchema
};