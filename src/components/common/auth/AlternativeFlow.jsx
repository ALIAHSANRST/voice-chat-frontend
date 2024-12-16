import { COMMON_COLORS } from "@/src/utils/colors";
import Link from "next/link";

const AlternativeFlow = ({
  link,
  linkText,
  text,
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.5rem',
    }}>
      <span style={{
        fontSize: '0.875rem',
        fontWeight: '400',
        color: COMMON_COLORS.AUTH.neutral_3,
      }}>{text}</span>
      <Link href={link} style={{
        fontSize: '1rem',
        fontWeight: '600',
        color: COMMON_COLORS.AUTH.primary_blue,
        textDecoration: 'none',
      }}>{linkText}</Link>
    </div>
  )
}

export default AlternativeFlow;