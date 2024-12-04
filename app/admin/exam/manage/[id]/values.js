'use client'

/**
 * Constants and configurations for exam form
 * @module Exam.Values
 */

/**
 * Status options for exam
 * @constant {Array<{value: string, label: string}>}
 * @readonly
 */
const STATUS_OPTIONS = Object.freeze([
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]);

/**
 * Complexity level options for exam
 * @constant {Array<{value: string, label: string}>}
 * @readonly
 */
const COMPLEXITY_LEVELS = Object.freeze([
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]);

/**
 * Is Free options for exam
 * @constant {Array<{value: string, label: string}>}
 * @readonly
 */
const IS_FREE_OPTIONS = Object.freeze([
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]);

/**
 * Initial form values with default configuration
 * @constant {Object}
 * @property {string} name - Empty exam name
 * @property {string} description - Empty exam description
 * @property {number} total_marks - Default total marks
 * @property {number} word_limit - Default word limit
 * @property {number} sentence_limit - Default sentence limit
 * @property {Array} complexity_levels - Default complexity levels
 * @property {Array} rubrics_levels - Default rubrics levels
 * @property {Object} status - Default active status
 * @property {string} updatedBy - Empty updated by user
 * @property {string} updatedAt - Empty updated at timestamp
 * @property {string} createdBy - Empty created by user
 * @property {string} createdAt - Empty created at timestamp
 * @readonly
 */
const INITIAL_VALUES = Object.freeze({
  name: '',
  description: '',
  is_free: IS_FREE_OPTIONS[0] || { value: 'yes', label: 'Yes' },
  total_marks: '',
  word_limit: '',
  sentence_limit: '',
  complexity_levels: [],
  rubrics_levels: [],
  status: STATUS_OPTIONS[0] || { value: 'active', label: 'Active' },
  updatedBy: null,
  updatedAt: null,
  createdBy: null,
  createdAt: null,
});

// validate required constants before export
if (!STATUS_OPTIONS?.length || !COMPLEXITY_LEVELS?.length || !IS_FREE_OPTIONS?.length) {
  throw new Error('Exam > Values: Required Configuration Options Are Missing or Invalid');
}

export {
  INITIAL_VALUES,
  STATUS_OPTIONS,
  COMPLEXITY_LEVELS,
  IS_FREE_OPTIONS,
};