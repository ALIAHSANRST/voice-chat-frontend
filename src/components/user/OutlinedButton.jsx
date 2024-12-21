import { USER_COLORS } from "@/src/utils/colors";
import { CapitalizeWords } from "@/src/utils/helpers";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${props => USER_COLORS.OutlinedButton[props.variant].Background};
  border: 1px solid ${props => USER_COLORS.OutlinedButton[props.variant].Border};
  border-radius: 0.375rem;
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  color: ${props => USER_COLORS.OutlinedButton[props.variant].Text};

  &:hover {
    background-color: ${props => USER_COLORS.OutlinedButton[props.variant].HoverBackground};
    border: 1px solid ${props => USER_COLORS.OutlinedButton[props.variant].HoverBorder};
    color: ${props => USER_COLORS.OutlinedButton[props.variant].HoverText};
  }
`

const OutlinedButton = ({
  text,
  variant = 'primary',
  ...props
}) => {
  return (
    <StyledButton variant={CapitalizeWords(variant)} {...props}>
      {text}
    </StyledButton>
  )
}

export default OutlinedButton