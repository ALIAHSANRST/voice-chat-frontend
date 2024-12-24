'use client'

import Link from "next/link";
import styled from "styled-components";

import { COMMON_COLORS } from "@/src/utils/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  span:first-child {
    font-size: 1rem;
    font-weight: 400;
    color: ${COMMON_COLORS.AUTH.neutral_3}; 

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }
  
  a:last-child {
    font-size: 1rem;
    font-weight: 600;
    color: ${COMMON_COLORS.AUTH.primary_blue};
    text-decoration: none;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }
`

const AlternativeFlow = ({
  link,
  linkText,
  text,
}) => {
  return (
    <Container>
      <span>{text}</span>
      <Link href={link}>{linkText}</Link>
    </Container>
  )
}

export default AlternativeFlow;