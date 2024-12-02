'use client'

/**
 * Constants and configurations for feedback question form
 * @module FeedbackQuestion.Values
 */

/**
 * Status options for questions and options
 * @constant {Array<{value: string, label: string}>}
 * @readonly
 */
const STATUS_OPTIONS = Object.freeze([
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]);

/**
 * Question type options defining available formats
 * @constant {Array<{value: string, label: string}>}
 * @readonly
 */
const QUESTION_TYPES = Object.freeze([
  { value: 'single', label: 'Single Choice' },
  { value: 'multiple', label: 'Multiple Choice' },
]);

/**
 * Initial form values with default configuration
 * @constant {Object}
 * @property {string} question - Empty question text
 * @property {Object} status - Default active status
 * @property {Object} questionType - Default single choice type
 * @property {Array<Object>} options - Minimum two empty options with active status
 * @readonly
 */
const INITIAL_VALUES = Object.freeze({
  question: '',
  status: STATUS_OPTIONS[0] || { value: 'active', label: 'Active' },
  questionType: QUESTION_TYPES[0] || { value: 'single', label: 'Single Choice' },
  options: [
    { text: '', status: STATUS_OPTIONS[0] || { value: 'active', label: 'Active' } },
    { text: '', status: STATUS_OPTIONS[0] || { value: 'active', label: 'Active' } },
  ],
});

// validate required constants before export
if (!STATUS_OPTIONS?.length || !QUESTION_TYPES?.length) {
  throw new Error('FeedbackQuestion > Values: Required Configuration Options Are Missing or Invalid');
}

export {
  INITIAL_VALUES,
  STATUS_OPTIONS,
  QUESTION_TYPES,
};