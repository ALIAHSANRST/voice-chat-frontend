import BaseAPI, { HandleError } from "@/src/utils/api"

const GetTutorProfile = async ({ setIsLoading, setData, id }) => {
  try {
    setIsLoading(true);

    const ENDPOINT = `/teacher/profile/${id}`;
    const response = await BaseAPI.get(ENDPOINT);

    if (response.data?.success) setData(response.data.data || {});
  } catch (error) {
    setData({});
    console.error('Calendar > GetTutorProfile:', error);
    HandleError(error, 'Failed To Fetch Upcoming Classes!');
  } finally {
    setIsLoading(false);
  }
};

export { GetTutorProfile }