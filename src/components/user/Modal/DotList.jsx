'use client'

import styled from "styled-components";
import { USER_COLORS } from "@/src/utils/colors";

const DotsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.125rem;
    width: 100%;
  }
`

const DotContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

const DotInner = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${USER_COLORS.Modal.Dot.Fill};
`

const DotOuter = styled.div`
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
  border: 1px solid ${USER_COLORS.Modal.Dot.Outline};
  display: flex;
  justify-content: center;
  align-items: center;
`

const DotText = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Montserrat';
  margin: 0;
  color: ${USER_COLORS.Modal.Text};
  margin-bottom: 0.325rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    width: 100%;
  }
`

const DotSubText = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Montserrat';
  margin: 0;
  color: ${USER_COLORS.Modal.SecondaryText};

  @media (max-width: 768px) {
    font-size: 0.9rem;
    width: 100%;
  }
`

const DotList = ({ dots }) => {
  return (
    <>
      {
        dots.length > 0 &&
        <DotsWrapper>
          {
            dots.map((dot, index) => (
              <DotContainer key={`dot-${index}`}>
                <DotOuter>
                  <DotInner />
                </DotOuter>
                <div>
                  <DotText>{dot.title}</DotText>
                  <DotSubText>{dot.subtitle}</DotSubText>
                </div>
              </DotContainer>
            ))
          }
        </DotsWrapper>
      }
    </>
  )
}

export default DotList;