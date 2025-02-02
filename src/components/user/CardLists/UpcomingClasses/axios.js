import BaseAPI, { HandleError } from "@/src/utils/api"

const FetchAllUpcomingClasses = async ({ limit, page, query, setIsLoading, setData }) => {
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

    const ENDPOINT = `/class?${queryParams}`;
    const response = await BaseAPI.get(ENDPOINT);

    // validate response data
    if (!response?.data?.classes) {
      throw new Error('Invalid Response Data');
    }

    setData({
      records: response.data.classes,
      totalRecords: response.data.totalRecords || 0,
    });
  } catch (error) {
    // reset data on error
    setData({ records: [], totalRecords: 0 });
    console.error('CardList > UpcomingClasses > FetchAllUpcomingClasses:', error);
    HandleError(error, 'Failed To Fetch Upcoming Classes!');
  } finally {
    setIsLoading(false);
  }
};

export { FetchAllUpcomingClasses }