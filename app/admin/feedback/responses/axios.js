'use client'

import BaseAPI, { HandleError } from '@/src/utils/api';
import { COMMON_COMPONENTS } from '@/src/components';
import { DataTableDateFormat } from '@/src/utils/helpers';

/**
 * API functions for managing feedback questions
 * Provides functionality for fetching and deleting feedback question records
 */

/**
 * Fetches paginated feedback questions with optional search
 * @param {Object} params - Request parameters
 * @param {number} params.limit - Number of records per page
 * @param {number} params.page - Current page number (0-based)
 * @param {string} params.query - Optional search query
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.setData - Data state setter
 * @returns {Promise<void>}
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
    queryParams.set('minified', 'true');

    const ENDPOINT = `/feedback/response?${queryParams}`;
    const response = await BaseAPI.get(ENDPOINT);

    // validate response data
    if (!response?.data?.responses || !Array.isArray(response.data.responses)) {
      throw new Error('Invalid response format');
    }

    // map and format the data
    const mappedData = response.data.responses.map((item, index) => ({
      ...item,
      index: ((page * limit) + index + 1) - limit,
      createdAt: DataTableDateFormat(item.createdAt),
      updatedAt: DataTableDateFormat(item.updatedAt),
    }));

    setData({
      records: mappedData,
      totalRecords: response.data.totalRecords || 0,
    });
  } catch (error) {
    // reset data on error
    setData({ records: [], totalRecords: 0 });
    console.error('Feedback > ResponsesPage > FetchAll:', error);
    HandleError(error, 'Failed To Fetch Responses!');
  } finally {
    setIsLoading(false);
  }
};

/**
 * Deletes a feedback response by ID
 * @param {Object} params - Request parameters
 * @param {string} params.id - Response ID to delete
 * @param {Function} params.setIsLoading - Loading state setter
 * @returns {Promise<void>}
 */
const DeleteRecord = async ({ id, setIsLoading }) => {
  try {
    // validate required params
    if (!id || !setIsLoading) {
      throw new Error('Required parameters missing');
    }

    setIsLoading(true);

    const ENDPOINT = `/feedback/response/${id}`;
    const response = await BaseAPI.delete(ENDPOINT);

    COMMON_COMPONENTS.Toast.showSuccessToast(
      response?.data?.message || 'Response Deleted Successfully!'
    );
  } catch (error) {
    console.error('Feedback > ResponsesPage > Delete:', error);
    HandleError(error, 'Failed To Delete Response!');
  } finally {
    setIsLoading(false);
  }
};

export {
  FetchAllRecords,
  DeleteRecord
};