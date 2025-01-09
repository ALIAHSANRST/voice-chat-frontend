'use client'

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import { USER_COMPONENTS } from '@/src/components';
import { COMMON_CONTEXT } from '@/src/context';
import { USER_COLORS } from "@/src/utils/colors";
import { ICON_ASSETS } from "@/src/utils/assets";
import { usePageTitle } from "@/src/hooks";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${USER_COLORS.Home.Background};
  font-family: 'Montserrat', sans-serif;
`

const ContentContainer = styled.div`
  padding: 2rem 3rem;
  display: flex;
  gap: 2rem;
  max-width: 90rem;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
    flex-direction: column;
  }
`

const ParticipantsContainer = styled.div`
  width: 33%;
  height: 100%;
  background-color: ${USER_COLORS.MESSAGES.ParticipantList.Background};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow-y: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const ParticipantsList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${USER_COLORS.MESSAGES.ParticipantList.Border};
    border-radius: 0.25rem;
  }
`

const ParticipantItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background-color: ${props => props.selected
    ? USER_COLORS.MESSAGES.ParticipantList.Item.Background.Selected
    : USER_COLORS.MESSAGES.ParticipantList.Item.Background.Unselected};
  cursor: pointer;
  border-bottom: ${props => props.isLast ? 'none' : `1px solid ${USER_COLORS.MESSAGES.ParticipantList.Border}`};
`

const ParticipantProfilePicture = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${props => props.selected
    ? USER_COLORS.MESSAGES.ParticipantList.Item.Background.Unselected
    : USER_COLORS.MESSAGES.ParticipantList.Item.Background.Selected};
  display: flex;
  align-items: center;
  justify-content: center;
`

const ParticipantInitials = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.selected
    ? USER_COLORS.MESSAGES.ParticipantList.Item.PrimaryText.Unselected
    : USER_COLORS.MESSAGES.ParticipantList.Item.PrimaryText.Selected};
`

const ParticipantDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const ParticipantName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.selected
    ? USER_COLORS.MESSAGES.ParticipantList.Item.PrimaryText.Selected
    : USER_COLORS.MESSAGES.ParticipantList.Item.PrimaryText.Unselected};
`

const ParticipantLastMessage = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${props => props.selected
    ? USER_COLORS.MESSAGES.ParticipantList.Item.SecondaryText.Selected
    : USER_COLORS.MESSAGES.ParticipantList.Item.SecondaryText.Unselected};
`

const ParticipantLastMessageTime = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${props => props.selected
    ? USER_COLORS.MESSAGES.ParticipantList.Item.SecondaryText.Selected
    : USER_COLORS.MESSAGES.ParticipantList.Item.SecondaryText.Unselected};
  margin-left: auto;
`

const NoParticipantsFound = styled.span`
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  color: #6D7580;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MessagesContainer = styled.div`
  width: 67%;
  height: 100%;
  background-color: ${USER_COLORS.MESSAGES.MessageContainer.Background};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const MessagesHeader = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem;
  justify-content: space-between;
  align-items: center;
  background-color: ${USER_COLORS.MESSAGES.MessageContainer.Background};
  border-bottom: 1px solid ${USER_COLORS.MESSAGES.MessageContainer.Border};
`

const MessageContentContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  padding: 1.25rem 1.25rem 0 1.25rem;

  &::-webkit-scrollbar {
    width: 0.375rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${USER_COLORS.MESSAGES.MessageContainer.Border};
    border-radius: 0.375rem;
  }
`

const MessageInputContainer = styled.div`
  width: calc(100% - 2.5rem);
  background-color: ${USER_COLORS.MESSAGES.MessageContainer.Background};
  display: flex;
  gap: 1rem;
  border: 1px solid ${USER_COLORS.MESSAGES.MessageContainer.Border};
  border-radius: 0.5rem;
  margin: 1.25rem;
  padding: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: ${USER_COLORS.MESSAGES.MessageContainer.Primary};
  }
`

const MessageInputBoxWrapper = styled.div`
  position: relative;
  width: 100%;
`

