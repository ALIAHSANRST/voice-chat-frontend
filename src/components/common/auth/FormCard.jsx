import Link from "next/link";
import { COMMON_ASSETS } from "@/src/utils/assets";
import { COMMON_COLORS } from "@/src/utils/colors";

const FormCard = ({
  title,
  description,
  children,
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      height: '100%',
      width: '100%',
      padding: '3rem',
      gap: '3rem',
    }}>
      <Link href={'/'}>
        <img src={COMMON_ASSETS.WIDE_LOGO} alt="logo" height={48} />
      </Link>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
        maxWidth: '24rem',
        alignSelf: 'center',
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
          }}>
            {title}
          </h1>
          <p style={{
            fontSize: '1rem',
            fontWeight: '400',
            margin: 0,
            color: COMMON_COLORS.AUTH.neutral_4,
          }}>
            {description}
          </p>
        </div>
        {children}
      </div>

      <div>
        &nbsp;
      </div>
    </div>
  )
}

export default FormCard;