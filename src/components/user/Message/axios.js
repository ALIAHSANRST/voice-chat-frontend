import BaseAPI, { HandleError } from "@/src/utils/api"

const FetchUser = async ({ id, setIsLoading, setData }) => {
  try {
    setIsLoading(true)

    const ENDPOINT = `/user/${id}`
    const response = await BaseAPI.get(ENDPOINT)

    if (!response?.data) throw new Error('Invalid response format')

    setData(response.data.user)
  } catch (error) {
    console.error('Messages > GetUser:', error)
    HandleError(error, 'Failed To Fetch User!')
  } finally {
    setIsLoading(false)
  }
};

const FetchChats = async ({ limit, page, query, setIsLoading, setData }) => {
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

    const ENDPOINT = `/chat?${queryParams}`
    const response = await BaseAPI.get(ENDPOINT)

    if (!response?.data) throw new Error('Invalid response format')

    response.data.chats = response.data.chats.map(chat => {
      return {
        id: chat._id,
        participantId: chat?.participant?._id || null,
        fullname: chat?.participant?.fullname || 'Unknown',
        profilePicture: chat?.participant?.profile_picture || null,
        lastMessage: chat?.lastMessage?.message || 'No Messages Yet',
        lastMessageTime: chat?.lastMessage?.timestamp || null,
        unreadCount: chat?.unreadCount || 0,
      }
    })

    setData([...response.data.chats])
  } catch (error) {
    console.error('Messages > GetChats:', error)
    HandleError(error, 'Failed To Fetch Chats!')
  } finally {
    setIsLoading(false)
  }
};

const FetchMessages = async ({ id, limit, page, setIsLoading, setData, setPagination }) => {
  try {
    setIsLoading(true)

    // validate required params
    if (!id || !setData || !setIsLoading) {
      throw new Error('Required params missing');
    }

    // build query params
    const queryParams = new URLSearchParams();
    if (typeof page === 'number') queryParams.set('page', page.toString());
    if (typeof limit === 'number') queryParams.set('limit', limit.toString());

    const ENDPOINT = `/chat/${id}?${queryParams}`
    const response = await BaseAPI.get(ENDPOINT)

    if (!response?.data) throw new Error('Invalid response format')

    await new Promise(resolve => setTimeout(resolve, 3000))

    setData(response.data.messages)
    setPagination({
      totalMessages: response.data.totalMessages,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage + 1,
      limit: limit,
    })
  } catch (error) {
    console.error('Messages > GetMessages:', error)
    HandleError(error, 'Failed To Fetch Messages!')
  } finally {
    setIsLoading(false)
  }
}

export { FetchUser, FetchChats, FetchMessages }