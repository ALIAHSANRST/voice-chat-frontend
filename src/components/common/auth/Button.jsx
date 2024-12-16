import { COMMON_COLORS } from "@/src/utils/colors";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${COMMON_COLORS.AUTH.primary_blue};
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;
  color: ${COMMON_COLORS.AUTH.neutral_white};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${COMMON_COLORS.AUTH.primary_blue_hover};
  }
`;

const Button = ({
  type,
  disabled,
  text,
  onClick,
  ...props
}) => {
  return <StyledButton type={type} disabled={disabled} onClick={onClick} {...props}>{text}</StyledButton>;
};

export default Button;