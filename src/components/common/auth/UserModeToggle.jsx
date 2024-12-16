import styled from "styled-components";
import { COMMON_COLORS } from "@/src/utils/colors";

const StyledToggleButton = styled.button`
  background-color: ${COMMON_COLORS.AUTH.neutral_white};
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
  border-radius: 0.375rem;
  box-shadow: 0px 3px 8px 0px #0000001F;
  color: ${COMMON_COLORS.AUTH.neutral_black}CC;
`;

const UserModeToggle = ({
  mode,
  setMode,
}) => {
  return (
    <div style={{
      backgroundColor: COMMON_COLORS.AUTH.neutral_8,
      borderRadius: '0.5rem',
      padding: '0.2rem',
      display: 'flex',
      gap: '0.2rem',
    }}>
      <StyledToggleButton
        type={'button'}
        onClick={() => setMode(false)}
        style={{
          backgroundColor: mode ? COMMON_COLORS.AUTH.neutral_8 : COMMON_COLORS.AUTH.neutral_10,
          boxShadow: mode ? 'none' : '0px 3px 8px 0px #0000001F',
        }}>
        User
      </StyledToggleButton>
      <StyledToggleButton
        type={'button'}
        onClick={() => setMode(true)}
        style={{
          backgroundColor: mode ? COMMON_COLORS.AUTH.neutral_10 : COMMON_COLORS.AUTH.neutral_8,
          boxShadow: mode ? '0px 3px 8px 0px #0000001F' : 'none',
        }}>
        Admin
      </StyledToggleButton>
    </div>
  )
}

export default UserModeToggle;