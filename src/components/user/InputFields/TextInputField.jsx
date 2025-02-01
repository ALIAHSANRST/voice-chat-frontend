'use client';

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const COLORS = {
  neutral_black: '#1A1A1A',
  neutral_white: "#ffffff",
  neutral_7: '#DADEE3',
  error: "#ff0000",
  activeBorder: "#0070f3",
};

const StyledInputField = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.neutral_black};
  opacity: 0.8;
  
  &::placeholder {
    opacity: 0.5;
    font-weight: 500;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.neutral_black};
  opacity: 0.8;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  
  &::placeholder {
    opacity: 0.5;
    font-weight: 500;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  user-select: none;
  ${props => props.style}

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const Label = styled.label`
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.8;
  color: ${COLORS.neutral_black};

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const InputContainer = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${COLORS.neutral_7};
  background-color: ${COLORS.neutral_white};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${props => props.style}

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
  }

  &:focus-within {
    border-color: ${COLORS.activeBorder};
  }
`;

const TextAreaContainer = styled(InputContainer)`
  align-items: flex-start;
  padding: 0.875rem 1rem;
`;

const IconImage = styled.img`
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  padding: 0;
  font-size: 0.875rem;
  font-weight: 400;
  margin: 0;
  color: ${COLORS.error};
`;

const RequiredStar = styled.span`
  color: ${COLORS.error};
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.neutral_black};
  opacity: 0.8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: ${COLORS.neutral_white};
  border: 1px solid ${COLORS.neutral_7};
  border-radius: 0.5rem;
  max-height: 250px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '0' : '-10px'});
  transition: all 0.2s ease-in-out;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  color: ${COLORS.neutral_black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &.selected {
    background-color: rgba(0, 112, 243, 0.1);
  }

  &.highlighted {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ChevronIcon = styled.div`
  border: solid ${COLORS.neutral_black};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: ${props => props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
  transition: transform 0.2s ease-in-out;
`;

const BasicInputField = ({ type, name, placeholder, value, onChange, disabled, style, id, leftIcon, rightIcon, leftIconOnClick, rightIconOnClick }) => {
  return (
    <InputContainer>
      {leftIcon && (
        typeof leftIcon === 'string' ? (
          <IconImage src={leftIcon} alt="left-icon" onClick={leftIconOnClick} />
        ) : leftIcon
      )}
      <StyledInputField
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={style}
        id={id}
      />
      {rightIcon && (
        typeof rightIcon === 'string' ? (
          <IconImage src={rightIcon} alt="right-icon" onClick={rightIconOnClick} />
        ) : rightIcon
      )}
    </InputContainer>
  );
};

const TextAreaField = ({ name, placeholder, value, onChange, disabled, style, id }) => {
  return (
    <TextAreaContainer>
      <StyledTextArea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={style}
        id={id}
      />
    </TextAreaContainer>
  );
};

const DropdownField = ({ name, placeholder, value, onChange, disabled, values, leftIcon, rightIcon, leftIconOnClick, rightIconOnClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const getOptions = () => {
    const options = [...(values || [])];
    if (placeholder) {
      options.unshift({ value: '', label: placeholder });
    }
    return options;
  };

  const getCurrentSelectedIndex = () => {
    const options = getOptions();
    return options.findIndex(option => option.value === value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const options = getOptions();

      if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        setIsOpen(true);
        const currentIndex = getCurrentSelectedIndex();
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (highlightedIndex === -1) {
            const currentIndex = getCurrentSelectedIndex();
            setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
          } else {
            setHighlightedIndex(prev =>
              prev < options.length - 1 ? prev + 1 : prev
            );
          }
          scrollIntoView(highlightedIndex + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (highlightedIndex === -1) {
            const currentIndex = getCurrentSelectedIndex();
            setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
          } else {
            setHighlightedIndex(prev =>
              prev > 0 ? prev - 1 : 0
            );
          }
          scrollIntoView(highlightedIndex - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            const selectedOption = options[highlightedIndex];
            handleOptionClick(selectedOption);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, values, placeholder, value]);

  const scrollIntoView = (index) => {
    if (listRef.current && index >= 0) {
      const items = listRef.current.children;
      if (items[index]) {
        items[index].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  const handleDropdownClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleDropdownKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        if (e.key === 'ArrowDown') {
          setHighlightedIndex(0);
        }
      }
    }
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange({ target: { name, value: option.value } });
  };

  const getSelectedLabel = () => {
    if (!value) return placeholder;
    const selected = values?.find(option => option.value === value);
    return selected?.label || placeholder;
  };

  const renderDropdownList = () => {
    const options = getOptions();

    return (
      <DropdownList ref={listRef} isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleOptionClick(option)}
            className={`
              ${value === option.value ? 'selected' : ''}
              ${highlightedIndex === index ? 'highlighted' : ''}
            `}
            onMouseEnter={() => setHighlightedIndex(index)}
            title={option.label}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    );
  };

  const selectedLabel = getSelectedLabel();
  return (
    <InputContainer>
      {leftIcon && (
        typeof leftIcon === 'string' ? (
          <IconImage src={leftIcon} alt="left-icon" onClick={leftIconOnClick} />
        ) : leftIcon
      )}
      <DropdownContainer ref={dropdownRef}>
        <DropdownButton
          onClick={handleDropdownClick}
          onKeyDown={handleDropdownKeyDown}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span title={selectedLabel}>{selectedLabel}</span>
          <ChevronIcon isOpen={isOpen} />
        </DropdownButton>
        {renderDropdownList()}
      </DropdownContainer>
      {rightIcon && (
        typeof rightIcon === 'string' ? (
          <IconImage src={rightIcon} alt="right-icon" onClick={rightIconOnClick} />
        ) : rightIcon
      )}
    </InputContainer>
  );
};

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  leftIcon,
  leftIconOnClick,
  rightIcon,
  rightIconOnClick,
  error,
  disabled,
  name,
  values,
  inputContainerStyle,
  inputContainerId,
  inputStyle,
  inputId,
  inputWrapperStyle,
  inputWrapperId,
  showRequiredStar = true,
  onClick,
}) => {
  return (
    <InputWrapper style={inputWrapperStyle} id={inputWrapperId} onClick={onClick}>
      {label && (
        <Label>
          {label}
          {showRequiredStar && <RequiredStar> *</RequiredStar>}
        </Label>
      )}

      {type === 'textarea' ? (
        <TextAreaField
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={inputStyle}
          id={inputId}
        />
      ) : type === 'dropdown' ? (
        <DropdownField
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          values={values}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          leftIconOnClick={leftIconOnClick}
          rightIconOnClick={rightIconOnClick}
        />
      ) : (
        <BasicInputField
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={inputStyle}
          id={inputId}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          leftIconOnClick={leftIconOnClick}
          rightIconOnClick={rightIconOnClick}
        />
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default InputField;