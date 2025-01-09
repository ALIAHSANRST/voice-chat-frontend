'use client';

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
  inputContainerStyle,
  inputContainerId,
  inputStyle,
  inputId,
  inputWrapperStyle,
  inputWrapperId,
  showRequiredStar = true
}) => {
  return (
    <InputWrapper style={inputWrapperStyle} id={inputWrapperId}>
      {
        label &&
        <Label>
          {label}
          {showRequiredStar && <RequiredStar> *</RequiredStar>}
        </Label>
      }
      <InputContainer id={inputContainerId} style={inputContainerStyle}>
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
          style={inputStyle}
          id={inputId}
        />
        {rightIcon && (
          typeof rightIcon === 'string' ? (
            <IconImage src={rightIcon} alt="right-icon" onClick={rightIconOnClick} />
          ) : rightIcon
        )}
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default InputField;