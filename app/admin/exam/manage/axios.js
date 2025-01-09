'use client'

import BaseAPI, { HandleError } from '@/src/utils/api';
import { COMMON_COMPONENTS } from '@/src/components';
import { CapitalizeWords, DataTableDateFormat } from '@/src/utils/helpers';

/**
 * API functions for managing exams
 * Provides functionality for fetching and deleting exam records
 */

/**
 * Fetches paginated exams with optional search
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

    const ENDPOINT = `/exam/manage?${queryParams}`;
    const response = await BaseAPI.get(ENDPOINT);

    // validate response data
    if (!response?.data?.exams || !Array.isArray(response.data.exams)) {
      throw new Error('Invalid response format');
    }

    // map and format the data
    const mappedData = response.data.exams.map((item, index) => ({
      ...item,
      index: ((page * limit) + index + 1) - limit,
      title: CapitalizeWords(item?.name),
      is_free: item?.is_free ? 'Yes' : 'No',
      total_marks: item?.total_marks,
      limit: `${item?.word_limit || item?.sentence_limit} ${item?.word_limit ? 'W' : 'S'}`,
      complexity_levels: item?.complexity_levels?.map(level => CapitalizeWords(level)),
      status: CapitalizeWords(item?.status),
      updatedBy: CapitalizeWords(item?.updatedBy?.fullname),
      updatedAt: DataTableDateFormat(item?.updatedAt),
    }));

    setData({
      records: mappedData,
      totalRecords: response.data.totalRecords || 0,
    });
  } catch (error) {
    // reset data on error
    setData({ records: [], totalRecords: 0 });
    console.error('Exam > ManagePage > FetchAll:', error);
    HandleError(error, 'Failed To Fetch Exams!')
  } finally {
    setIsLoading(false);
  }
};

/**
 * Deletes an exam by ID
 * @async
 * @param {Object} params - Request parameters
 * @param {string} params.id - Exam ID to delete
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

    const ENDPOINT = `/exam/manage/${id}`;
    const response = await BaseAPI.delete(ENDPOINT);

    COMMON_COMPONENTS.Toast.showSuccessToast(
      response?.data?.message || 'Exam Deleted Successfully!'
    );
  } catch (error) {
    console.error('Exam > ManagePage > Delete:', error);
    HandleError(error, 'Failed To Delete Exam!');
  } finally {
    setIsLoading(false);
  }
};

export {
  FetchAllRecords,
  DeleteRecord
};