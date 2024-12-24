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
  inputStyle,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    }}>
      {
        label &&
        <label style={{
          padding: '0 1rem',
          fontSize: '1rem',
          fontWeight: '600',
          opacity: 0.8,
          color: COMMON_COLORS.AUTH.neutral_black,
        }}>{label}</label>
      }
      <div style={{
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        border: `1px solid ${COMMON_COLORS.AUTH.neutral_7}`,
        backgroundColor: COMMON_COLORS.AUTH.neutral_white,
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        ...inputContainerStyle
      }}>
        {leftIcon && (
          typeof leftIcon === 'string' ? (
            <img src={leftIcon} alt="left-icon" onClick={leftIconOnClick} style={{ cursor: 'pointer' }} />
          ) : leftIcon
        )}
        <StyledInputField
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={{ ...inputStyle }}
        />
        {rightIcon && (
          typeof rightIcon === 'string' ? (
            <img src={rightIcon} alt="right-icon" onClick={rightIconOnClick} style={{ cursor: 'pointer' }} />
          ) : rightIcon
        )}
      </div>
      {error && <p style={{
        padding: '0 1rem',
        fontSize: '0.875rem',
        fontWeight: '400',
        margin: 0,
        color: COMMON_COLORS.AUTH.error,
      }}>{error}</p>}
    </div>
  );
};

export default InputField;