'use strict';

import { COMMON_CONTEXT } from "@/src/context";
import styled from "styled-components";
import { USER_COMPONENTS } from "../..";
import Link from "next/link";
import { ROUTES } from "@/src/utils/routes";

const COLORS = {
  HeadingText: '#1A1A1A',
}

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const HeadingText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.HeadingText};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`

const Calendar = ({ showManageSlots = true }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();

  return (
    <div>
      <HeadingContainer>
        <HeadingText>
          {translations.CALENDAR.WEEKLY_SCHEDULE}
        </HeadingText>
        {
          showManageSlots &&
          <Link href={ROUTES.TEACHER_MANAGE_SLOTS.path}>
            <USER_COMPONENTS.OutlinedButton
              text={translations.CALENDAR.MANAGE_SLOTS}
              style={{ background: 'transparent' }} />
          </Link>
        }
      </HeadingContainer>
    </div>
  )
}

export default Calendar;