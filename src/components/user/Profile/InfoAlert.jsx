'use client';

import styled from "styled-components";
import InfoIcon from "./icons/InfoIcon";

const COLORS = {
  background: '#FFF4EC',
  border: '#B95000',
  text: '#B95000'
}

const Container = styled.div`
  display: flex;
  gap: 0.675rem;
  font-family: 'Montserrat';
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid ${COLORS.border};
  background-color: ${COLORS.background};

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0.625rem 1rem;
  }
`

const Text = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.text};

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const InfoAlert = ({ text }) => {
  return (
    <Container>
      <InfoIcon />
      <Text>{text}</Text>
    </Container>
  )
}

export default InfoAlert;