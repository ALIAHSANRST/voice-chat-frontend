'use client';

import moment from 'moment';

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - The input string to capitalize
 * @returns {string} The string with first letter of each word capitalized
 */
const CapitalizeWords = (str) => {
  if (!str) return str;
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Formats a date string for data table display
 * @param {string} dateStr - The date string to format
 * @param {string} [format='hh:mm A, DD-MM-YYYY'] - Optional format string
 * @param {string} [invalidText='Invalid Date'] - Optional text to show for invalid dates
 * @returns {string} Formatted date string or invalid date text
 */
const DataTableDateFormat = (dateStr, format = 'hh:mm A, DD-MM-YYYY', invalidText = 'Invalid Date') => {
  if (!dateStr) return invalidText;
  return moment(dateStr).isValid()
    ? moment(dateStr).format(format)
    : invalidText;
};

export {
  CapitalizeWords,
  DataTableDateFormat
};