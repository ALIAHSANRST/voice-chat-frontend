'use client'

import BaseAPI, { HandleError } from '@/src/utils/api';
import { CapitalizeWords } from '@/src/utils/helpers';

/**
 * Gets a random exam with matching sentences
 * @async
 * @param {Object} params - Request parameters 
 * @param {Function} params.setIsLoading - Loading state setter
 * @param {Function} params.setData - Exam data state setter
 * @param {string} params.id - Exam ID
 * @returns {Promise<void>}
 * @throws {Error} When required parameters are missing or API call fails
 */
const GetRandomExam = async ({ setIsLoading, setData, id, setError }) => {
  try {
    // validate required params
    if (!setIsLoading || !setData) {
      throw new Error('Required Parameters Missing');
    }

    setIsLoading(true);

    const ENDPOINT = `/exam/manage/random/${id}`;
    const response = await BaseAPI.get(ENDPOINT);

    response.data.exam.info.complexity_levels = response.data.exam.info.complexity_levels.map(level => CapitalizeWords(level));
    response.data.exam.sentences = response.data.exam.sentences.map(sentence => ({
      ...sentence,
      complexity_level: CapitalizeWords(sentence.complexity_level)
    }));

    setData(response.data);
  } catch (error) {
    console.error('Exam > [id] > Random > GetRandomExam:', error);
    HandleError(error, 'Failed To Generate Random Exam!')
    setError(error?.response?.data?.error || 'Failed To Generate Random Exam!');
  } finally {
    setIsLoading(false);
  }
}

export {
  GetRandomExam
};