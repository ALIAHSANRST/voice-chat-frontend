'use client'

import styled from "styled-components";
import { COMMON_COLORS } from "@/src/utils/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

const Line = styled.span`
  width: 100%;
  border-top: 2px solid ${COMMON_COLORS.AUTH.neutral_7};
  height: 1px;
  width: 100%;

  @media (max-width: 768px) {
    border-top: 1px solid ${COMMON_COLORS.AUTH.neutral_7};
  }
`

const OrText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${COMMON_COLORS.AUTH.neutral_3};

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const OrSeperator = () => {
  return (
    <Container>
      <Line />
      <OrText>OR</OrText>
      <Line />
    </Container>
  )
}

export default OrSeperator;