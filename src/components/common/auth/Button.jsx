import { COMMON_COLORS } from "@/src/utils/colors";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${COMMON_COLORS.AUTH.primary_blue};
  padding: 0.9rem 1.5rem;
  border-radius: 0.5rem;
  color: ${COMMON_COLORS.AUTH.neutral_white};
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${COMMON_COLORS.AUTH.primary_blue_hover};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
  }
`;

const Button = ({
  type,
  disabled,
  text,
  onClick,
  children,
  ...props
}) => {
  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick} {...props}>
      {text && text}
      {children && children}
    </StyledButton>
  );
};

export default Button;