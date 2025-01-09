'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styled from "styled-components"

import { COMMON_ASSETS } from "@/src/utils/assets"
import { USER_COLORS } from "@/src/utils/colors"
import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components"
import { COMMON_CONTEXT } from "@/src/context"
import { ROUTES } from "@/src/utils/routes"

const NavBar = styled.nav`
  width: 100%;
  background-color: ${USER_COLORS.NavBar.Background};
  padding: 0rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1rem;
    flex-direction: column;
  }
`

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props['data-active'] ? USER_COLORS.NavBar.ActiveText : USER_COLORS.NavBar.Text};
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    color: ${USER_COLORS.NavBar.ActiveText};
  }

  &:after {
    content: '';
    display: block;
    width: ${props => props['data-active'] ? '100%' : '0%'};
    height: 2px;
    background-color: ${USER_COLORS.NavBar.ActiveText};
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all 0.3s ease;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

const HeaderNavBar = ({ activeItem = 'home', reference }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  const router = useRouter();
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  const [showLogoutDialogue, setShowLogoutDialogue] = useState(false);

  return (
    <NavBar ref={reference}>
      <img src={COMMON_ASSETS.WIDE_LOGO} alt="Globalie Logo" style={{ height: '2rem' }} />

      <WrapperContainer>
        <ItemContainer data-active={activeItem === 'home'}>
          <Link href={
            (() => {
              if (currentUser?.account_type === 'user') return ROUTES.USER_HOME.path;
              if (currentUser?.account_type === 'teacher') return ROUTES.TEACHER_HOME.path;
            })()
          }>{translations.USER_HOME.TITLE}</Link>
        </ItemContainer>

        {
          currentUser?.account_type === 'user' && (
            <>
              <ItemContainer data-active={activeItem === 'messages'}>
                <Link href={ROUTES.USER_MESSAGES.path}>{translations.MESSAGES.TITLE}</Link>
              </ItemContainer>
              <ItemContainer data-active={activeItem === 'my_lesson'}>
                <Link href={ROUTES.USER_MY_LESSON.path}>{translations.MY_LESSON.TITLE}</Link>
              </ItemContainer>
              <ItemContainer data-active={activeItem === 'history'}>
                <Link href={ROUTES.USER_EXAM_HISTORY.path}>{translations.HISTORY.TITLE}</Link>
              </ItemContainer>
            </>
          )
        }

        {
          currentUser?.account_type === 'teacher' && (
            <>
              <ItemContainer data-active={activeItem === 'messages'}>
                <Link href={ROUTES.TEACHER_MESSAGES.path}>{translations.MESSAGES.TITLE}</Link>
              </ItemContainer>
              <ItemContainer data-active={activeItem === 'calendar'}>
                <Link href={ROUTES.TEACHER_CALENDAR.path}>{translations.CALENDAR.TITLE}</Link>
              </ItemContainer>
            </>
          )
        }
      </WrapperContainer>

      <WrapperContainer style={{ gap: '1.5rem' }}>
        <COMMON_COMPONENTS.LanguageSelect />
        <USER_COMPONENTS.OutlinedButton text={'Logout'} variant={'danger'} onClick={() => setShowLogoutDialogue(true)} />
      </WrapperContainer>

      {
        showLogoutDialogue &&
        <COMMON_COMPONENTS.AlertDialogue
          title='Warning'
          positiveMessage='Yes'
          negativeMessage='No'
          positiveCallback={() => {
            router.push(ROUTES.LOGOUT.path);
            setShowLogoutDialogue(false);
          }}
          negativeCallback={() => setShowLogoutDialogue(false)}
          show={showLogoutDialogue}
          handleClose={() => setShowLogoutDialogue(false)}>
          <p>Are you sure you want to logout?</p>
        </COMMON_COMPONENTS.AlertDialogue>
      }
    </NavBar>
  )
}

export default HeaderNavBar