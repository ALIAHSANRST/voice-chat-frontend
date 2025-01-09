'use strict';

import { COMMON_CONTEXT } from "@/src/context";
import styled from "styled-components";

const COLORS = {
  HeadingText: '#1A1A1A',
}

const HeadingText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.HeadingText};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const PladerHolderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  height: 50vh;
  font-size: 1.25rem;
  backgroundColor: white;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Calendar = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();

  return (
    <div>
      <HeadingText>
        {translations.CALENDAR.WEEKLY_SCHEDULE}
      </HeadingText>
      <PladerHolderContainer>
        Here, We Will Display the Calendar!
      </PladerHolderContainer>
    </div>
  )
}

export default Calendar;