import { COMMON_COLORS } from "@/src/utils/colors";

const OrSeperator = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.5rem',
    }}>
      <span style={{
        width: '100%',
        borderTop: `2px solid ${COMMON_COLORS.AUTH.neutral_7}`,
        height: '1px',
        width: '100%',
      }}></span>
      <span style={{
        fontSize: '1rem',
        fontWeight: '600',
        color: COMMON_COLORS.AUTH.neutral_3,
      }}>OR</span>
      <span style={{
        width: '100%',
        borderTop: `2px solid ${COMMON_COLORS.AUTH.neutral_7}`,
        height: '1px',
        width: '100%',
      }}></span>
    </div>
  )
}

export default OrSeperator;