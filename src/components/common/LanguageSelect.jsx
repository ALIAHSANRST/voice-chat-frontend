'use client'

import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { COMMON_CONTEXT } from '@/src/context'
import { COMMON_COLORS } from '@/src/utils/colors'

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 0;
  width: fit-content;
  transition: all 0.2s ease;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  &:before {
    content: '🌐';
    margin-right: 6px;
    font-size: 16px;
  }
`

const SelectButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  padding: 4px 24px 4px 4px;
  font-size: 14px;
  color: ${COMMON_COLORS.AUTH.neutral_black};
  cursor: pointer;
  font-weight: 500;
  position: relative;
  display: flex;
  align-items: center;

  &:after {
    content: '';
    position: absolute;
    right: 4px;
    top: 50%;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${COMMON_COLORS.AUTH.neutral_black};
    border-bottom: 2px solid ${COMMON_COLORS.AUTH.neutral_black};
    transform: translateY(-70%) rotate(${props => props.isOpen ? '225deg' : '45deg'});
    transition: transform 0.2s ease;
    opacity: 0.6;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.02);
    border-radius: 4px;
  }
`

const DropdownList = styled.ul`
  position: absolute;
  ${props => props.openUpward ? 'bottom: 100%' : 'top: 100%'};
  left: 0;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  margin: 4px 0;
  list-style: none;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
`

const DropdownItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  color: ${COMMON_COLORS.AUTH.neutral_black};

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`

const LanguageSelect = () => {
  const { LANGUAGES, currentLanguage, updateLanguage } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const wrapperRef = useRef(null);

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

  const handleSelect = (language) => {
    updateLanguage(language);
    setIsOpen(false);
  };

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectButton type="button" onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        {currentLanguage.toUpperCase()}
      </SelectButton>

      <DropdownList isOpen={isOpen} openUpward={openUpward}>
        {Object.keys(LANGUAGES).map((language) => (
          <DropdownItem key={language} onClick={() => handleSelect(language)}>
            {language}
          </DropdownItem>
        ))}
      </DropdownList>
    </SelectWrapper>
  )
}

export default LanguageSelect