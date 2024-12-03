'use client';

import * as Yup from 'yup';

/**
 * Validation schema for exams
 * Defines validation rules and error messages for each field
 * 
 * @typedef {Object} ExamSchema
 * @property {string} name - The name of the exam
 * @property {string} description - The description of the exam
 * @property {number} total_marks - Total marks for the exam
 * @property {number} word_limit - Word limit for exam responses
 * @property {number} sentence_limit - Sentence limit for exam responses
 * @property {Array<string>} complexity_levels - The complexity levels of the exam
 * @property {Array<RubricsLevel>} rubrics_levels - Array of rubrics level criteria
 * @property {("active"|"inactive")} status - The status of the exam
 */
const ExamSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'At Least 3 Characters Long!')
    .max(100, 'Max 100 Characters!')
    .required('Required!'),

  description: Yup.string()
    .min(10, 'At Least 10 Characters Long!')
    .max(500, 'Max 500 Characters!')
    .required('Required!'),

  total_marks: Yup.number()
    .min(0, 'At Least 0 Allowed!')
    .max(100, 'Max 100 Allowed!')
    .required('Required!'),

  word_limit: Yup.number()
    .typeError('Invalid')
    .test('exclusive', 'Cannot Specify Both Word And Sentence Limit!', function (value) {
      if (value && this.parent.sentence_limit) {
        this.parent.sentence_limit = null;
        return false;
      }
      return true;
    })
    .test('required', 'Either Word Or Sentence Limit Is Required!', function (value) {
      return value || this.parent.sentence_limit;
    })
    .min(10, 'At Least 10 Allowed!')
    .max(1000, 'Max 1000 Allowed!'),

  sentence_limit: Yup.number()
    .typeError('Invalid')
    .test('exclusive', 'Cannot Specify Both Word And Sentence Limit!', function (value) {
      if (value && this.parent.word_limit) {
        this.parent.word_limit = null;
        return false;
      }
      return true;
    })
    .test('required', 'Either Word Or Sentence Limit Is Required!', function (value) {
      return value || this.parent.word_limit;
    })
    .min(10, 'At Least 10 Allowed!')
    .max(100, 'Max 100 Allowed!'),

  complexity_levels: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string()
          .oneOf(['easy', 'medium', 'hard'], 'Must Be Either "easy", "medium" or "hard"!')
          .required('Required!'),

        label: Yup.string()
          .trim()
          .min(1, 'Too Short!')
          .max(25, 'Too Long!')
          .required('Required!'),
      }),
    )
    .min(1, 'At Least 1 Required!')
    .max(3, 'Max Limit Exceed!')
    .required('Required!'),

  rubrics_levels: Yup.array()
    .of(
      Yup.object({
        level_name: Yup.string()
          .min(3, 'At Least 3 Characters Long!')
          .max(100, 'Max 100 Characters!')
          .required('Required!'),

        level_description: Yup.string()
          .min(3, 'At Least 3 Characters Long!')
          .max(1000, 'Max 1000 Characters!')
          .required('Required!'),

        upper_percentage: Yup.number()
          .min(0, 'At Least 0 Allowed!')
          .max(100, 'Max 100 Allowed!')
          .required('Required!'),

        lower_percentage: Yup.number()
          .min(0, 'At Least 0 Allowed!')
          .max(100, 'Max 100 Allowed!')
          .required('Required!')
      })
    )
    .min(1, 'At Least One Level Is Required!')
    .required('Required!'),

  status: Yup.object({
    label: Yup.string().required('Required!'),
    value: Yup.string()
      .typeError('Invalid')
      .oneOf(['active', 'inactive'], 'Invalid!')
      .required('Required!')
  }),
});

export {
  ExamSchema
};