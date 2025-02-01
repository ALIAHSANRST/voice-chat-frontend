'use client';

import moment from 'moment';
import { SLOT_DURATION_IN_MINUTES } from './constants';

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

/**
 * Generates random text based on specified word count and word length parameters
 * @param {Object} params - Parameters for text generation
 * @param {number} [params.minWords=3] - Minimum number of words in generated text
 * @param {number} [params.maxWords=10] - Maximum number of words in generated text
 * @param {number} [params.minWordLength=3] - Minimum length of each word
 * @param {number} [params.maxWordLength=8] - Maximum length of each word
 * @returns {string} Randomly generated text meeting the specified criteria
 */
const GenerateRandomText = ({
  minWords = 3,
  maxWords = 10,
  minWordLength = 3,
  maxWordLength = 8
} = {}) => {
  // Generate random number of words within range
  const numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;

  // Characters to use for word generation
  const chars = 'abcdefghijklmnopqrstuvwxyz';

  // Generate array of random words
  const words = Array(numWords).fill('').map(() => {
    // Random length for this word
    const wordLength = Math.floor(Math.random() * (maxWordLength - minWordLength + 1)) + minWordLength;

    // Generate random word
    return Array(wordLength)
      .fill('')
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
  });

  return words.join(' ');
};

/**
 * Validates a time slot for overlap with existing slots
 * @param {Object} slot - The time slot to validate
 * @param {Object[]} allSlots - All existing time slots
 * @param {Object} translations - The translations object
 * @returns {string|null} Error message if validation fails, null otherwise
 */
const ValidateTimeSlot = (slot, allSlots, translations) => {
  if (!slot.start) return null;

  const start = moment(slot.start, 'HH:mm');
  const end = moment(slot.start, 'HH:mm').add(SLOT_DURATION_IN_MINUTES, 'minutes');

  const hasOverlap = allSlots.some(existingSlot => {
    if (!existingSlot.start) return false;

    const existingStart = moment(existingSlot.start, 'HH:mm');
    if (existingStart.isSame(start)) return false;

    const existingEnd = moment(existingSlot.start, 'HH:mm').add(SLOT_DURATION_IN_MINUTES, 'minutes');
    const startsInExistingSlot = start.isBetween(existingStart, existingEnd, 'minutes', '[)');
    const endsInExistingSlot = end.isBetween(existingStart, existingEnd, 'minutes', '(]');
    const containsExistingSlot = start.isSameOrBefore(existingStart) && end.isSameOrAfter(existingEnd);
    return startsInExistingSlot || endsInExistingSlot || containsExistingSlot;
  });

  if (hasOverlap) return translations.MANAGE_SLOTS.ERRORS.SLOT_OVERLAP;
  return null;
};

export {
  CapitalizeWords,
  DataTableDateFormat,
  HexToRGBA,
  GenerateRandomText,
  ValidateTimeSlot,
};