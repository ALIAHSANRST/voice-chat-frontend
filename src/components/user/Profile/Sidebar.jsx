'use client'

import styled from "styled-components"

import { COMMON_CONTEXT } from "@/src/context"
import { ROLES } from "@/src/utils/constants"
import PersonalInformationIcon from "./icons/PersonalInformationIcon"
import ChangePasswordIcon from "./icons/ChangePasswordIcon"

const COLORS = {
  background: '#FFFFFF',
  backgroundActive: '#0064FF1A',
  backgroundHover: '#0066ff0c',
  backgroundInactive: '#FFFFFF',
  textActive: '#0064FF',
  iconActive: '#0064FF',
  textInactive: '#545D69',
  iconInactive: '#545D69',
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.75rem;
  background-color: ${COLORS.background};
  padding: 1rem 0;
  user-select: none;
`

const ItemWrapper = styled.div`
  padding: 0 1rem;
  position: relative;
`

const ItemIndicator = styled.div`
  display: ${({ active }) => active ? 'block' : 'none'};
  position: absolute;
  left: 0;
  width: 0.1875rem;
  height: 1.5rem;
  background-color: ${COLORS.iconActive};
  top: calc(50% - 0.75rem);
`

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background-color: ${({ active }) => active ? COLORS.backgroundActive : COLORS.backgroundInactive};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${COLORS.backgroundHover};
  }

  &:active {
    background-color: ${COLORS.backgroundHover};
  }
`

const IconContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ active }) => active ? COLORS.textActive : COLORS.textInactive};
  font-family: 'Montserrat';
`

const SideBar = ({
  activeItem = 0,
  setActiveItem = () => { }
}) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  return (
    <Container>
      {
        [
          {
            title: translations.PROFILE.SIDEBAR.PERSONAL_INFORMATION,
            icon: <PersonalInformationIcon color={activeItem === 0 ? COLORS.iconActive : COLORS.iconInactive} />
          },
          {
            title: translations.PROFILE.SIDEBAR.CHANGE_PASSWORD,
            icon: <ChangePasswordIcon color={activeItem === 1 ? COLORS.iconActive : COLORS.iconInactive} />
          },
          ...(
            currentUser?.account_type === ROLES.TEACHER ? [{
              title: translations.PROFILE.SIDEBAR.EXEPERIENCE,
              icon: <PersonalInformationIcon color={activeItem === 2 ? COLORS.iconActive : COLORS.iconInactive} />
            }] : []
          )
        ].map((item, index) => (
          <ItemWrapper
            key={`${index}-${item.title}`}
            active={activeItem === index}
            onClick={() => setActiveItem(index)}
            title={item.title}
          >
            <ItemIndicator active={activeItem === index} />
            <ItemContainer active={activeItem === index}>
              <IconContainer>{item.icon}</IconContainer>
              <Text active={activeItem === index}>{item.title}</Text>
            </ItemContainer>
          </ItemWrapper>
        ))
      }
    </Container>
  )
}

export default SideBar