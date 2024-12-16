'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styled from "styled-components"

import { COMMON_ASSETS } from "@/src/utils/assets"
import { USER_COLORS } from "@/src/utils/colors"
import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components"

const NavBar = styled.nav`
  width: 100%;
  background-color: ${USER_COLORS.NavBar.Background};
  padding: 0rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
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

const HeaderNavBar = () => {
  const [showLogoutDialogue, setShowLogoutDialogue] = useState(false);
  const router = useRouter();

  return (
    <NavBar>
      <img src={COMMON_ASSETS.WIDE_LOGO} alt="Globalie Logo" style={{ height: '2rem' }} />

      <WrapperContainer>
        <ItemContainer data-active={true}>
          <Link href={'/user'}>Home</Link>
        </ItemContainer>
        <ItemContainer>
          <Link href={'#'}>My Lesson</Link>
        </ItemContainer>
        <ItemContainer>
          <Link href={'#'}>History</Link>
        </ItemContainer>
      </WrapperContainer>

      <WrapperContainer style={{ gap: '1rem' }}>
        <USER_COMPONENTS.OutlinedButton text={'Request a tutor'} variant={'primary'} />
        <USER_COMPONENTS.OutlinedButton text={'Logout'} variant={'danger'} onClick={() => setShowLogoutDialogue(true)} />
      </WrapperContainer>

      {
        showLogoutDialogue &&
        <COMMON_COMPONENTS.AlertDialogue
          title='Warning'
          positiveMessage='Yes'
          negativeMessage='No'
          positiveCallback={() => {
            router.push('/auth/logout');
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