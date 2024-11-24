import * as Yup from 'yup';

/**
 * Validation schema for exam script content
 * Defines validation rules and error messages for the content field
 * 
 * @typedef {Object} ExamScriptSchema
 * @property {string} content - The exam script content
 */
const ExamScriptSchema = Yup.object().shape({
  content: Yup.string()
    .min(10, 'Must Be At Least 10 Characters Long!')
    .max(5000, 'Cannot Exceed 5000 Characters!')
    .required('Required!')
    .trim(),
});

export {
  ExamScriptSchema
};