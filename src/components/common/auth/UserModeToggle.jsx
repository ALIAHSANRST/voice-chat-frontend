import styled from "styled-components";

import { COMMON_COLORS } from "@/src/utils/colors";
import { COMMON_CONTEXT } from "@/src/context";
import { ROLES } from "@/src/utils/constants";

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: ${COMMON_COLORS.AUTH.user_mode_toggle.inactive.background};
  border-radius: 0.5rem;
  padding: 0.5rem;
`

const StyledToggleButton = styled.button`
  background-color: ${props => props.isSelected ? 'transparent' : COMMON_COLORS.AUTH.user_mode_toggle.active.background};
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
  border-radius: 0.375rem;
  color: ${props => props.isSelected ? COMMON_COLORS.AUTH.user_mode_toggle.inactive.text : COMMON_COLORS.AUTH.user_mode_toggle.active.text};
`;

const UserModeToggle = ({
  mode,
  setMode,
}) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  return (
    <Container>
      <StyledToggleButton
        type={'button'}
        onClick={() => setMode(ROLES.STUDENT)}
        isSelected={mode === ROLES.TEACHER}
      >
        {translations.USER_MODE_TOGGLE.STUDENT}
      </StyledToggleButton>
      <StyledToggleButton
        type={'button'}
        onClick={() => setMode(ROLES.TEACHER)}
        isSelected={mode === ROLES.STUDENT}
      >
        {translations.USER_MODE_TOGGLE.TUTOR}
      </StyledToggleButton>
    </Container>
  )
}

export default UserModeToggle;