'use strict';

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import Link from "next/link";
import moment from 'moment';

import { COMMON_COMPONENTS, USER_COMPONENTS } from "@/src/components";
import { COMMON_CONTEXT } from "@/src/context";
import { USER_COLORS } from '@/src/utils/colors';
import { CLASS_STATUSES, SLOT_DURATION_IN_MINUTES } from '@/src/utils/constants';
import { ROUTES } from "@/src/utils/routes";
import { FetchAllUpcomingClasses } from "./axios";

const COLORS = {
  HeadingText: '#1A1A1A',
  BorderColor: '#E5E7EB',
  BackgroundLight: '#F9FAFB',
  TextPrimary: '#111827',
  TextSecondary: '#6B7280',
  CalendarAccent: '#3B82F6',
  HoverBackground: '#F3F4F6',
  Shadow: 'rgba(0, 0, 0, 0.1)',
  HoverCardBg: 'rgba(255, 255, 255, 0.98)',
  HoverCardBorder: '#E2E8F0',
  HoverCardShadow: 'rgba(0, 0, 0, 0.1)',
  SlotBorder: '#E2E8F0',
  SlotHover: '#F8FAFC',
  TimeText: '#64748B',
  AccentLight: '#EFF6FF',
  TodayButton: USER_COLORS.OutlinedButton.Primary.Text,
  TodayButtonHover: USER_COLORS.OutlinedButton.Primary.HoverBackground,
  SlotColors: [
    '#4F46E5',
    '#0891B2',
    '#2563EB',
    '#7C3AED',
    '#DB2777',
  ],
  StatusColors: {
    [CLASS_STATUSES.SCHEDULED]: {
      background: '#0891B2',
      hover: '#0E7490'
    },
    [CLASS_STATUSES.COMPLETED]: {
      background: '#059669',
      hover: '#047857'
    },
  },
  TodayColumn: 'rgba(59, 130, 246, 0.04)',
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

const CalendarWrapper = styled.div`
  background: white;
  border-radius: 0.7rem;
  padding: 1.5rem;
`

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const DateDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const NavButton = styled.button`
  padding: 0.5rem;
  border: 1px solid ${COLORS.BorderColor};
  background: white;
  border-radius: 50%;
  cursor: pointer;
  color: ${COLORS.TextPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  transition: all 0.2s ease;

  &:hover {
    background: ${COLORS.HoverBackground};
    border-color: ${COLORS.CalendarAccent};
    color: ${COLORS.CalendarAccent};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

const DateText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.TextPrimary};
`

const WeeklyGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid ${COLORS.BorderColor};
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`

const DayColumn = styled.div`
  background: ${props => props.$isToday ? COLORS.TodayColumn : 'white'};
  border-right: 1px solid ${COLORS.BorderColor};
  position: relative;
  min-height: 15rem;
  
  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid ${COLORS.BorderColor};
    min-height: 5rem;

    ${props => props.$isToday && `
      border: 1px solid ${COLORS.CalendarAccent};
    `}
  }

  ${props => props.$isToday && `
    border: 1px solid ${COLORS.CalendarAccent};
  `}
`

const DayHeader = styled.div`
  padding: 0.5rem;
  text-align: center;
  background: ${COLORS.BackgroundLight};
  border-bottom: 1px solid ${COLORS.BorderColor};
`

const DayContent = styled.div`
  padding: 0.5rem;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${COLORS.BorderColor};
    border-radius: 4px;
  }
