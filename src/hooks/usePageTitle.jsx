'use client';

import { useEffect } from 'react';
import { COMMON_CONSTANTS } from '../utils/constants';

/**
 * A custom React hook for dynamically managing the document title (browser tab title)
 * with support for multiple segments and customizable separators.
 *
 * @param {Object} options - Configuration options for the page title
 * @param {string|string[]|null} options.title - Main title(s) to be displayed. Can be a single string or array of segments
 * @param {string} options.separator - Custom separator between title segments (default: '|')
 * @param {boolean} options.includeProjectTitle - Whether to include project title (default: true)
 * @param {string} options.defaultTitle - Default title when no title is provided (default: project title)
 * @param {Function} options.transformTitle - Custom function to transform the title before setting
 * @param {Function} options.onError - Custom error handler function
 *
 * @example
 * ```jsx
 * // basic usage with single title
 * usePageTitle({ title: 'Dashboard' });
 *
 * // multiple segments
 * usePageTitle({
 *   title: ['Users', 'Admin', 'Settings']
 * });
 *
 * // custom separator
 * usePageTitle({
 *   title: ['Products', 'Categories'],
 *   separator: '-'
 * });
 *
 * // custom title transformation
 * usePageTitle({
 *   title: 'Products',
 *   transformTitle: (title) => title.toUpperCase()
 * });
 * ```
 */

const usePageTitle = ({
  title = null,
  separator = '|',
  includeProjectTitle = true,
  defaultTitle = COMMON_CONSTANTS.PROJECT_TITLE,
  transformTitle = (t) => t,
  onError = console.error
}) => {
  useEffect(() => {
    try {
      // validate inputs
      if (separator && typeof separator !== 'string') {
        throw new Error('Separator must be a string');
      }
      if (transformTitle && typeof transformTitle !== 'function') {
        throw new Error('transformTitle must be a function');
      }

      // build the title segments
      const segments = [];

      // handle title segments
      if (title) {
        if (Array.isArray(title)) {
          segments.push(...title.map(transformTitle));
        } else {
          segments.push(transformTitle(title));
        }
      } else if (defaultTitle) {
        segments.push(defaultTitle);
      }

      // add project title if enabled and exists
      if (includeProjectTitle && COMMON_CONSTANTS?.PROJECT_TITLE) {
        segments.push(COMMON_CONSTANTS.PROJECT_TITLE);
      }

      // join segments with separator and set document title
      document.title = segments.length > 0
        ? segments.join(` ${separator} `)
        : defaultTitle || '';

    } catch (error) {
      onError('[usePageTitle] Error setting document title:', error);
      // fallback to a safe default
      document.title = defaultTitle || '';
    }
  }, [
    title,
    separator,
    includeProjectTitle,
    defaultTitle,
    transformTitle
  ]);
};

export default usePageTitle;