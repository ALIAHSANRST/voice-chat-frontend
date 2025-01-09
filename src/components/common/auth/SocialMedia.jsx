import { ICON_ASSETS } from "@/src/utils/assets";
import { COMMON_COLORS } from "@/src/utils/colors";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const SocialMediaButton = styled.span`
  background-color: ${COMMON_COLORS.AUTH.neutral_white};
  border: 1px solid ${COMMON_COLORS.AUTH.neutral_7};
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${COMMON_COLORS.AUTH.neutral_7}77;
  }

  @media (max-width: 768px) {
    padding: 0.7rem;
  }
`

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`

const SocialMedia = ({ userMode }) => {
  console.log(userMode);
  return (
    <SocialMediaContainer>
      {[
        { href: `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google_oauth`, icon: ICON_ASSETS.GOOGLE_ICON, alt: 'Google' },
        userMode === 'user'
          ? { href: `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/line_oauth`, icon: ICON_ASSETS.LINE_ICON, alt: 'Line' }
          : { href: `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/linkedin_oauth`, icon: ICON_ASSETS.LINKEDIN_ICON, alt: 'LinkedIn' },
      ].map((social, index) => (
        <Link key={index} href={social.href} style={{ width: '100%' }}>
          <SocialMediaButton>
            <Image src={social.icon} alt={social.alt} width={28} height={28} />
          </SocialMediaButton>
        </Link>
      ))}
    </SocialMediaContainer>
  )
}

export default SocialMedia;