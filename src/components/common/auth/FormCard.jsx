'use client'

import Link from "next/link";
import styled from "styled-components";

import { COMMON_ASSETS } from "@/src/utils/assets";
import { COMMON_COLORS } from "@/src/utils/colors";
import { ROUTES } from "@/src/utils/routes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  padding: 3rem;
  gap: 3rem;
  ${props => props.style}
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 24rem;
  align-self: center;
  ${props => props.style}
`

const HeaderWrapper = styled.div`
  margin-bottom: 2rem;
  ${props => props.style}
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  ${props => props.style}
`

const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  color: ${COMMON_COLORS.AUTH.neutral_4};
  ${props => props.style}
`

const Spacer = styled.div`
  &nbsp;
`

const FormCard = ({
  title,
  description,
  children,
  header,
  showLogo = true,
  containerStyle = {},
  contentWrapperStyle = {},
  headerWrapperStyle = {},
  titleStyle = {},
  descriptionStyle = {},
}) => {
  return (
    <Container style={containerStyle}>
      {
        showLogo &&
        <Link href={ROUTES.HOME.path}>
          <img src={COMMON_ASSETS.WIDE_LOGO} alt="logo" height={48} />
        </Link>
      }

      <ContentWrapper style={contentWrapperStyle}>
        <div>
          {header && <HeaderWrapper style={headerWrapperStyle}>{header}</HeaderWrapper>}
          <Title style={titleStyle}>{title}</Title>
          <Description style={descriptionStyle}>{description}</Description>
        </div>
        {children}
      </ContentWrapper>

      <Spacer />
    </Container>
  )
}

export default FormCard;