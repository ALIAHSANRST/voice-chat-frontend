'use client'

import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT, USER_CONTEXT } from '@/src/context';
import { USER_COLORS } from "@/src/utils/colors";
import { ICON_ASSETS } from "@/src/utils/assets";
import { usePageTitle } from "@/src/hooks";
import SOCKET_EVENTS from "@/src/utils/socketEvents";
import { ROUTES } from "@/src/utils/routes";
import { ROLES } from "@/src/utils/constants";

import Styles from './styles';
import { FetchChats, FetchMessages, FetchUser } from "./axios";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const Message = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();
  const socket = USER_CONTEXT.SocketContext.useSocket();

  usePageTitle({ title: [translations.MESSAGES.TITLE, currentUser?.fullname] })

  const router = useRouter();
  const searchParams = useSearchParams();
  const participantId = searchParams.get('id') || null;

  const headerContainerRef = useRef(null);
  const participantContainerRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const messagesHeaderRef = useRef(null);
  const messagesContentRef = useRef(null);
  const messageInputContainerRef = useRef(null);

  const [isFetchingChats, setIsFetchingChats] = useState(true);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  const [isFetchingUserData, setIsFetchingUserData] = useState(false);

  const [chatsPagination, setChatsPagination] = useState({ limit: 10, page: 1 });
  const [messagesPagination, setMessagesPagination] = useState({ limit: 50, currentPage: 1, totalPages: 1, totalMessages: 0 });

  const [search, setSearch] = useState('');
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (searchParams.has('id') && searchParams.get('id')) {
      const id = searchParams.get('id');
      if (currentUser.account_type === ROLES.TEACHER) {
        router.push(`${ROUTES.TEACHER_MESSAGES.path}?id=${id}`);
      } else if (currentUser.account_type === ROLES.STUDENT) {
        router.push(`${ROUTES.USER_MESSAGES.path}?id=${id}`);
      }

      return;
    }

    setSelectedParticipant(null);
    setIsFetchingMessages(false);
    setIsFetchingUserData(false);
    setMessagesPagination({ currentPage: 1, totalPages: 1, totalMessages: 0, limit: 50 });
    setMessages([]);
    setMessage('');
  }, [searchParams, participantId]);

  useEffect(() => {
    const fetchChats = async () => {
      await FetchChats({
        setIsLoading: setIsFetchingChats,
        setData: setParticipants,
        limit: chatsPagination.limit,
        page: chatsPagination.page,
        query: search || null,
      })
    }

    fetchChats();
  }, [chatsPagination, search]);

  useEffect(() => {
    if (participants.length > 0) {
      setFilteredParticipants(participants);
    }
  }, [participants]);

  useEffect(() => {
    if (participantId && !isFetchingChats) {
      const selectedParticipant = participants.find((participant) => participant.participantId === participantId);
      if (selectedParticipant) {
        const __FetchMessages = async () => {
          setSelectedParticipant(selectedParticipant);

          await FetchMessages({
            id: selectedParticipant.id,
            limit: messagesPagination.limit,
            page: messagesPagination.currentPage,
            setIsLoading: setIsFetchingMessages,
            setData: setMessages,
            setPagination: setMessagesPagination,
          })

          socket.emit(SOCKET_EVENTS.CHAT.MARK_READ, { chatId: selectedParticipant.id });
        }

        __FetchMessages();
        return;
      }

      const __FetchUser = async () => {
        await FetchUser({
          id: participantId,
          setIsLoading: setIsFetchingUserData,
          setData: setSelectedParticipant,
        })
      }

      __FetchUser();
    }
  }, [participantId, isFetchingChats]);

  useEffect(() => {
    if (selectedParticipant && selectedParticipant._id) {
      const _ = participants.find((participant) => participant.participantId === selectedParticipant._id);
      if (_) setSelectedParticipant(_);
    }
  }, [selectedParticipant, participants, isFetchingUserData]);

  useEffect(() => {
    if (participantContainerRef.current && headerContainerRef.current && messagesContainerRef.current) {
      const headerHeight = headerContainerRef.current.offsetHeight;
      participantContainerRef.current.style.height = `calc(100vh - ${headerHeight}px - 4rem)`;
      messagesContainerRef.current.style.height = `calc(100vh - ${headerHeight}px - 4rem)`;
    }
  }, [headerContainerRef, participantContainerRef, messagesContainerRef, selectedParticipant, isFetchingUserData, isFetchingChats]);

  useEffect(() => {
    if (messagesHeaderRef.current && messagesContentRef.current && messageInputContainerRef.current) {
      const messagesHeaderHeight = messagesHeaderRef.current.offsetHeight;
      const messagesInputContainerHeight = messageInputContainerRef.current.offsetHeight;
      messagesContentRef.current.style.height = `calc(100vh - ${messagesHeaderHeight}px - ${messagesInputContainerHeight}px)`;
    }
  }, [messagesHeaderRef, messagesContentRef, messageInputContainerRef, selectedParticipant, isFetchingUserData, isFetchingChats]);

  useEffect(() => {
    const handleScroll = async () => {
      const areWeAtTop = messagesContentRef.current.scrollTop === 0;
      const currentScrollHeight = messagesContentRef.current.scrollHeight;
      if (areWeAtTop && messagesPagination.currentPage <= messagesPagination.totalPages && messagesPagination.totalMessages > messages.length) {
        await FetchMessages({
          id: selectedParticipant.id,
          limit: messagesPagination.limit,
          page: messagesPagination.currentPage,
          setIsLoading: setIsFetchingMessages,
          setData: (newMessages) => setMessages((prevMessages) => [...newMessages, ...prevMessages]),
          setPagination: setMessagesPagination,
        });

        messagesContentRef.current.scrollTop = messagesContentRef.current.scrollHeight - currentScrollHeight;
      }
    };

    const messagesContainer = messagesContentRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (messagesContainer) {
        messagesContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [selectedParticipant, messagesPagination, setIsFetchingMessages, setMessages]);

  useEffect(() => {
    setFilteredParticipants(participants.filter((participant) => {
      return participant.fullname.toLowerCase().includes(search.toLowerCase());
    }));
  }, [search]);

  useEffect(() => {
    if (messagesContentRef.current && messagesPagination.currentPage < 3) {
      messagesContentRef.current.scrollTop = messagesContentRef.current.scrollHeight;
    }
  }, [messagesContentRef, messages, message]);

  useEffect(() => {
    if (socket) {
      const handleMessage = (data) => {
        console.log(`Socket Event: '${SOCKET_EVENTS.CHAT.MESSAGE}' - Data: ${JSON.stringify(data)}`);

        if (data.sender !== currentUser._id) {
          if (selectedParticipant?.id === data.chatId) {
            if (selectedParticipant?.participantId === data.sender) {
              socket.emit(SOCKET_EVENTS.CHAT.MARK_READ, { chatId: data.chatId });
            }
            setMessages([...messages, data]);
          }
        }

        // if participant is new, add to participants list
        const newParticipant = participants.find((participant) => participant.id === data.chatId);
        if (!newParticipant || newParticipant === undefined) {
          setChatsPagination({ ...chatsPagination });
          return;
        }

        const updatedParticipants = participants.map((participant) => {
          if (participant.id === data.chatId) {
            const unreadCount = data.sender !== currentUser._id && selectedParticipant?.id !== data.chatId ? participant.unreadCount + 1 : 0;
            return { ...participant, lastMessage: data.message, lastMessageTime: data.timestamp, unreadCount: unreadCount };
          }
          return participant;
        }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        setParticipants(updatedParticipants);
      }

      const handleMarkRead = (data) => {
        console.log(`Socket Event: '${SOCKET_EVENTS.CHAT.MARK_READ}' - Data: ${JSON.stringify(data)}`);

        const updatedParticipants = participants.map((participant) => {
          if (participant.id === data) {
            return { ...participant, unreadCount: 0 };
          }
          return participant;
        });

        setParticipants(updatedParticipants);

        if (selectedParticipant?.id === data) {
          setMessages(messages.map((m) => {
            if (m.sender === currentUser._id && !m.is_read) {
              return { ...m, is_read: true };
            }
            return m;
          }));
        }
      }

      socket.on(SOCKET_EVENTS.CHAT.MESSAGE, handleMessage);
      socket.on(SOCKET_EVENTS.CHAT.MARK_READ, handleMarkRead);

      return () => {
        socket.off(SOCKET_EVENTS.CHAT.MESSAGE, handleMessage);
        socket.off(SOCKET_EVENTS.CHAT.MARK_READ, handleMarkRead);
      };
    }
  }, [socket, messages, participants, selectedParticipant, currentUser]);

  const HandleChangeParticipant = (chat) => {
    if (currentUser.account_type === ROLES.TEACHER) {
      router.push(`${ROUTES.TEACHER_MESSAGES.path}?id=${chat.participantId}`);
    } else if (currentUser.account_type === ROLES.STUDENT) {
      router.push(`${ROUTES.USER_MESSAGES.path}?id=${chat.participantId}`);
    } else {
      return;
    }

    socket.emit(SOCKET_EVENTS.CHAT.MARK_READ, { chatId: chat.id });

    setSelectedParticipant(chat);
    setMessage('');
    setMessages([]);
    setMessagesPagination({ currentPage: 1, totalPages: 1, totalMessages: 0, limit: 50 });
    setIsFetchingMessages(false);
    setIsFetchingUserData(false);
  }

  const HandleSendMessage = () => {
    if (message.length > 0) {
      const payload = {
        message: message,
        type: 'text',
        sender: currentUser._id,
        to: participantId,
      }

      setMessages([...messages, payload]);
      setMessage('');

      setParticipants(participants.map((participant) => {
        if (participant.id === selectedParticipant.id) {
          return { ...participant, lastMessage: message, lastMessageTime: new Date(), unreadCount: 0 };
        }
        return participant;
      }));

      socket.emit(SOCKET_EVENTS.CHAT.MESSAGE, payload);
    }
  }

  return (
    <Styles.MainContainer>
      <USER_COMPONENTS.HeaderNavBar activeItem="messages" reference={headerContainerRef} />
      <Styles.ContentContainer>
        {
          isFetchingChats &&
          <Styles.ParticipantsContainer ref={participantContainerRef}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <COMMON_COMPONENTS.Loader message={translations.MESSAGES.LOADING_CHATS} wrapped />
            </div>
          </Styles.ParticipantsContainer>
        }

        {
          !isFetchingChats &&
          <Styles.ParticipantsContainer ref={participantContainerRef}>
            <USER_COMPONENTS.InputFields.SearchField
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              containerStyle={{
                margin: '1.25rem 1.25rem 0 1.25rem',
              }}
            />

            {
              filteredParticipants.length > 0 ? (
                <Styles.ParticipantsList>
                  {filteredParticipants.map((participant, index) => {
                    return (
                      <Styles.ParticipantItem
                        key={participant.id}
                        selected={selectedParticipant?.id === participant.id} isLast={index === participants.length - 1}
                        onClick={() => HandleChangeParticipant(participant)}>
                        {
                          participant.profilePicture
                            ? <Styles.ProfilePicture src={participant.profilePicture} alt={participant.fullname} />
                            : <Styles.ParticipantProfilePicture selected={selectedParticipant?.id === participant.id}>
                              <Styles.ParticipantInitials selected={selectedParticipant?.id === participant.id}>{
                                (() => {
                                  const words = participant.fullname.toUpperCase().split(' ');
                                  return words.length > 1 ? words[0][0] + words[1][0] : participant.fullname.toUpperCase().slice(0, 2)
                                })()
                              }</Styles.ParticipantInitials>
                            </Styles.ParticipantProfilePicture>
                        }
                        <Styles.ParticipantDetails>
                          <Styles.ParticipantName selected={selectedParticipant?.id === participant.id}>
                            {participant.fullname}
                          </Styles.ParticipantName>
                          <Styles.ParticipantLastMessage selected={selectedParticipant?.id === participant.id}>
                            {participant.lastMessage}
                          </Styles.ParticipantLastMessage>
                        </Styles.ParticipantDetails>
                        <Styles.ParticipantRightContainer>
                          <Styles.ParticipantLastMessageTime selected={selectedParticipant?.id === participant.id}>
                            {moment(participant.lastMessageTime).format('h:mm A')}
                          </Styles.ParticipantLastMessageTime>

                          {
                            participant.unreadCount > 0 &&
                            <Styles.ParticipantUnreadMessagesContainer>
                              <span>{participant.unreadCount}</span>
                            </Styles.ParticipantUnreadMessagesContainer>
                          }
                        </Styles.ParticipantRightContainer>
                      </Styles.ParticipantItem>
                    )
                  })}
                </Styles.ParticipantsList>
              ) : (
                <Styles.NoParticipantsFound>
                  {translations.MESSAGES.NO_PARTICIPANTS}
                </Styles.NoParticipantsFound>
              )
            }
          </Styles.ParticipantsContainer>
        }

        {
          isFetchingUserData &&
          <Styles.MessagesContainer ref={messagesContainerRef}>
            <Styles.MessageContentContainer ref={messagesContentRef} style={{ height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <COMMON_COMPONENTS.Loader message={translations.MESSAGES.LOADING_CHAT} wrapped />
              </div>
            </Styles.MessageContentContainer>
          </Styles.MessagesContainer>
        }

        {
          !selectedParticipant && !isFetchingUserData &&
          <Styles.MessagesContainer ref={messagesContainerRef}>
            <Styles.MessageContentContainer ref={messagesContentRef} style={{ height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '500', color: USER_COLORS.MESSAGES.MessageContainer.Header.SecondaryText }}>
                  {
                    participants.length === 0
                      ? translations.MESSAGES.NO_PARTICIPANTS
                      : translations.MESSAGES.OPEN_CHAT_TO_START
                  }
                </span>
              </div>
            </Styles.MessageContentContainer>
          </Styles.MessagesContainer>
        }

        {
          selectedParticipant && !isFetchingUserData &&
          <Styles.MessagesContainer ref={messagesContainerRef}>
            <Styles.MessagesHeader ref={messagesHeaderRef}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {
                  selectedParticipant?.profilePicture
                    ? <Styles.ProfilePicture src={selectedParticipant?.profilePicture} alt={selectedParticipant?.fullname} />
                    : <Styles.ProfilePictureInitials>
                      <span>{
                        (() => {
                          const words = selectedParticipant?.fullname.toUpperCase().split(' ') || [];
                          return words.length > 1 ? words[0][0] + words[1][0] : selectedParticipant?.fullname.toUpperCase().slice(0, 2)
                        })()
                      }</span>
                    </Styles.ProfilePictureInitials>
                }
                <span style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: USER_COLORS.MESSAGES.MessageContainer.Header.PrimaryText,
                }}>{selectedParticipant?.fullname}</span>
              </div>
              <img src={ICON_ASSETS.INFO_ICON} alt="Info" style={{
                width: '1.25rem',
                height: '1.25rem',
                cursor: 'pointer',
              }} />
            </Styles.MessagesHeader>

            <Styles.MessageContentContainer ref={messagesContentRef}>
              {
                isFetchingMessages && messagesPagination.currentPage === 1 &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <COMMON_COMPONENTS.Loader message={translations.MESSAGES.LOADING_CHAT} wrapped />
                </div>
              }

              {
                isFetchingMessages && messagesPagination.currentPage > 1 &&
                <Styles.LoadingOlderMessagesContainer>
                  <span>{translations.MESSAGES.LOADING_CHAT}</span>
                </Styles.LoadingOlderMessagesContainer>
              }

              {
                (!isFetchingMessages || messagesPagination.currentPage > 1) &&
                messages.map((m) => {
                  if (!m) return null;
                  const isMessageFromCurrentUser = m?.sender === currentUser._id;

                  if (isMessageFromCurrentUser) {
                    return (
                      <Styles.MessageSenderContainer key={m._id}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <Styles.MessageBubble isSender>{m?.message}</Styles.MessageBubble>
                          <Styles.MessageMetaContainer>
                            <Styles.MessageTime isSender>{moment(m?.timestamp).format('h:mm A')}</Styles.MessageTime>
                            {
                              m?.is_read && <FontAwesomeIcon icon={faCheckDouble} color={USER_COLORS.MESSAGES.MessageContainer.Sender.ReadIcon} />
                            }
                          </Styles.MessageMetaContainer>
                        </div>
                        <div>
                          {
                            currentUser.profilePicture
                              ? <Styles.ProfilePictureSmall src={currentUser?.profilePicture} alt={currentUser?.fullname} />
                              : <Styles.ProfilePictureInitialsSmall>
                                <span>{
                                  (() => {
                                    const words = currentUser?.fullname.toUpperCase().split(' ');
                                    return words.length > 1 ? words[0][0] + words[1][0] : currentUser?.fullname.toUpperCase().slice(0, 2)
                                  })()
                                }</span>
                              </Styles.ProfilePictureInitialsSmall>
                          }
                        </div>
                      </Styles.MessageSenderContainer>
                    )
                  }

                  return (
                    <Styles.MessageReceiverContainer key={m._id}>
                      <div>
                        {
                          selectedParticipant?.profilePicture
                            ? <Styles.ProfilePictureSmall src={selectedParticipant?.profilePicture} alt={selectedParticipant?.fullname} />
                            : <Styles.ProfilePictureInitialsSmall>
                              <span>{
                                (() => {
                                  const words = selectedParticipant?.fullname.toUpperCase().split(' ') || [];
                                  return words.length > 1 ? words[0][0] + words[1][0] : selectedParticipant?.fullname.toUpperCase().slice(0, 2)
                                })()
                              }</span>
                            </Styles.ProfilePictureInitialsSmall>
                        }
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <Styles.MessageBubble>{m.message}</Styles.MessageBubble>
                        <Styles.MessageTime>{moment(m.timestamp).format('h:mm A')}</Styles.MessageTime>
                      </div>
                    </Styles.MessageReceiverContainer>
                  )
                })}
            </Styles.MessageContentContainer>

            <Styles.MessageInputContainer ref={messageInputContainerRef}>
              <Styles.MessageInputBoxWrapper>
                <Styles.MessageInputBox
                  contentEditable={true}
                  onInput={(e) => {
                    setMessage(e.target.innerText.trim());
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      HandleSendMessage();
                      e.target.innerText = '';
                    }
                  }}
                >
                </Styles.MessageInputBox>
                {
                  message.trim().length === 0
                  && <Styles.MessageBoxPlaceholder>{translations.MESSAGES.TYPE_MESSAGE}</Styles.MessageBoxPlaceholder>
                }
              </Styles.MessageInputBoxWrapper>

              <Styles.SendMessageButton onClick={HandleSendMessage} title={translations.MESSAGES.SEND_MESSAGE}>
                <img src={ICON_ASSETS.SEND_MESSAGE_ICON} alt="Send Message" />
              </Styles.SendMessageButton>
            </Styles.MessageInputContainer>
          </Styles.MessagesContainer>
        }
      </Styles.ContentContainer>
    </Styles.MainContainer>
  )
}

export default Message;