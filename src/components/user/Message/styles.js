'use client'

import styled from "styled-components";

import { USER_COLORS } from "@/src/utils/colors";
import { COMMON_COMPONENTS } from "@/src/components";

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
  user-select: none;
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

const ParticipantRightContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ParticipantLastMessageTime = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${props => props.selected
    ? USER_COLORS.MESSAGES.ParticipantList.Item.SecondaryText.Selected
    : USER_COLORS.MESSAGES.ParticipantList.Item.SecondaryText.Unselected};
`

const ParticipantUnreadMessagesContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${USER_COLORS.MESSAGES.ParticipantList.UnreadMessages.Background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.25rem;

  span {
    font-family: 'Montserrat';
    font-size: 0.75rem;
    font-weight: 500;
    color: ${USER_COLORS.MESSAGES.ParticipantList.UnreadMessages.Text};
    line-height" normal;
  }
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

const LoadingOlderMessagesContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  span {
    font-size: 0.875rem;
    font-weight: 400;
    color: ${USER_COLORS.MESSAGES.MessageContainer.LoadingOldMessages.Text};
    background-color: ${USER_COLORS.MESSAGES.MessageContainer.LoadingOldMessages.Background};
    padding: 0.375rem 1.25rem;
    border-radius: 10rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    user-select: none;
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

const MessageMetaContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;

  svg {
    font-size: 0.75rem;
    color: ${USER_COLORS.MESSAGES.MessageContainer.ReadIcon};
    opacity: 0.88;
  }
`

const MessageTime = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${USER_COLORS.MESSAGES.MessageContainer.Header.SecondaryText};
  text-align: ${props => props.isSender ? 'right' : 'left'};
`

const ProfilePicture = styled(COMMON_COMPONENTS.ImageLoader)`
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
  user-select: none;

  span {
    font-size: 1rem;
    font-weight: 600;
    color: ${USER_COLORS.MESSAGES.MessageContainer.Background};
  }
`

const ProfilePictureInitialsSmall = styled(ProfilePictureInitials)`
  width: 2rem;
  height: 2rem;
  user-select: none;

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

export default {
  MainContainer,
  ContentContainer,
  ParticipantsContainer,
  ParticipantsList,
  ParticipantItem,
  ParticipantProfilePicture,
  ParticipantInitials,
  ParticipantDetails,
  ParticipantName,
  ParticipantLastMessage,
  ParticipantLastMessageTime,
  NoParticipantsFound,
  MessagesContainer,
  MessagesHeader,
  MessageContentContainer,
  MessageInputContainer,
  MessageInputBoxWrapper,
  MessageInputBox,
  MessageBoxPlaceholder,
  MessageSenderContainer,
  MessageReceiverContainer,
  MessageBubble,
  MessageTime,
  ProfilePicture,
  ProfilePictureSmall,
  ProfilePictureInitials,
  ProfilePictureInitialsSmall,
  SendMessageButton,
  ParticipantRightContainer,
  ParticipantUnreadMessagesContainer,
  MessageMetaContainer,
  LoadingOlderMessagesContainer
}