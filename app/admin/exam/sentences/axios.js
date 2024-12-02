'use client'

import BaseAPI from '@/src/utils/api';
import { COMMON_COMPONENTS } from '@/src/components';
import { CapitalizeWords, DataTableDateFormat } from '@/src/utils/helpers';

/**
 * API functions for managing exam sentences
 * Provides functionality for fetching and deleting sentence records
 */

/**
 * Fetches paginated exam sentences with optional search
 * @async
 * @param {Object} params - Request parameters
 * @param {number} params.limit - Number of records per page
 * @param {number} params.page - Current page number (0-based)
 * @param {string} params.query - Optional search query
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.setData - Data state setter
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const FetchAllRecords = async ({ limit, page, query, setIsLoading, setData }) => {
  try {
    // validate required params
    if (!setData || !setIsLoading) {
      throw new Error('Required state setters missing');
    }

    // build query params
    const queryParams = new URLSearchParams();
    if (typeof page === 'number') queryParams.set('page', page.toString());
    if (typeof limit === 'number') queryParams.set('limit', limit.toString());
    if (query?.trim()) queryParams.set('query', query.trim());

    const ENDPOINT = `/exam/sentence?${queryParams}`;
    const response = await BaseAPI.get(ENDPOINT);

    // validate response data
    if (!response?.data?.sentences || !Array.isArray(response.data.sentences)) {
      throw new Error('Invalid response format');
    }

    // map and format the data
    const mappedData = response.data.sentences.map((item, index) => ({
      ...item,
      index: ((page * limit) + index + 1) - limit,
      complexity_level: CapitalizeWords(item.complexity_level),
      status: CapitalizeWords(item.status),
      updatedBy: CapitalizeWords(item.updatedBy?.fullname),
      updatedAt: DataTableDateFormat(item.updatedAt),
    }));

    setData({
      records: mappedData,
      totalRecords: response.data.totalRecords || 0,
    });
  } catch (error) {
    // reset data on error
    setData({ records: [], totalRecords: 0 });
    console.error('Exam > SentencesPage > FetchAll:', error);
    COMMON_COMPONENTS.Toast.showErrorToast(
      error?.response?.data?.message || 'Failed To Fetch Sentences!'
    );
  } finally {
    setIsLoading(false);
  }
};

/**
 * Deletes an exam sentence by ID
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Sentence ID to delete
 * @param {Function} params.setIsLoading - Loading state setter
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const DeleteRecord = async ({ id, setIsLoading }) => {
  try {
    // validate required params
    if (!id || !setIsLoading) {
      throw new Error('Required parameters missing');
    }

    setIsLoading(true);

    const ENDPOINT = `/exam/sentence/${id}`;
    const response = await BaseAPI.delete(ENDPOINT);

    COMMON_COMPONENTS.Toast.showSuccessToast(
      response?.data?.message || 'Sentence Deleted Successfully!'
    );
  } catch (error) {
    console.error('Exam > SentencesPage > Delete:', error);
    COMMON_COMPONENTS.Toast.showErrorToast(
      error?.response?.data?.message || 'Failed To Delete Sentence!'
    );
  } finally {
    setIsLoading(false);
  }
};

export {
  FetchAllRecords,
  DeleteRecord
};