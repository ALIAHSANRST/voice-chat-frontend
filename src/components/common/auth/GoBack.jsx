import Link from "next/link"
import styled from "styled-components"

import { ICON_ASSETS } from "@/src/utils/assets"
import { COMMON_COLORS } from "@/src/utils/colors"
import { COMMON_CONTEXT } from "@/src/context"

const StyledBackText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COMMON_COLORS.AUTH.primary_blue};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const StyledBackIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(26%) sepia(97%) saturate(3840%) hue-rotate(216deg) brightness(101%) contrast(108%);
`

const StyledBackContainer = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    text-decoration: none;
  }
`

const GoBack = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation()

  return (
    <StyledBackContainer>
      <Link href={'/auth/sign-in'}>
        <StyledBackIcon src={ICON_ASSETS.ARROW_BACK_ICON} alt="arrow back icon" />
        <StyledBackText>{translations.GO_BACK.TEXT}</StyledBackText>
      </Link>
    </StyledBackContainer>
  )
}

export default GoBack