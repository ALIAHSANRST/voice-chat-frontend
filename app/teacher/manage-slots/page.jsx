'use client'

import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";

import { COMMON_COMPONENTS, USER_COMPONENTS } from '@/src/components';
import { USER_COLORS } from "@/src/utils/colors";
import { usePageTitle } from "@/src/hooks";
import { COMMON_CONTEXT } from '@/src/context';
import { MAXIMUM_SLOTS_PER_DAY } from "@/src/utils/constants";
import { ROUTES } from "@/src/utils/routes";
import { ValidateTimeSlot } from "@/src/utils/helpers";
import { GetTeacherSlots, SaveTeacherSlots } from "./axios";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${USER_COLORS.Home.Background};
`

const ContentContainer = styled.div`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-family: 'Montserrat', sans-serif;

    h1 {
      font-size: 1.625rem;
      font-weight: 600;
      color: ${USER_COLORS.ManageSlots.Header.PrimaryText};
      margin: 0;

      @media (max-width: 768px) {
        font-size: 1.375rem;
      }
    }

    p {
      font-size: 1rem;
      color: ${USER_COLORS.ManageSlots.Header.SecondaryText};
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.875rem;
      }
    }
  }

  .right {
    width: fit-content;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  border: 1px solid ${USER_COLORS.ManageSlots.LoadingContainer.Border};
  border-radius: 1rem;
  background-color: ${USER_COLORS.ManageSlots.LoadingContainer.Background};
`

const SlotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.25rem;
`;

const ManageSlotsPage = () => {
  const { translations } = COMMON_CONTEXT.TranslationContext.useTranslation();
  const { currentUser } = COMMON_CONTEXT.AuthenticationContext.useAuthenticationContext();

  usePageTitle({ title: translations.MANAGE_SLOTS.TITLE });

  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState({
    MONDAY: [],
    TUESDAY: [],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: []
  });

  useEffect(() => {
    GetTeacherSlots({
      setIsLoading: setIsLoading,
      setData: setSlots,
      userId: currentUser._id,
    });
  }, [currentUser._id]);

  const HandleSaveSlots = async () => {
    let hasErrors = false;

    Object.entries(slots).forEach(([day, daySlots]) => {
      daySlots.forEach((slot, index) => {
        const error = ValidateTimeSlot(slot, daySlots, translations);
        if (error) {
          hasErrors = true;
          setSlots((prevSlots) => {
            const newSlots = { ...prevSlots };
            newSlots[day][index] = { ...slot, error };
            return newSlots;
          });
        }
      });
    });

    if (hasErrors) {
      COMMON_COMPONENTS.Toast.showErrorToast(translations.MANAGE_SLOTS.ERRORS.FIX_ERRORS);
      return;
    }

    SaveTeacherSlots({
      setIsLoading: setIsLoading,
      slots: slots,
      translations: translations,
    });
  };

  return (
    <MainContainer>
      <USER_COMPONENTS.HeaderNavBar activeItem="calendar" />
      <ContentContainer>
        <HeaderContainer>
          <div className="left">
            <h1>{translations.MANAGE_SLOTS.HEADING}</h1>
            <p>{translations.MANAGE_SLOTS.DESCRIPTION}</p>
          </div>

          <div className="right">
            <Link href={ROUTES.TEACHER_CALENDAR.path}>
              <USER_COMPONENTS.OutlinedButton
                text={translations.MANAGE_SLOTS.GO_BACK}
                style={{ background: 'transparent' }} />
            </Link>
          </div>
        </HeaderContainer>

        {
          isLoading &&
          <LoadingContainer>
            <COMMON_COMPONENTS.Loader wrapped message={'Loading...'} />
          </LoadingContainer>
        }

        {
          !isLoading &&
          <>
            <SlotsContainer>
              {
                Object.entries(slots).map(([day, daySlots]) => {
                  return (
                    <USER_COMPONENTS.DaySlots
                      key={day}
                      day={translations.MANAGE_SLOTS.DAYS[day]}
                      slots={daySlots}
                      onChange={(newSlots) => setSlots({ ...slots, [day]: newSlots })}
                      maxSlots={MAXIMUM_SLOTS_PER_DAY}
                    />
                  )
                })
              }
            </SlotsContainer>

            <ActionButtons>
              <USER_COMPONENTS.OutlinedButton
                text={translations.MANAGE_SLOTS.RESET}
                onClick={() => setSlots({
                  MONDAY: [],
                  TUESDAY: [],
                  WEDNESDAY: [],
                  THURSDAY: [],
                  FRIDAY: [],
                  SATURDAY: [],
                  SUNDAY: []
                })}
              />
              <USER_COMPONENTS.Button
                text={translations.MANAGE_SLOTS.SAVE_CHANGES}
                onClick={HandleSaveSlots}
                disabled={isLoading}
              />
            </ActionButtons>
          </>
        }
      </ContentContainer>
    </MainContainer>
  )
}

export default ManageSlotsPage