const MessageInputBox = styled.div`
  width: 100%;
  height: 100%;
  max-height: 10rem;
  overflow-y: auto;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: ${USER_COLORS.MESSAGES.MessageContainer.Header.PrimaryText};
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  word-break: break-word;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${USER_COLORS.MESSAGES.MessageContainer.Border};
    border-radius: 0.25rem;
  }
`

const MessageBoxPlaceholder = styled.span`
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  font-size: 1rem;
  font-weight: 400;
  color: ${USER_COLORS.MESSAGES.MessageContainer.Header.SecondaryText};
`

const MessageSenderContainer = styled.div`
  display: flex;
  max-width: 75%;
  margin-left: auto;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`

const MessageReceiverContainer = styled.div`
  display: flex;
  max-width: 75%;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`

const MessageBubble = styled.div`
  padding: 0.75rem;
  background-color: ${props => props.isSender
    ? USER_COLORS.MESSAGES.MessageContainer.Sender.Background
    : USER_COLORS.MESSAGES.MessageContainer.Receiver.Background};
  color: ${props => props.isSender
    ? USER_COLORS.MESSAGES.MessageContainer.Sender.Text
    : USER_COLORS.MESSAGES.MessageContainer.Receiver.Text};
  border-radius: 0.5rem;
  border-bottom-right-radius: ${props => props.isSender ? '0rem' : '0.5rem'};
  border-bottom-left-radius: ${props => props.isSender ? '0.5rem' : '0rem'};
  border-top-left-radius: 0.5rem;
  border: 1px solid ${props => props.isSender
    ? USER_COLORS.MESSAGES.MessageContainer.Sender.Border
    : USER_COLORS.MESSAGES.MessageContainer.Receiver.Border};
`

const MessageTime = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${USER_COLORS.MESSAGES.MessageContainer.Header.SecondaryText};
  text-align: ${props => props.isSender ? 'right' : 'left'};
`

const ProfilePicture = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`

const ProfilePictureSmall = styled(ProfilePicture)`
  width: 2rem;
  height: 2rem;
`

const ProfilePictureInitials = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${USER_COLORS.MESSAGES.MessageContainer.Primary};
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 1rem;
    font-weight: 600;
    color: ${USER_COLORS.MESSAGES.MessageContainer.Background};
  }
`

const ProfilePictureInitialsSmall = styled(ProfilePictureInitials)`
  width: 2rem;
  height: 2rem;

  span {
    font-size: 0.875rem;
  }
`

const SendMessageButton = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${USER_COLORS.MESSAGES.MessageContainer.Primary};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  aspect-ratio: 1/1;
`

const MessagesPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  usePageTitle({ title: [translations.MESSAGES.TITLE, currentUser?.fullname] })

  const headerContainerRef = useRef(null);
  const participantContainerRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const messagesHeaderRef = useRef(null);
  const messagesContentRef = useRef(null);
  const messageInputContainerRef = useRef(null);

  const [search, setSearch] = useState('');
  const [participants, setParticipants] = useState([
    {
      id: 1,
      fullname: 'Adam Potter',
      profilePicture: null,
      lastMessage: 'Hello, how are you?',
      lastMessageTime: '2024-01-01T12:00:00Z',
    },
    {
      id: 2,
      fullname: 'John Doe',
      profilePicture: null,
      lastMessage: 'Hello, how are you?',
      lastMessageTime: '2024-01-01T12:00:00Z',
    },
  ]);
  const [filteredParticipants, setFilteredParticipants] = useState(participants);
  const [selectedParticipant, setSelectedParticipant] = useState(participants.length > 0 ? participants[0] : null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      user_id: '1',
      fullname: 'Adam Potter',
      message: 'Hello, how are you?',
      time: '2024-01-01T12:00:00Z',
    },
    {
      id: 2,
      user_id: '677e258e0c10bf1113c7c650',
      fullname: 'John Doe',
      message: 'I am good, thank you.',
      time: '2024-01-01T12:00:00Z',
    },
    {
      id: 3,
      user_id: '1',
      fullname: 'Adam Potter',
      message: 'That\'s good to hear.',
      time: '2024-01-01T12:00:00Z',
    },
    {
      id: 4,
      user_id: '677e258e0c10bf1113c7c650',
      fullname: 'John Doe',
      message: 'How are you doing?',
      time: '2024-01-01T12:00:00Z',
    },
    {
      id: 5,
      user_id: '1',
      fullname: 'Adam Potter',
      message: 'I am doing great, thank you for asking.',
      time: '2024-01-01T12:00:00Z',
    },
    {
      id: 6,
      user_id: '677e258e0c10bf1113c7c650',
      fullname: 'John Doe',
      message: 'That\'s great to hear.',
      time: '2024-01-01T12:00:00Z',
    },
    {
      id: 7,
      user_id: '1',
      fullname: 'Adam Potter',
      message: 'How can I help you today?',
      time: '2024-01-01T12:00:00Z',
    },
    {
      id: 8,
      user_id: '677e258e0c10bf1113c7c650',
      fullname: 'John Doe',
      message: 'I need help with my homework.',
      time: '2024-01-01T12:00:00Z',
    },
    {
      id: 9,
      user_id: '1',
      fullname: 'Adam Potter',
      message: 'Sure, I can help you with that.',
      time: '2024-01-01T12:00:00Z',
    },
    {
      id: 10,
      user_id: '677e258e0c10bf1113c7c650',
      fullname: 'John Doe',
      message: 'Thank you so much.',
      time: '2024-01-01T12:00:00Z',
    },
  ]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (participantContainerRef.current && headerContainerRef.current && messagesContainerRef.current) {
      const headerHeight = headerContainerRef.current.offsetHeight;
      participantContainerRef.current.style.height = `calc(100vh - ${headerHeight}px - 4rem)`;
      messagesContainerRef.current.style.height = `calc(100vh - ${headerHeight}px - 4rem)`;
    }
  }, [headerContainerRef, participantContainerRef, messagesContainerRef]);

  useEffect(() => {
    if (messagesHeaderRef.current && messagesContentRef.current && messageInputContainerRef.current) {
      const messagesHeaderHeight = messagesHeaderRef.current.offsetHeight;
      const messagesInputContainerHeight = messageInputContainerRef.current.offsetHeight;
      messagesContentRef.current.style.height = `calc(100vh - ${messagesHeaderHeight}px - ${messagesInputContainerHeight}px)`;
    }
  }, [messagesHeaderRef, messagesContentRef, messageInputContainerRef]);

  useEffect(() => {
    setFilteredParticipants(participants.filter((participant) => participant.fullname.toLowerCase().includes(search.toLowerCase())));
  }, [search]);

  useEffect(() => {
    if (messagesContentRef.current) {
      messagesContentRef.current.scrollTop = messagesContentRef.current.scrollHeight;
    }
  }, [messagesContentRef, messages, message]);

  const HandleChangeParticipant = (participant) => {
    setSelectedParticipant(participant);
    setMessage('');
  }

  const HandleSendMessage = () => {
    if (message.length > 0) {
      const payload = {
        id: messages.length + 1,
        user_id: currentUser._id,
        fullname: currentUser.fullname,
        message: message,
        time: new Date().toISOString(),
      }

      setMessages([...messages, payload]);
      setMessage('');
    }
  }

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar activeItem="messages" reference={headerContainerRef} />
      <ContentContainer>
        <ParticipantsContainer ref={participantContainerRef}>
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
              <ParticipantsList>
                {filteredParticipants.map((participant, index) => {
                  return (
                    <ParticipantItem
                      key={participant.id}
                      selected={selectedParticipant?.id === participant.id} isLast={index === participants.length - 1}
                      onClick={() => HandleChangeParticipant(participant)}>
                      {
                        participant.profilePicture
                          ? <ProfilePicture src={participant.profilePicture} alt={participant.fullname} />
                          : <ParticipantProfilePicture selected={selectedParticipant?.id === participant.id}>
                            <ParticipantInitials selected={selectedParticipant?.id === participant.id}>{
                              (() => {
                                const words = participant.fullname.split(' ');
                                return words.length > 1 ? words[0][0] + words[1][0] : participant.fullname.slice(0, 2)
                              })()
                            }</ParticipantInitials>
                          </ParticipantProfilePicture>
                      }
                      <ParticipantDetails>
                        <ParticipantName selected={selectedParticipant?.id === participant.id}>
                          {participant.fullname}
                        </ParticipantName>
                        <ParticipantLastMessage selected={selectedParticipant?.id === participant.id}>
                          {participant.lastMessage}
                        </ParticipantLastMessage>
                      </ParticipantDetails>
                      <ParticipantLastMessageTime selected={selectedParticipant?.id === participant.id}>
                        {moment(participant.lastMessageTime).format('h:mm A')}
                      </ParticipantLastMessageTime>
                    </ParticipantItem>
                  )
                })}
              </ParticipantsList>
            ) : (
              <NoParticipantsFound>
                {translations.MESSAGES.NO_PARTICIPANTS_FOUND}
              </NoParticipantsFound>
            )
          }
        </ParticipantsContainer>

        <MessagesContainer ref={messagesContainerRef}>
          <MessagesHeader ref={messagesHeaderRef}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {
                selectedParticipant.profilePicture
                  ? <ProfilePicture src={selectedParticipant?.profilePicture} alt={selectedParticipant?.fullname} />
                  : <ProfilePictureInitials>
                    <span>{
                      (() => {
                        const words = selectedParticipant?.fullname.split(' ');
                        return words.length > 1 ? words[0][0] + words[1][0] : selectedParticipant?.fullname.slice(0, 2)
                      })()
                    }</span>
                  </ProfilePictureInitials>
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
          </MessagesHeader>

          <MessageContentContainer ref={messagesContentRef}>
            {messages.map((m) => {
              if (!m) return null;
              const isMessageFromCurrentUser = m?.user_id === currentUser._id;

              if (isMessageFromCurrentUser) {
                return (
                  <MessageSenderContainer key={m.id}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <MessageBubble isSender>{m?.message}</MessageBubble>
                      <MessageTime isSender>{moment(m?.time).format('h:mm A')}</MessageTime>
                    </div>
                    <div>
                      {
                        currentUser.profilePicture
                          ? <ProfilePictureSmall src={currentUser?.profilePicture} alt={currentUser?.fullname} />
                          : <ProfilePictureInitialsSmall>
                            <span>{
                              (() => {
                                const words = currentUser?.fullname.split(' ');
                                return words.length > 1 ? words[0][0] + words[1][0] : currentUser?.fullname.slice(0, 2)
                              })()
                            }</span>
                          </ProfilePictureInitialsSmall>
                      }
                    </div>
                  </MessageSenderContainer>
                )
              }

              return (
                <MessageReceiverContainer key={m.id}>
                  <div>
                    {
                      selectedParticipant.profilePicture
                        ? <ProfilePictureSmall src={selectedParticipant?.profilePicture} alt={selectedParticipant?.fullname} />
                        : <ProfilePictureInitialsSmall>
                          <span>{
                            (() => {
                              const words = selectedParticipant?.fullname.split(' ');
                              return words.length > 1 ? words[0][0] + words[1][0] : selectedParticipant?.fullname.slice(0, 2)
                            })()
                          }</span>
                        </ProfilePictureInitialsSmall>
                    }
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <MessageBubble>{m.message}</MessageBubble>
                    <MessageTime>{moment(m.time).format('h:mm A')}</MessageTime>
                  </div>
                </MessageReceiverContainer>
              )
            })}
          </MessageContentContainer>

          <MessageInputContainer ref={messageInputContainerRef}>
            <MessageInputBoxWrapper>
              <MessageInputBox
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
              </MessageInputBox>
              {
                message.trim().length === 0
                && <MessageBoxPlaceholder>{translations.MESSAGES.TYPE_MESSAGE}</MessageBoxPlaceholder>
              }
            </MessageInputBoxWrapper>

            <SendMessageButton onClick={HandleSendMessage} title={translations.MESSAGES.SEND_MESSAGE}>
              <img src={ICON_ASSETS.SEND_MESSAGE_ICON} alt="Send Message" />
            </SendMessageButton>
          </MessageInputContainer>
        </MessagesContainer>
      </ContentContainer>
    </MainContainer>
  )
}

export default MessagesPage;