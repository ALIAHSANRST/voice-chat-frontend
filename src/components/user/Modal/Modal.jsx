'use client'

import styled from 'styled-components';

import { HexToRGBA } from '@/src/utils/helpers';
import { USER_COLORS } from '@/src/utils/colors';
import { ICON_ASSETS } from '@/src/utils/assets';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${HexToRGBA(USER_COLORS.Modal.Backdrop, true, 0.5)};
  z-index: 1000;
`

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${USER_COLORS.Modal.Background};
  border-radius: 1.5rem;
  padding: 3rem;
  max-height: 80vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${props => props.modalContainerStyle}

  @media (max-width: 768px) {
    border-radius: 1rem;
    padding: 1.5rem;
    width: calc(100% - 3rem) !important;
    max-width: calc(100% - 3rem) !important;
  }
`

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`

const HeadingText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Montserrat';
  margin: 0;
  color: ${USER_COLORS.Modal.Text};

  @media (max-width: 768px) {
    font-size: 1.325rem;
  }
`

const SubHeadingText = styled.h2`
  font-size: 1.125rem;
  font-weight: 400;
  font-family: 'Montserrat';
  margin: 0;
  color: ${USER_COLORS.Modal.SecondaryText};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const Modal = ({
  children,
  onClose,
  title,
  subtitle,
  modalContainerStyle = { maxWidth: '47.5rem', width: '100%' },
}) => {
  return (
    <Backdrop>
      <ModalContainer style={{ ...modalContainerStyle }}>
        {
          onClose &&
          <IconButton onClick={onClose}>
            <img src={ICON_ASSETS.CLOSE_BUTTON_ICON} alt="close-button" />
          </IconButton>
        }
        <HeadingContainer>
          {
            title &&
            <HeadingText>{title}</HeadingText>
          }
          {
            subtitle &&
            <SubHeadingText>{subtitle}</SubHeadingText>
          }
        </HeadingContainer>
        {children}
      </ModalContainer>
    </Backdrop>
  );
}

export default Modal;