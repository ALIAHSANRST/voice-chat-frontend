'use client'

import Link from "next/link"
import styled from "styled-components"
import { useState } from "react"

import { COMMON_ASSETS } from "@/src/utils/assets"
import { USER_COLORS } from "@/src/utils/colors"
import { COMMON_COMPONENTS } from "@/src/components"
import { COMMON_CONTEXT } from "@/src/context"
import { ROUTES } from "@/src/utils/routes"
import AccountDropDown from "./AccountDropDown"

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
    padding: 0;
    flex-wrap: wrap;
    gap: 0;
    border-bottom: ${props => props.isMobileMenuOpen ? `1px solid rgba(0, 0, 0, 0.1)` : 'none'};
    transition: border-bottom 0.2s ease;
  }
`

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
  }

  @media (min-width: 769px) {
    width: auto;
  }
`

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isMobileMenu ? 'flex' : 'none'};
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 0;
    max-height: ${props => props.isMobileMenu ? '100vh' : '0'};
    transition: max-height 0.3s ease;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: ${USER_COLORS.NavBar.Text};
  transition: transform 0.3s ease;
  transform: rotate(${props => props.isOpen ? '180deg' : '0deg'});

  @media (max-width: 768px) {
    display: block;
  }
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
    padding: 0.75rem 1.25rem;
    width: 100%;
    justify-content: flex-start;

    ${props => props['data-active'] && `border-top: 1px solid rgba(0, 0, 0, 0.05);`}
  }

  &:hover {
    color: ${USER_COLORS.NavBar.ActiveText};
    background: ${props => props.isMobile ? 'rgba(0, 0, 0, 0.02)' : 'transparent'};
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

    @media (max-width: 768px) {
      display: none;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
  }
`

const UtilityContainer = styled(WrapperContainer)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 1.25rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    gap: 1rem;
  }
`

const HeaderNavBar = ({ activeItem = 'home', reference }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <NavBar ref={reference} isMobileMenuOpen={isMobileMenuOpen}>
      <LogoContainer>
        <img src={COMMON_ASSETS.WIDE_LOGO} alt="Globalie Logo" style={{ height: '2rem' }} />
        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isOpen={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </LogoContainer>

      <WrapperContainer isMobileMenu={isMobileMenuOpen}>
        <ItemContainer data-active={activeItem === 'home'} isMobile>
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
              <ItemContainer data-active={activeItem === 'messages'} isMobile>
                <Link href={ROUTES.USER_MESSAGES.path}>{translations.MESSAGES.TITLE}</Link>
              </ItemContainer>
              <ItemContainer data-active={activeItem === 'my_lesson'} isMobile>
                <Link href={ROUTES.USER_MY_LESSON.path}>{translations.MY_LESSON.TITLE}</Link>
              </ItemContainer>
              <ItemContainer data-active={activeItem === 'history'} isMobile>
                <Link href={ROUTES.USER_EXAM_HISTORY.path}>{translations.HISTORY.TITLE}</Link>
              </ItemContainer>
            </>
          )
        }

        {
          currentUser?.account_type === 'teacher' && (
            <>
              <ItemContainer data-active={activeItem === 'messages'} isMobile>
                <Link href={ROUTES.TEACHER_MESSAGES.path}>{translations.MESSAGES.TITLE}</Link>
              </ItemContainer>
              <ItemContainer data-active={activeItem === 'calendar'} isMobile>
                <Link href={ROUTES.TEACHER_CALENDAR.path}>{translations.CALENDAR.TITLE}</Link>
              </ItemContainer>
            </>
          )
        }

        <UtilityContainer isMobileMenu={isMobileMenuOpen}>
          <COMMON_COMPONENTS.LanguageSelect />
          <AccountDropDown />
        </UtilityContainer>
      </WrapperContainer>

      <WrapperContainer style={{ gap: '1.5rem' }} className="desktop-only">
        <COMMON_COMPONENTS.LanguageSelect />
        <AccountDropDown />
      </WrapperContainer>
    </NavBar>
  )
}

export default HeaderNavBar