`

const ClassSlot = styled.div`
  background: ${props => COLORS.StatusColors[props.$status]?.background || COLORS.SlotColors[0]};
  padding: 0.5rem;
  margin: 0 0 0.25rem 0;
  border-radius: 4px;
  font-size: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 1s ease;
  height: fit-content;
  overflow: hidden;

  .student-info {
    display: none;
    transition: all 1s ease;
  }

  &:hover {
    background: ${props => COLORS.StatusColors[props.$status]?.hover || COLORS.SlotColors[0]};
    height: fit-content;

    .student-info {
      display: block;
      transform: translateY(0);
      height: fit-content;
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    &:hover {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const SlotTime = styled.div`
  font-size: 0.675rem;
  font-weight: 500;
  opacity: 0.9;
  letter-spacing: 0.5px;
`

const SlotTitle = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 4px;
`

const StudentInfo = styled.div`
  font-size: 0.7rem;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  height: 0;
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.5rem;
  }
`

const EmptyDayMessage = styled.div`
  color: ${COLORS.TextSecondary};
  font-size: 0.75rem;
  text-align: center;
  padding: 1rem 0;
`

const Calendar = ({ showManageSlots = true }) => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().subtract(1, 'days'));

  useEffect(() => {
    FetchWeekData();
  }, [currentWeekStart]);

  const FetchWeekData = () => {
    const startDate = currentWeekStart.format('YYYY-MM-DD');
    const endDate = currentWeekStart.clone().add(6, 'days').format('YYYY-MM-DD');

    FetchAllUpcomingClasses({
      startDate: startDate,
      endDate: endDate,
      setIsLoading: setIsLoading,
      setData: (data) => setClasses(data.records),
    });
  };

  const NavigateWeek = (direction) => {
    setCurrentWeekStart(prev => {
      const newDate = prev.clone().add(direction === 'next' ? 7 : -7, 'days');
      return newDate;
    });
  };

  const GetDayDates = () => {
    return Array.from({ length: 7 }, (_, i) =>
      currentWeekStart.clone().add(i, 'days')
    );
  };

  const DAY_DATES = GetDayDates();

  const GetClassesForDay = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return classes.filter(cls =>
      moment(cls.scheduledFor.date).format('YYYY-MM-DD') === formattedDate
    );
  };

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
              style={{ background: 'transparent', padding: '0.3rem 0.9rem' }} />
          </Link>
        }
      </HeadingContainer>

      <CalendarWrapper>
        <NavigationContainer>
          <USER_COMPONENTS.OutlinedButton text={translations.CALENDAR.TODAY}
            style={{ padding: '0.3rem 0.9rem', alignSelf: 'flex-start' }}
            onClick={() => setCurrentWeekStart(moment().subtract(1, 'days'))} />
          <DateDisplay>
            <NavButton onClick={() => NavigateWeek('prev')}>
              <FontAwesomeIcon icon={faChevronLeft} size="sm" />
            </NavButton>
            <DateText>
              {`${DAY_DATES[0].format('MMM DD')} - ${DAY_DATES[6].format('MMM DD, YYYY')}`}
            </DateText>
            <NavButton onClick={() => NavigateWeek('next')}>
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </NavButton>
          </DateDisplay>
        </NavigationContainer>

        {isLoading && <COMMON_COMPONENTS.Loader wrapped message={null} />}

        {
          !isLoading &&
          <WeeklyGridContainer>
            {
              DAY_DATES.map(date => {
                const isToday = date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');

                return (
                  <DayColumn key={date.format()} $isToday={isToday}>
                    <DayHeader>
                      <div style={{
                        fontWeight: isToday ? 700 : 600,
                        color: isToday ? COLORS.CalendarAccent : COLORS.TextPrimary
                      }}>{date.format('ddd').toUpperCase()}</div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: isToday ? COLORS.CalendarAccent : COLORS.TextSecondary,
                        fontWeight: isToday ? 600 : 'normal'
                      }}>{date.format('MMM DD')}</div>
                    </DayHeader>
                    <DayContent>
                      {
                        GetClassesForDay(date).length > 0 &&
                        GetClassesForDay(date).map((cls, index) => {
                          const startTime = moment(cls.scheduledFor.time, 'HH:mm');
                          const endTime = startTime.clone().add(SLOT_DURATION_IN_MINUTES, 'minutes');

                          return (
                            <ClassSlot key={cls._id} $status={cls.status || CLASS_STATUSES.SCHEDULED}>
                              <div>
                                <SlotTitle>{cls.title}</SlotTitle>
                                <SlotTime>
                                  {startTime.format('hh:mm A')} - {endTime.format('hh:mm A')}
                                </SlotTime>
                              </div>
                              <StudentInfo className="student-info">
                                {cls.student.fullname}
                              </StudentInfo>
                            </ClassSlot>
                          );
                        })
                      }
                      {
                        GetClassesForDay(date).length < 1 &&
                        <EmptyDayMessage>
                          {translations.CALENDAR.NO_CLASSES}
                        </EmptyDayMessage>
                      }
                    </DayContent>
                  </DayColumn>
                );
              })
            }
          </WeeklyGridContainer>
        }
      </CalendarWrapper>
    </div >
  )
}

export default Calendar;