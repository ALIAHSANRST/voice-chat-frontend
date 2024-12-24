import { COMMON_COLORS } from "@/src/utils/colors";
import styled from "styled-components";

const StyledInputField = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: ${COMMON_COLORS.AUTH.neutral_black};
  opacity: 0.8;
  &::placeholder {
    opacity: 0.5;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${props => props.style}

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const Label = styled.label`
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.8;
  color: ${COMMON_COLORS.AUTH.neutral_black};

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const InputContainer = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${COMMON_COLORS.AUTH.neutral_7};
  background-color: ${COMMON_COLORS.AUTH.neutral_white};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  ${props => props.style}

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
  }
`;

const IconImage = styled.img`
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  margin: 0;
  color: ${COMMON_COLORS.AUTH.error};
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
}) => {
  return (
    <InputWrapper style={inputWrapperStyle} id={inputWrapperId}>
      {label && <Label>{label}</Label>}
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