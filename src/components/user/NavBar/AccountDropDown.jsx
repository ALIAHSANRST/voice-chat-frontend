'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import { COMMON_COLORS } from '@/src/utils/colors';
import { ROUTES } from '@/src/utils/routes';
import { COMMON_CONTEXT } from '@/src/context';
import { ICON_ASSETS } from '@/src/utils/assets';
import { COMMON_COMPONENTS } from '@/src/components';
import { ROLES } from '@/src/utils/constants';

const AccountDropDownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  width: fit-content;
  transition: all 0.2s ease;
  opacity: 1;
  font-family: 'Montserrat';
  max-width: 12.5rem;
  width: 100%;
`

const AccountButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  padding: 0.25rem 1.5rem 0.25rem 0.25rem;
  font-size: 0.875rem;
  color: ${COMMON_COLORS.AUTH.neutral_black};
  cursor: pointer;
  font-weight: 500;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  &:after {
    content: '';
    position: absolute;
    right: 0.25rem;
    top: 50%;
    width: 0.5rem;
    height: 0.5rem;
    border-right: 0.125rem solid ${COMMON_COLORS.AUTH.neutral_black};
    border-bottom: 0.125rem solid ${COMMON_COLORS.AUTH.neutral_black};
    transform: translateY(-70%) rotate(${props => props.isOpen ? '225deg' : '45deg'});
    transition: transform 0.2s ease;
    opacity: 0.6;
  }
`

const ProfileImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 8rem;
`

const AccountType = styled.span`
  font-size: 0.75rem;
  color: ${COMMON_COLORS.AUTH.neutral_black};
  opacity: 0.6;
  font-weight: 400;
  line-height: 0.75rem;
`

const DropdownList = styled.ul`
  position: absolute;
  ${props => props.openUpward ? 'bottom: 100%' : 'top: 100%'};
  right: 0;
  background: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.15);
  padding: 0.25rem 0;
  margin: 0.25rem 0;
  list-style: none;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  min-width: 10rem;
`

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${COMMON_COLORS.AUTH.neutral_black};

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`

const Divider = styled.div`
  width: calc(100% + 2rem);
  height: 1px;
  margin: 0 -1rem;
  background: rgba(0, 0, 0, 0.1);
`

const AccountDropDown = ({ withLanguage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();

  const [showLogoutDialogue, setShowLogoutDialogue] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const checkPosition = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const minSpaceNeeded = 150;

        setOpenUpward(spaceBelow < minSpaceNeeded && spaceAbove > spaceBelow);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', checkPosition);

    checkPosition();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, []);

  const handleNavigate = (route) => {
    setIsOpen(false);
    router.push(route);
  };

  return (
    <AccountDropDownWrapper ref={wrapperRef}>
      <AccountButton
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        title={translations.NAVBAR.PROFILE_DROPDOWN.PROFILE}
      >
        <ProfileImage
          src={currentUser?.profile_picture || ICON_ASSETS.PROFILE_IMAGE_PLACEHOLDER_ICON}
          alt="Profile"
          title={currentUser?.fullname || 'Profile Picture'}
        />
        <UserInfo>
          <UserName title={currentUser?.fullname}>
            {currentUser?.fullname}
          </UserName>
          <AccountType>
            {
              currentUser?.account_type === ROLES.STUDENT
                ? translations.NAVBAR.PROFILE_DROPDOWN.STUDENT
                : translations.NAVBAR.PROFILE_DROPDOWN.TEACHER
            }
          </AccountType>
        </UserInfo>
      </AccountButton>

      <DropdownList isOpen={isOpen} openUpward={openUpward}>
        <DropdownItem
          onClick={() => handleNavigate(
            currentUser?.account_type === 'student'
              ? ROUTES.USER_PROFILE.path
              : ROUTES.TEACHER_PROFILE.path
          )}
          title={translations.NAVBAR.PROFILE_DROPDOWN.PROFILE}
        >
          {translations.NAVBAR.PROFILE_DROPDOWN.PROFILE}
        </DropdownItem>
        <DropdownItem
          onClick={() => setShowLogoutDialogue(true)}
          title={translations.NAVBAR.PROFILE_DROPDOWN.LOGOUT.TITLE}
        >
          {translations.NAVBAR.PROFILE_DROPDOWN.LOGOUT.TITLE}
        </DropdownItem>
        {
          withLanguage &&
          <DropdownItem style={{ paddingBottom: 0 }}>
            <Divider />
            <COMMON_COMPONENTS.LanguageSelect />
          </DropdownItem>
        }
      </DropdownList>

      {
        showLogoutDialogue &&
        <COMMON_COMPONENTS.AlertDialogue
          title='Warning'
          positiveMessage='Yes'
          negativeMessage='No'
          positiveCallback={() => {
            handleNavigate(ROUTES.LOGOUT.path);
            setShowLogoutDialogue(false);
          }}
          negativeCallback={() => setShowLogoutDialogue(false)}
          show={showLogoutDialogue}
          handleClose={() => setShowLogoutDialogue(false)}>
          <p>
            {translations.NAVBAR.PROFILE_DROPDOWN.LOGOUT.DESCRIPTION}
          </p>
        </COMMON_COMPONENTS.AlertDialogue>
      }
    </AccountDropDownWrapper>
  );
}

export default AccountDropDown;