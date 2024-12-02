'use client'

/**
 * Constants and configurations for exam sentence form
 * @module ExamSentence.Values
 */

/**
 * Status options for sentences
 * @constant {Array<{value: string, label: string}>}
 * @readonly
 */
const STATUS_OPTIONS = Object.freeze([
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]);

/**
 * Complexity level options for sentences
 * @constant {Array<{value: string, label: string}>}
 * @readonly
 */
const COMPLEXITY_LEVELS = Object.freeze([
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]);

/**
 * Initial form values with default configuration
 * @constant {Object}
 * @property {string} text - Empty sentence text
 * @property {Object} status - Default active status
 * @property {Object} complexity_level - Default easy complexity level
 * @property {string} updatedBy - Empty updated by user
 * @property {string} updatedAt - Empty updated at timestamp
 * @property {string} createdBy - Empty created by user
 * @property {string} createdAt - Empty created at timestamp
 * @readonly
 */
const INITIAL_VALUES = Object.freeze({
  text: '',
  status: STATUS_OPTIONS[0] || { value: 'active', label: 'Active' },
  complexity_level: COMPLEXITY_LEVELS[0] || { value: 'easy', label: 'Easy' },
  updatedBy: null,
  updatedAt: null,
  createdBy: null,
  createdAt: null,
});

// validate required constants before export
if (!STATUS_OPTIONS?.length || !COMPLEXITY_LEVELS?.length) {
  throw new Error('Sentence > Values: Required Configuration Options Are Missing or Invalid');
}

export {
  INITIAL_VALUES,
  STATUS_OPTIONS,
  COMPLEXITY_LEVELS,
};