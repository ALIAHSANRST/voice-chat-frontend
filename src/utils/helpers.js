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

/**
 * Converts a HEX color code to RGB or RGBA format
 * @param {string} hex - The HEX color code (with or without #)
 * @param {boolean} [includeAlpha=false] - Whether to return RGBA format
 * @param {number} [alpha=1] - Alpha value for RGBA (0-1)
 * @returns {string} Color in RGB/RGBA format
 */
const HexToRGBA = (hex, includeAlpha = false, alpha = 1) => {
  const cleanHex = hex.replace('#', '');

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return includeAlpha
    ? `rgba(${r}, ${g}, ${b}, ${alpha})`
    : `rgb(${r}, ${g}, ${b})`;
};

export {
  CapitalizeWords,
  DataTableDateFormat,
  HexToRGBA
};